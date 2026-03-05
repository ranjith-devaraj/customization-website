import { useEditorStore } from '@/lib/editorStore';

const SHIRT_COLORS = [
  { name: 'White', value: '#ffffff' },
  { name: 'Black', value: '#1a1a1a' },
  { name: 'Blue', value: '#2563eb' },
  { name: 'Red', value: '#dc2626' },
  { name: 'Green', value: '#16a34a' },
];

const ColorPicker = () => {
  const { shirtColor, setShirtColor } = useEditorStore();

  return (
    <div className="space-y-3">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Shirt Color
      </h3>
      <div className="flex gap-2 flex-wrap">
        {SHIRT_COLORS.map((c) => (
          <button
            key={c.value}
            onClick={() => setShirtColor(c.value)}
            className={`w-8 h-8 rounded-full border-2 transition-all ${
              shirtColor === c.value
                ? 'border-primary scale-110 shadow-md'
                : 'border-border hover:scale-105'
            }`}
            style={{ backgroundColor: c.value }}
            title={c.name}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;
