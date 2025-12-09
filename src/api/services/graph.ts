import { apiClientV1 } from "./core";
import { GraphDataResponse } from "../interface/types";

interface GraphParams {
    depth?: number;
    max_nodes?: number;
    include_metadata?: boolean;
    embedding_model?: string;
}

export const graphApi = {
    fetchGraphData: async (centralPaperId: string = '61827838932597591901992a4d3a86b71b42ac69', params?: GraphParams): Promise<GraphDataResponse> => {
        const defaultParams = {
            depth: 1,
            max_nodes: 50,
            include_metadata: true,
            embedding_model: 'specter',
            ...params, // Override defaults if specific params are passed
        };

        const response = await apiClientV1.post<GraphDataResponse>(
            `/graph/citation-network/${centralPaperId}`, 
            { params: defaultParams }
        );

        return response.data;
    }
};