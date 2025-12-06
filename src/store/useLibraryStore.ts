import { create } from 'zustand';
import { PaperDetails } from '@/api/interface/types';

interface LibraryState {
    savedPapers: PaperDetails[];
    toggleSave: (paper: PaperDetails) => void;
    isSaved: (paperId: string) => boolean;
}

export const useLibraryStore = create<LibraryState>((set, get) => ({
    savedPapers: [],

  // Toggle logic: Add if missing, Remove if present
    toggleSave: (paper) => {
        const { savedPapers } = get();
        const exists = savedPapers.some((p) => p.id === paper.id);

        if (exists) {
        set({ savedPapers: savedPapers.filter((p) => p.id !== paper.id) });
        } else {
        set({ savedPapers: [...savedPapers, paper] });
        }
    },

    // Helper to check status
    isSaved: (paperId) => get().savedPapers.some((p) => p.id === paperId),
}));