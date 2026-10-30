import { SITIO } from './sitio';

export interface Ruta {
  /** Siempre con barra al inicio y al final: GitHub Pages sirve cada ruta como carpeta. */
  path: string;
  title: string;
  description: string;
  /** false: la página lleva `noindex` y no entra al sitemap. */
  indexar: boolean;
}

export const RUTAS: readonly Ruta[] = [
  {
    path: '/',
    title: `${SITIO.nombre} — Pastelería artesanal en La Plata`,
    description: `${SITIO.nombre}: pastelería artesanal en La Plata. Productos caseros, artesanales y personalizados por encargo. Pedí por WhatsApp.`,
    indexar: true,
  },
  {
    path: '/tortas-personalizadas/',
    title: `Tortas personalizadas en La Plata — ${SITIO.nombre}`,
    description: `Tortas personalizadas artesanales en La Plata, hechas a medida para cada ocasión. Consultá por WhatsApp.`,
    // Sin contenido todavía: pasar a true cuando la página tenga sus fotos y textos.
    indexar: false,
  },
  {
    path: '/privacidad/',
    title: `Política de privacidad — ${SITIO.nombre}`,
    description: `Qué datos usa el sitio de ${SITIO.nombre}, qué servicios de terceros intervienen y cómo ejercer tus derechos.`,
    indexar: true,
  },
  {
    path: '/terminos/',
    title: `Términos de los pedidos — ${SITIO.nombre}`,
    description: `Cómo se hacen los pedidos en ${SITIO.nombre}: anticipación, seña, entrega y retiro.`,
    indexar: true,
  },
];

export const normalizarPath = (pathname: string): string => {
  const limpio = pathname.split(/[?#]/)[0] || '/';
  const conInicio = limpio.startsWith('/') ? limpio : `/${limpio}`;
  return conInicio.endsWith('/') ? conInicio : `${conInicio}/`;
};

export const rutaDe = (pathname: string): Ruta | undefined => {
  const path = normalizarPath(pathname);
  return RUTAS.find((ruta) => ruta.path === path);
};
