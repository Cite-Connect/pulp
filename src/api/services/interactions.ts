import { apiClientV1 } from './core';
import { 
    TrackInteractionPayload, 
    TrackInteractionResponse,
    InteractionHistoryResponse,
    InteractionStatisticsResponse,
    SavedPapersResponse,
    RemoveFilterResponse,
    HistoryParams
} from '../interface/types';

export const interactionsApi = {
    trackInteraction: async (payload: TrackInteractionPayload, user_id: string | null) => {
        const response = await apiClientV1.post<TrackInteractionResponse>(
            '/interactions?user_id=' + user_id, 
            payload,
        );
        return response.data;
    },

    getHistory: async (userId: string | number, params?: HistoryParams) => {
        const response = await apiClientV1.get<InteractionHistoryResponse>(
        `/interactions/${userId}/history`,
            { 
                params: {
                limit: params?.limit || 50,
                min_strength: params?.min_strength
                }
            }
        );
        return response.data;
    },

    getStatistics: async (userId: string | number, days: number = 30) => {
        const response = await apiClientV1.get<InteractionStatisticsResponse>(
        `/interactions/${userId}/statistics`,
            { 
                params: { days }
            }
        );
        return response.data;
    },

    getSavedPapers: async (userId: string | number) => {
        const response = await apiClientV1.get<SavedPapersResponse>(
        `/interactions/${userId}/saved`,
        );
        return response.data;
    },

    removeFilter: async (userId: string | number, paperId: string) => {
        const response = await apiClientV1.delete<RemoveFilterResponse>(
        `/interactions/${userId}/filters/${paperId}`,
        );
        return response.data;
    }
};