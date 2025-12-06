import { apiClientV1 } from "./core";
import { PaperDetails } from "../interface/types";

export const fetchPaperDetails = async (paperId: string | number | undefined): Promise<PaperDetails> => {
    const response = await apiClientV1.get<PaperDetails>(`/papers/${paperId}`);
    return response.data;
};