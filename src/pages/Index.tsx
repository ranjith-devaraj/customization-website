import ShirtEditor from '@/components/editor/ShirtEditor';
import Toolbar from '@/components/editor/Toolbar';
import LayersPanel from '@/components/editor/LayersPanel';
import FrontBackToggle from '@/components/editor/FrontBackToggle';
import DownloadDesign from '@/components/editor/DownloadDesign';

const Index = () => {
  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-border bg-card">
        <h1 className="text-lg font-bold tracking-tight text-foreground">
          T-Shirt Designer
        </h1>
        <FrontBackToggle />
        <DownloadDesign />
      </header>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Toolbar */}
        <aside className="w-72 border-r border-border bg-card overflow-hidden flex-shrink-0">
          <Toolbar />
        </aside>

        {/* Center - Canvas */}
        <main className="flex-1 flex items-center justify-center bg-muted/50 overflow-auto">
          <div className="rounded-xl shadow-lg overflow-hidden border border-border">
            <ShirtEditor />
          </div>
        </main>

        {/* Right Sidebar - Layers */}
        <aside className="w-64 border-l border-border bg-card overflow-hidden flex-shrink-0">
          <LayersPanel />
        </aside>
      </div>
    </div>
  );
};

export default Index;
