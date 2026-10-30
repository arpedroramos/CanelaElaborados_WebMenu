// Mide SEO y rendimiento (móvil) del sitio ya compilado en dist/ con Lighthouse.
// Requiere haber corrido `npm run build` y tener Chrome instalado. Lighthouse se baja con npx (no es dependencia).
import { exec } from 'node:child_process';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { promisify } from 'node:util';
import { preview } from 'vite';

const PUERTO = 4173;
const MINIMOS: Record<string, number> = { seo: 95, performance: 90 };

const ejecutar = promisify(exec);
const raiz = resolve(import.meta.dirname, '..');
if (!existsSync(join(raiz, 'dist', 'index.html'))) {
  console.error('Falta dist/: correr primero `npm run build`.');
  process.exit(1);
}

interface Informe {
  lighthouseVersion: string;
  categories: Record<string, { title: string; score: number | null }>;
}

// En la integración continua (Linux) Chrome corre sin sandbox; en una PC con Windows falla si se lo pasa.
const banderas = process.env.CI ? '--headless --no-sandbox' : '--headless';

const servidor = await preview({ root: raiz, preview: { port: PUERTO, strictPort: true } });
let fallo = false;
try {
  // Asíncrono a propósito: el servidor de vista previa vive en este mismo proceso y debe poder responder.
  const { stdout: salida } = await ejecutar(
    `npx --yes lighthouse@13 http://localhost:${PUERTO}/ --only-categories=seo,performance --chrome-flags="${banderas}" --output=json --output-path=stdout --quiet`,
    { cwd: raiz, encoding: 'utf-8', maxBuffer: 64 * 1024 * 1024 },
  );
  const informe = JSON.parse(salida) as Informe;
  console.log(`Lighthouse ${informe.lighthouseVersion} (móvil)`);
  for (const [id, minimo] of Object.entries(MINIMOS)) {
    const puntaje = Math.round((informe.categories[id]?.score ?? 0) * 100);
    const bien = puntaje >= minimo;
    if (!bien) fallo = true;
    console.log(`  ${bien ? 'OK  ' : 'BAJO'} ${informe.categories[id]?.title ?? id}: ${puntaje} (mínimo ${minimo})`);
  }
} finally {
  await servidor.close();
}
process.exit(fallo ? 1 : 0);
