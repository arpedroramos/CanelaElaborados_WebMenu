import { HomeView } from '@modules/home/views/HomeView';
import { ConstruccionView } from '@modules/construccion/views/ConstruccionView';

// Se decide al compilar: VITE_EN_CONSTRUCCION=true en .env muestra la pantalla de construcción.
const enConstruccion = import.meta.env.VITE_EN_CONSTRUCCION === 'true';

function App() {
  return enConstruccion ? <ConstruccionView /> : <HomeView />;
}

export default App;
