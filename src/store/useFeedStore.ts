import { create } from 'zustand';
import { PaperDetails, RecommendedPaper } from '@/api/interface/types';

interface FeedState {
    papers: (PaperDetails | RecommendedPaper)[];
    loading: boolean;

    setPapers: (papers: (PaperDetails | RecommendedPaper)[]) => void;
    setLoading: (loading: boolean) => void;
}

export const useFeedStore = create<FeedState>((set) => ({
    papers: [],
    loading: true, // Default to loading on mount
    setPapers: (papers) => set({ papers }),
    setLoading: (loading) => set({ loading }),
}));