import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RecommendedPaper, RecommendationMetadata } from '@/api/interface/types';

interface RecommendationState {
    results: RecommendedPaper[];
    
    metadata: RecommendationMetadata | null;

    setRecommendations: (papers: RecommendedPaper[], meta: RecommendationMetadata) => void;
    clearRecommendations: () => void;
    
    hasResults: () => boolean;
}

export const useRecommendationStore = create<RecommendationState>()(
    persist(
        (set, get) => ({
        results: [],
        metadata: null,

        setRecommendations: (papers, meta) => set({ 
            results: papers, 
            metadata: meta 
        }),

        clearRecommendations: () => set({ 
            results: [], 
            metadata: null 
        }),

        hasResults: () => get().results.length > 0
        }),
        {
        name: 'citeconnect-recommendations',
        }
    )
);