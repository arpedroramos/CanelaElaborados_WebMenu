import { useEffect, useState } from 'react';
import { HomeView } from '@modules/home/views/HomeView';
import { ConstruccionView } from '@modules/construccion/views/ConstruccionView';
import { TortasView } from '@modules/tortas/views/TortasView';

// Se decide al compilar: VITE_EN_CONSTRUCCION=true en .env muestra la pantalla de construcción.
const enConstruccion = import.meta.env.VITE_EN_CONSTRUCCION === 'true';

const RUTA_TORTAS = '#/tortas-personalizadas';

function App() {
  const [enTortas, setEnTortas] = useState(window.location.hash === RUTA_TORTAS);

  useEffect(() => {
    const onHashChange = () => {
      const nueva = window.location.hash === RUTA_TORTAS;
      setEnTortas((anterior) => {
        if (anterior !== nueva) window.scrollTo(0, 0);
        return nueva;
      });
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  useEffect(() => {
    document.title = enConstruccion
      ? 'Canela - Sitio en Construcción'
      : enTortas
        ? 'Tortas personalizadas — Canela Elaborados'
        : 'Canela Elaborados — Pastelería artesanal en La Plata';
  }, [enTortas]);

  if (enConstruccion) return <ConstruccionView />;
  return enTortas ? <TortasView /> : <HomeView />;
}

export default App;
