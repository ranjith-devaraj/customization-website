import { Trash2, RotateCw } from 'lucide-react';
import { useEditorStore } from '@/lib/editorStore';
import TextEditor from './TextEditor';
import UploadImage from './UploadImage';
import ColorPicker from './ColorPicker';

const Toolbar = () => {
  const {
    activeView,
    frontCanvas,
    backCanvas,
    frontLayers,
    backLayers,
    removeLayer,
    setSelectedLayerId,
  } = useEditorStore();

  const canvas = activeView === 'front' ? frontCanvas : backCanvas;
  const layers = activeView === 'front' ? frontLayers : backLayers;

  const deleteSelected = () => {
    if (!canvas) return;
    const active = canvas.getActiveObject();
    if (!active) return;

    const layerId = (active as any).layerId;
    canvas.remove(active);
    canvas.renderAll();

    if (layerId) {
      removeLayer(layerId, activeView);
    }
    setSelectedLayerId(null);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b border-border">
        <h2 className="text-sm font-semibold text-foreground">Design Tools</h2>
      </div>
      <div className="flex-1 overflow-y-auto editor-scrollbar p-4 space-y-6">
        <ColorPicker />
        <div className="border-t border-border" />
        <TextEditor />
        <div className="border-t border-border" />
        <UploadImage />
        <div className="border-t border-border" />
        <div className="space-y-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Actions
          </h3>
          <button
            onClick={deleteSelected}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-destructive text-destructive-foreground text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Trash2 className="w-4 h-4" />
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
