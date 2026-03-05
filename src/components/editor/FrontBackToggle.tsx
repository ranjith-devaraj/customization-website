import { useEditorStore } from '@/lib/editorStore';

const FrontBackToggle = () => {
  const { activeView, setActiveView } = useEditorStore();

  return (
    <div className="flex items-center gap-1 bg-card rounded-lg p-1 shadow-sm border border-border">
      <button
        onClick={() => setActiveView('front')}
        className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
          activeView === 'front'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }`}
      >
        Front View
      </button>
      <button
        onClick={() => setActiveView('back')}
        className={`px-5 py-2 rounded-md text-sm font-medium transition-all ${
          activeView === 'back'
            ? 'bg-primary text-primary-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
        }`}
      >
        Back View
      </button>
    </div>
  );
};

export default FrontBackToggle;
