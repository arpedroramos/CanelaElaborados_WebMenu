import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HomeView } from '@modules/home/views/HomeView';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-full min-h-screen bg-background overflow-x-hidden flex flex-col items-center">
        <HomeView />
      </div>
    </QueryClientProvider>
  );
}

export default App;
