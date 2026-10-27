// Punto de entrada del build de servidor: lo usa solo scripts/prerender.ts para dejar el HTML dibujado.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import { MENU } from './data/menu';
import { RUTAS } from './data/rutas';
import { SITIO } from './data/sitio';

export const render = (path: string): string =>
  renderToString(
    <StrictMode>
      <App path={path} />
    </StrictMode>,
  );

export const imagenesMenu = (): string[] =>
  MENU.flatMap((categoria) => categoria.items.map((item) => item.imgSrc)).filter(
    (src): src is string => Boolean(src),
  );

export { jsonLdDe } from './lib/jsonld';
export { RUTAS, SITIO };
