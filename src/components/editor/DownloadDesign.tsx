import { Download } from 'lucide-react';
import { fabric } from "fabric";
import { useEditorStore } from '@/lib/editorStore';

const DownloadDesign = () => {
  const { frontCanvas, backCanvas } = useEditorStore();

  const handleDownload = () => {
    if (!frontCanvas || !backCanvas) return;

    // Remove printable area guides before export
    const removeBoundary = (c: fabric.Canvas) => {
      const guides = c.getObjects().filter((o: any) => o.isBoundary);
      guides.forEach((g) => c.remove(g));
      c.renderAll();
      return guides;
    };

    const addBoundaryBack = (c: fabric.Canvas, guides: fabric.Object[]) => {
      guides.forEach((g) => c.add(g));
      c.renderAll();
    };

    const frontGuides = removeBoundary(frontCanvas);
    const backGuides = removeBoundary(backCanvas);

    // Deselect
    frontCanvas.discardActiveObject();
    backCanvas.discardActiveObject();
    frontCanvas.renderAll();
    backCanvas.renderAll();

    const frontData = frontCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 3,
    });
    const backData = backCanvas.toDataURL({
      format: 'png',
      quality: 1,
      multiplier: 3,
    });

    // Restore guides
    addBoundaryBack(frontCanvas, frontGuides);
    addBoundaryBack(backCanvas, backGuides);

    // Merge into single image
    const mergeCanvas = document.createElement('canvas');
    const ctx = mergeCanvas.getContext('2d')!;

    const frontImg = new Image();
    frontImg.onload = () => {
      const backImg = new Image();
      backImg.onload = () => {
        const w = Math.max(frontImg.width, backImg.width);
        const gap = 60;
        mergeCanvas.width = w;
        mergeCanvas.height = frontImg.height + backImg.height + gap;

        ctx.fillStyle = '#f5f5f5';
        ctx.fillRect(0, 0, mergeCanvas.width, mergeCanvas.height);

        ctx.drawImage(frontImg, (w - frontImg.width) / 2, 0);
        ctx.drawImage(backImg, (w - backImg.width) / 2, frontImg.height + gap);

        // Labels
        ctx.fillStyle = '#666';
        ctx.font = '36px Space Grotesk, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('FRONT', w / 2, frontImg.height + 40);

        const link = document.createElement('a');
        link.download = 'tshirt-design.png';
        link.href = mergeCanvas.toDataURL('image/png', 1);
        link.click();
      };
      backImg.src = backData;
    };
    frontImg.src = frontData;
  };

  return (
    <button
      onClick={handleDownload}
      className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity shadow-sm"
    >
      <Download className="w-4 h-4" />
      Download Design
    </button>
  );
};

export default DownloadDesign;
