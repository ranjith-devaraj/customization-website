import { Type, Image, Trash2, MousePointer2 } from 'lucide-react';
import { useEditorStore } from '@/lib/editorStore';

const LayersPanel = () => {
  const {
    activeView,
    frontCanvas,
    backCanvas,
    frontLayers,
    backLayers,
    removeLayer,
    selectedLayerId,
    setSelectedLayerId,
  } = useEditorStore();

  const canvas = activeView === 'front' ? frontCanvas : backCanvas;
  const layers = activeView === 'front' ? frontLayers : backLayers;

  const handleSelect = (layer: typeof layers[0]) => {
    if (!canvas) return;
    setSelectedLayerId(layer.id);
    canvas.setActiveObject(layer.fabricObject);
    canvas.renderAll();
  };

  const handleDelete = (layer: typeof layers[0]) => {
    if (!canvas) return;
    canvas.remove(layer.fabricObject);
    canvas.renderAll();
    removeLayer(layer.id, activeView);
    if (selectedLayerId === layer.id) {
      setSelectedLayerId(null);
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Design Elements</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {activeView === 'front' ? 'Front' : 'Back'} · {layers.length} layer{layers.length !== 1 ? 's' : ''}
        </p>
      </div>
      <div className="flex-1 overflow-y-auto editor-scrollbar p-2 space-y-1">
        {layers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground text-xs">
            No elements yet.<br />Add text or images from the toolbar.
          </div>
        )}
        {layers.map((layer) => (
          <div
            key={layer.id}
            className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer transition-colors group ${
              selectedLayerId === layer.id
                ? 'bg-primary/10 border border-primary/30'
                : 'hover:bg-muted border border-transparent'
            }`}
            onClick={() => handleSelect(layer)}
          >
            <div className="w-6 h-6 rounded flex items-center justify-center bg-muted text-muted-foreground">
              {layer.type === 'text' ? (
                <Type className="w-3.5 h-3.5" />
              ) : (
                <Image className="w-3.5 h-3.5" />
              )}
            </div>
            <span className="flex-1 text-sm truncate text-foreground">{layer.name}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(layer);
              }}
              className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-destructive/10 hover:text-destructive transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LayersPanel;
