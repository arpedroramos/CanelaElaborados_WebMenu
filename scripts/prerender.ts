// Después de `vite build` (cliente) y `vite build --ssr` (servidor): deja el HTML de cada ruta ya dibujado,
// con su título, descripción y canonical, y genera sitemap.xml, robots.txt y 404.html en dist/.
import { execSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';

interface Ruta {
  path: string;
  title: string;
  description: string;
  indexar: boolean;
}

interface ModuloServidor {
  render: (path: string) => string;
  imagenesMenu: () => string[];
  RUTAS: readonly Ruta[];
  SITIO: { url: string; nombre: string };
}

const raiz = resolve(import.meta.dirname, '..');
const dist = join(raiz, 'dist');
const servidor = join(raiz, 'dist-server', 'entry-server.js');

if (!existsSync(join(dist, 'index.html')) || !existsSync(servidor)) {
  console.error('Faltan dist/index.html o dist-server/entry-server.js: correr el build completo (npm run build).');
  process.exit(1);
}

const { render, imagenesMenu, RUTAS, SITIO } = (await import(pathToFileURL(servidor).href)) as ModuloServidor;
const enConstruccion = loadEnv('production', raiz, 'VITE_').VITE_EN_CONSTRUCCION === 'true';
const plantilla = readFileSync(join(dist, 'index.html'), 'utf-8');

const escapar = (texto: string): string =>
  texto.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const reemplazar = (html: string, patron: RegExp, nuevo: string): string => {
  if (!patron.test(html)) throw new Error(`index.html no tiene ${patron}: el prerender no puede ajustarlo.`);
  return html.replace(patron, () => nuevo);
};

interface Pagina {
  path: string;
  title: string;
  description: string;
  indexar: boolean;
  /** 404.html no lleva canonical ni og:url. */
  sinCanonical?: boolean;
}

const armarPagina = (pagina: Pagina): string => {
  const url = `${SITIO.url}${pagina.path}`;
  const titulo = escapar(pagina.title);
  const descripcion = escapar(pagina.description);
  let html = plantilla;
  html = reemplazar(html, /<title>[^<]*<\/title>/, `<title>${titulo}</title>`);
  html = reemplazar(html, /<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${descripcion}" />`);
  html = reemplazar(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${titulo}" />`);
  html = reemplazar(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${descripcion}" />`);
  html = reemplazar(html, /<link rel="canonical" href="[^"]*" \/>/, pagina.sinCanonical ? '' : `<link rel="canonical" href="${url}" />`);
  html = reemplazar(html, /<meta property="og:url" content="[^"]*" \/>/, pagina.sinCanonical ? '' : `<meta property="og:url" content="${url}" />`);
  if (!pagina.indexar || enConstruccion) {
    html = reemplazar(html, /<\/head>/, '    <meta name="robots" content="noindex" />\n  </head>');
  }
  return reemplazar(html, /<div id="root"><\/div>/, `<div id="root">${render(pagina.path)}</div>`);
};

const escribir = (rutaRelativa: string, contenido: string) => {
  const destino = join(dist, rutaRelativa);
  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, contenido, 'utf-8');
  console.log(`  ${destino.slice(raiz.length + 1).replaceAll('\\', '/')}`);
};

console.log('Prerender:');
for (const ruta of RUTAS) {
  escribir(ruta.path === '/' ? 'index.html' : join(ruta.path, 'index.html'), armarPagina(ruta));
}
escribir(
  '404.html',
  armarPagina({
    path: '/no-encontrada/',
    title: `Página no encontrada — ${SITIO.nombre}`,
    description: `La página que buscás no existe en ${SITIO.nombre}.`,
    indexar: false,
    sinCanonical: true,
  }),
);

if (enConstruccion) {
  escribir('robots.txt', 'User-agent: *\nDisallow: /\n');
  console.log('Modo construcción: noindex en todas las páginas, sin sitemap.');
} else {
  const fechaCommit = (): string => {
    try {
      return execSync('git log -1 --format=%cs', { cwd: raiz, encoding: 'utf-8' }).trim();
    } catch {
      return new Date().toISOString().slice(0, 10);
    }
  };
  const lastmod = fechaCommit();
  const imagenes = [...new Set(imagenesMenu())];
  const urls = RUTAS.filter((ruta) => ruta.indexar).map((ruta) => {
    const fotos = ruta.path === '/' ? imagenes : [];
    const bloqueFotos = fotos
      .map((src) => `\n    <image:image><image:loc>${escapar(SITIO.url + src)}</image:loc></image:image>`)
      .join('');
    return `  <url>\n    <loc>${SITIO.url}${ruta.path}</loc>\n    <lastmod>${lastmod}</lastmod>${bloqueFotos}\n  </url>`;
  });
  escribir(
    'sitemap.xml',
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`,
  );
  escribir('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITIO.url}/sitemap.xml\n`);
}
