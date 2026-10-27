import { useEffect, useState } from 'react';
import { HomeView } from '@modules/home/views/HomeView';
import { ConstruccionView } from '@modules/construccion/views/ConstruccionView';
import { NoEncontradaView } from '@modules/legal/views/NoEncontradaView';
import { PrivacidadView } from '@modules/legal/views/PrivacidadView';
import { TerminosView } from '@modules/legal/views/TerminosView';
import { TortasView } from '@modules/tortas/views/TortasView';
import { normalizarPath, rutaDe } from '@/data/rutas';

// Se decide al compilar: VITE_EN_CONSTRUCCION=true en .env muestra la pantalla de construcción.
const enConstruccion = import.meta.env.VITE_EN_CONSTRUCCION === 'true';

const irAlAnclaje = (hash: string) => {
  const destino = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null;
  if (destino) destino.scrollIntoView();
  else window.scrollTo(0, 0);
};

const Vista = ({ path }: { path: string }) => {
  switch (path) {
    case '/':
      return <HomeView />;
    case '/tortas-personalizadas/':
      return <TortasView />;
    case '/privacidad/':
      return <PrivacidadView />;
    case '/terminos/':
      return <TerminosView />;
    default:
      return <NoEncontradaView />;
  }
};

/** `path` lo fija el prerender; en el navegador se lee de la barra de direcciones. */
function App({ path: pathServidor }: { path?: string }) {
  const [path, setPath] = useState(() => pathServidor ?? normalizarPath(window.location.pathname));

  useEffect(() => {
    const alVolver = () => setPath(normalizarPath(window.location.pathname));

    // Enlaces internos sin recargar; los anclajes de la misma página los resuelve el navegador.
    const alHacerClic = (evento: MouseEvent) => {
      if (evento.defaultPrevented || evento.button !== 0) return;
      if (evento.metaKey || evento.ctrlKey || evento.shiftKey || evento.altKey) return;
      const enlace = (evento.target as Element | null)?.closest('a');
      if (!enlace || enlace.target || enlace.hasAttribute('download')) return;
      const url = new URL(enlace.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      const destino = normalizarPath(url.pathname);
      if (destino === normalizarPath(window.location.pathname)) return;
      evento.preventDefault();
      window.history.pushState(null, '', url.pathname + url.hash);
      setPath(destino);
      requestAnimationFrame(() => irAlAnclaje(url.hash));
    };

    window.addEventListener('popstate', alVolver);
    document.addEventListener('click', alHacerClic);
    return () => {
      window.removeEventListener('popstate', alVolver);
      document.removeEventListener('click', alHacerClic);
    };
  }, []);

  useEffect(() => {
    document.title = enConstruccion
      ? 'Canela - Sitio en Construcción'
      : (rutaDe(path)?.title ?? 'Página no encontrada — Canela Elaborados');
  }, [path]);

  if (enConstruccion) return <ConstruccionView />;
  return <Vista path={path} />;
}

export default App;
