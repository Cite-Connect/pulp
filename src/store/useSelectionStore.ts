import { create } from 'zustand';
import { GraphNode } from '@/api/interface/types'; 

interface SelectionState {
    selectedNode: GraphNode | null;
    setSelectedNode: (node: GraphNode | null) => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
    selectedNode: null,
    
    setSelectedNode: (node) => set({ selectedNode: node }),
}));