import { apiClientV1 } from "./core";
import { PaperDetails, RecommendationsResponse, RecommendationPayload } from "../interface/types";
import { getAuthHeaders } from "./auth";

export const paperApi = {
    
    fetchPaperDetails: async (paperId: string | number | undefined): Promise<PaperDetails> => {
        const response = await apiClientV1.get<PaperDetails>(`/papers/${paperId}`);
        return response.data;
    },

    getRecommendations: async (payload: RecommendationPayload) => {
        const response = await apiClientV1.post<RecommendationsResponse>(
            '/recommendations', 
            payload,
            {
                headers: getAuthHeaders(),
            }
        );
        return response.data;
    }
};