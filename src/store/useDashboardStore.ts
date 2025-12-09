import { GraphDataResponse } from '@/api/interface/types';
import { create } from 'zustand';

interface DashboardState {
    selectedPaperId: string | null;
    graphData: GraphDataResponse | null;
    isLoading: boolean;

    setSelectedPaperId: (id: string | null) => void;
    setGraphData: (data: GraphDataResponse | null) => void;
    setIsLoading: (loading: boolean) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
    selectedPaperId: null, // Default to null (or we could set a default ID)
    graphData: null,
    isLoading: false,

    setSelectedPaperId: (id) => set({ selectedPaperId: id }),
    setGraphData: (data) => set({graphData: data}),
    setIsLoading: (isLoading) => set({isLoading}),
}));