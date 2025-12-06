// src/api/services/user.ts
import { apiClientV1 } from './core';
import { CreateProfilePayload } from '../interface/types';

export const userApi = {
  // POST /{user-id}/profile
    createProfile: async (userId: string, payload: CreateProfilePayload) => {
        const response = await apiClientV1.post<unknown>(
        `/${userId}/profile`, 
        payload
        );
        return response;
    },

    // Helper: In case you need to fetch the profile later
    getProfile: async (userId: string) => {
        const response = await apiClientV1.get<unknown>(`/${userId}/profile`);
        return response;
    }
};