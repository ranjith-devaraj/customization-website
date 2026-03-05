import { useRef } from 'react';
import { fabric } from "fabric";
import { ImagePlus } from 'lucide-react';
import { useEditorStore } from '@/lib/editorStore';

const UploadImage = () => {
  const { activeView, frontCanvas, backCanvas, addLayer } = useEditorStore();
  const fileRef = useRef<HTMLInputElement>(null);

  const canvas = activeView === 'front' ? frontCanvas : backCanvas;

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !canvas) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const imgUrl = event.target?.result as string;
      fabric.Image.fromURL(imgUrl, (img) => {
        const id = `img-${Date.now()}`;
        img.scaleToWidth(400);
        img.set({
          left: 250,
          top: 300,
          originX: 'center',
          originY: 'center',
        });
        (img as any).layerId = id;

        canvas.add(img);
        canvas.setActiveObject(img);
        canvas.renderAll();

        addLayer({
          id,
          name: file.name.length > 20 ? file.name.substring(0, 20) + '...' : file.name,
          type: 'image',
          fabricObject: img,
        }, activeView);
      });
    };
    reader.readAsDataURL(file);

    // Reset input
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Upload Image
      </h3>
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleUpload}
        className="hidden"
        id="image-upload"
      />
      <button
        onClick={() => fileRef.current?.click()}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md border-2 border-dashed border-border text-sm text-muted-foreground hover:border-primary hover:text-primary transition-colors"
      >
        <ImagePlus className="w-4 h-4" />
        Choose Image
      </button>
    </div>
  );
};

export default UploadImage;
