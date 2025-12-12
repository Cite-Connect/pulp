import { apiClientV1 } from "./core";
import { GraphDataResponse, GraphPayload } from "../interface/types";

interface GraphParams {
    depth?: number;
    max_nodes?: number;
    include_metadata?: boolean;
    embedding_model?: string;
}

export const graphApi = {
    fetchGraphData: async (centralPaperId: string, paperIds: string[], params?: GraphParams): Promise<GraphDataResponse> => {
        const payload: GraphPayload = {
            depth: 1,
            max_nodes: 50,
            include_metadata: true,
            embedding_model: 'specter',
            recommended_papers: paperIds,
        };
        // const defaultParams = {
        //     depth: 1,
        //     max_nodes: 50,
        //     include_metadata: true,
        //     embedding_model: 'specter',
        //     recommended_papers: paperIds,
        //     ...params, // Override defaults if specific params are passed
        // };

        const response = await apiClientV1.post<GraphDataResponse>(
            `/graph/citation-network/${centralPaperId}`, 
            payload
        );

        return response.data;
    }
};