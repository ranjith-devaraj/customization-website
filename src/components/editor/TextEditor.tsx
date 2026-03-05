import { useState } from 'react';
import { fabric } from "fabric";
import { Type } from 'lucide-react';
import { useEditorStore } from '@/lib/editorStore';

const FONTS = [
  'Space Grotesk',
  'Arial',
  'Georgia',
  'Courier New',
  'Impact',
  'Comic Sans MS',
  'Trebuchet MS',
  'Verdana',
];

const TextEditor = () => {
  const { activeView, frontCanvas, backCanvas, addLayer } = useEditorStore();
  const [text, setText] = useState('Your Text');
  const [font, setFont] = useState('Space Grotesk');
  const [fontSize, setFontSize] = useState(40);
  const [textColor, setTextColor] = useState('#000000');

  const canvas = activeView === 'front' ? frontCanvas : backCanvas;

  const addText = () => {
    if (!canvas || !text.trim()) return;

    const id = `text-${Date.now()}`;
    const textObj = new fabric.IText(text, {
      left: 250,
      top: 300,
      fontFamily: font,
      fontSize: fontSize * 4, // Scale for hi-res canvas
      fill: textColor,
      originX: 'center',
      originY: 'center',
    });
    (textObj as any).layerId = id;

    canvas.add(textObj);
    canvas.setActiveObject(textObj);
    canvas.renderAll();

    addLayer({
      id,
      name: text.length > 20 ? text.substring(0, 20) + '...' : text,
      type: 'text',
      fabricObject: textObj,
    }, activeView);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Add Text
      </h3>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
        className="w-full px-3 py-2 rounded-md bg-muted border border-border text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <select
        value={font}
        onChange={(e) => setFont(e.target.value)}
        className="w-full px-3 py-2 rounded-md bg-muted border border-border text-sm text-foreground"
      >
        {FONTS.map((f) => (
          <option key={f} value={f}>{f}</option>
        ))}
      </select>
      <div className="flex gap-2">
        <input
          type="number"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
          min={8}
          max={120}
          className="w-20 px-3 py-2 rounded-md bg-muted border border-border text-sm text-foreground"
        />
        <input
          type="color"
          value={textColor}
          onChange={(e) => setTextColor(e.target.value)}
          className="w-10 h-10 rounded-md border border-border cursor-pointer"
        />
      </div>
      <button
        onClick={addText}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity"
      >
        <Type className="w-4 h-4" />
        Add Text
      </button>
    </div>
  );
};

export default TextEditor;
