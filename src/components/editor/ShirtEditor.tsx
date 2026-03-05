import { useEffect, useRef, useCallback } from 'react';
import { fabric } from 'fabric';
import { useEditorStore } from '@/lib/editorStore';

const CANVAS_SIZE = 2000;
const DISPLAY_SIZE = 500;
const PRINT_AREA = {
  left: 550,
  top: 500,
  width: 900,
  height: 1100,
};

const ShirtEditor = () => {
  const frontCanvasRef = useRef<HTMLCanvasElement>(null);
  const backCanvasRef = useRef<HTMLCanvasElement>(null);
  const frontFabricRef = useRef<fabric.Canvas | null>(null);
  const backFabricRef = useRef<fabric.Canvas | null>(null);

  const {
    activeView,
    setFrontCanvas,
    setBackCanvas,
    shirtColor,
    removeLayer,
    frontLayers,
    backLayers,
    setSelectedLayerId,
    setActiveObject,
  } = useEditorStore();

  const setupCanvas = useCallback((
    canvasEl: HTMLCanvasElement,
    view: 'front' | 'back'
  ) => {
    const canvas = new fabric.Canvas(canvasEl, {
      width: CANVAS_SIZE,
      height: CANVAS_SIZE,
      backgroundColor: '#e5e5e5',
    });

    // Scale for display
    const zoom = DISPLAY_SIZE / CANVAS_SIZE;
    canvas.setZoom(zoom);
    canvas.setWidth(DISPLAY_SIZE);
    canvas.setHeight(DISPLAY_SIZE);

    // Load shirt image
    const imgUrl = view === 'front' ? '/images/front-shirt.png' : '/images/back-shirt.png';
    fabric.Image.fromURL(imgUrl, (img) => {
      img.scaleToWidth(CANVAS_SIZE);
      img.set({
        originX: 'left',
        originY: 'top',
      });
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });

    // Add printable boundary
    const boundary = new fabric.Rect({
      left: PRINT_AREA.left,
      top: PRINT_AREA.top,
      width: PRINT_AREA.width,
      height: PRINT_AREA.height,
      fill: 'transparent',
      stroke: '#7c3aed',
      strokeWidth: 3,
      strokeDashArray: [20, 10],
      selectable: false,
      evented: false,
      opacity: 0.5,
    });
    (boundary as any).isBoundary = true;
    canvas.add(boundary);

    // Selection events
    canvas.on('selection:created', (e) => {
      const obj = e.selected?.[0];
      if (obj) {
        setActiveObject(obj);
        const layerId = (obj as any).layerId;
        if (layerId) setSelectedLayerId(layerId);
      }
    });
    canvas.on('selection:updated', (e) => {
      const obj = e.selected?.[0];
      if (obj) {
        setActiveObject(obj);
        const layerId = (obj as any).layerId;
        if (layerId) setSelectedLayerId(layerId);
      }
    });
    canvas.on('selection:cleared', () => {
      setActiveObject(null);
      setSelectedLayerId(null);
    });

    // Delete key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' || e.key === 'Backspace') {
        // Don't delete if editing text
        const target = e.target as HTMLElement;
        if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
        if ((canvas.getActiveObject() as any)?.isEditing) return;

        const active = canvas.getActiveObject();
        if (active && !(active as any).isBoundary) {
          const layerId = (active as any).layerId;
          canvas.remove(active);
          canvas.renderAll();
          if (layerId) {
            removeLayer(layerId, view);
          }
          setSelectedLayerId(null);
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    (canvas as any).__keyHandler = handleKeyDown;

    return canvas;
  }, [removeLayer, setSelectedLayerId, setActiveObject]);

  useEffect(() => {
    if (!frontCanvasRef.current || !backCanvasRef.current) return;
    if (frontFabricRef.current) return; // Already initialized

    const fc = setupCanvas(frontCanvasRef.current, 'front');
    const bc = setupCanvas(backCanvasRef.current, 'back');

    frontFabricRef.current = fc;
    backFabricRef.current = bc;

    setFrontCanvas(fc);
    setBackCanvas(bc);

    return () => {
      document.removeEventListener('keydown', (fc as any).__keyHandler);
      document.removeEventListener('keydown', (bc as any).__keyHandler);
      fc.dispose();
      bc.dispose();
    };
  }, []);

  // Update shirt color via CSS filter overlay
  useEffect(() => {
    [frontFabricRef.current, backFabricRef.current].forEach((canvas) => {
      if (!canvas) return;
      const bg = canvas.backgroundImage as fabric.Image;
      if (!bg) return;

      if (shirtColor === '#ffffff') {
        bg.filters = [];
      } else {
        bg.filters = [
          new fabric.Image.filters.BlendColor({
            color: shirtColor,
            mode: 'tint',
            alpha: 0.85,
          }),
        ];
      }
      bg.applyFilters();
      canvas.renderAll();
    });
  }, [shirtColor]);

  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`${activeView === 'front' ? 'block' : 'hidden'}`}
      >
        <canvas ref={frontCanvasRef} />
      </div>
      <div
        className={`${activeView === 'back' ? 'block' : 'hidden'}`}
      >
        <canvas ref={backCanvasRef} />
      </div>
    </div>
  );
};

export default ShirtEditor;
