import { create } from 'zustand';
import { fabric } from 'fabric';

export interface LayerItem {
  id: string;
  name: string;
  type: 'text' | 'image';
  fabricObject: fabric.Object;
}

interface EditorState {
  activeView: 'front' | 'back';
  setActiveView: (view: 'front' | 'back') => void;
  
  frontCanvas: fabric.Canvas | null;
  backCanvas: fabric.Canvas | null;
  setFrontCanvas: (c: fabric.Canvas) => void;
  setBackCanvas: (c: fabric.Canvas) => void;
  
  frontLayers: LayerItem[];
  backLayers: LayerItem[];
  addLayer: (layer: LayerItem, view: 'front' | 'back') => void;
  removeLayer: (id: string, view: 'front' | 'back') => void;
  setLayers: (layers: LayerItem[], view: 'front' | 'back') => void;
  
  selectedLayerId: string | null;
  setSelectedLayerId: (id: string | null) => void;
  
  shirtColor: string;
  setShirtColor: (color: string) => void;
  
  activeObject: fabric.Object | null;
  setActiveObject: (obj: fabric.Object | null) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  activeView: 'front',
  setActiveView: (view) => set({ activeView: view }),
  
  frontCanvas: null,
  backCanvas: null,
  setFrontCanvas: (c) => set({ frontCanvas: c }),
  setBackCanvas: (c) => set({ backCanvas: c }),
  
  frontLayers: [],
  backLayers: [],
  addLayer: (layer, view) => set((state) => ({
    [view === 'front' ? 'frontLayers' : 'backLayers']: [
      ...( view === 'front' ? state.frontLayers : state.backLayers),
      layer
    ]
  })),
  removeLayer: (id, view) => set((state) => ({
    [view === 'front' ? 'frontLayers' : 'backLayers']: 
      (view === 'front' ? state.frontLayers : state.backLayers).filter(l => l.id !== id)
  })),
  setLayers: (layers, view) => set({
    [view === 'front' ? 'frontLayers' : 'backLayers']: layers
  }),
  
  selectedLayerId: null,
  setSelectedLayerId: (id) => set({ selectedLayerId: id }),
  
  shirtColor: '#ffffff',
  setShirtColor: (color) => set({ shirtColor: color }),
  
  activeObject: null,
  setActiveObject: (obj) => set({ activeObject: obj }),
}));
