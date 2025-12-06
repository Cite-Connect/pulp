// src/api/services/user.ts
import { apiClient } from './core';
import { CreateProfilePayload } from '../interface/types';

export const userApi = {
  // POST /{user-id}/profile
    createProfile: async (userId: string, payload: CreateProfilePayload) => {
        const response = await apiClient.post<unknown>(
        `/${userId}/profile`, 
        payload
        );
        return response;
    },

    // Helper: In case you need to fetch the profile later
    getProfile: async (userId: string) => {
        const response = await apiClient.get<unknown>(`/${userId}/profile`);
        return response;
    }
};