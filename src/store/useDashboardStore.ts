import { GraphDataResponse, PaperDetails } from '@/api/interface/types';
import { create } from 'zustand';

interface DashboardState {
    selectedPaperId: string | null;
    graphData: GraphDataResponse | null;
    isLoading: boolean;
    inspectingPaper: PaperDetails | null;

    setSelectedPaperId: (id: string | null) => void;
    setGraphData: (data: GraphDataResponse | null) => void;
    setIsLoading: (loading: boolean) => void;
    setInspectingPaper: (paper: PaperDetails | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    selectedPaperId: null, // Default to null (or we could set a default ID)
    graphData: null,
    isLoading: false,
    inspectingPaper: null,

    setSelectedPaperId: (id) => set({ selectedPaperId: id }),
    setGraphData: (data) => set({graphData: data}),
    setIsLoading: (isLoading) => set({isLoading}),
    setInspectingPaper: (paper) => set({ inspectingPaper: paper }),
}));