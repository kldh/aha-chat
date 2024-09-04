import ChatUI from './container/ChatUI';
import { Toaster } from "@/components/ui/sonner"
import { GlobalDrawerProvider } from '@/components/GlobalDrawer';

function App() {
  return (
    <>
      <div className="min-h-screen bg-background flex items-center justify-center">
        <ChatUI />
      </div>
      <Toaster />
      <GlobalDrawerProvider />
    </>
  );
}

export default App;
