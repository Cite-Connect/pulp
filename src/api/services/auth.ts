import { apiClientV1 } from './core';
import { LoginPayload, RegisterPayload, AuthResponse } from '../interface/types';

export const authApi = {
  // POST /register
    register: async (payload: RegisterPayload) => {
        const response = await apiClientV1.post<AuthResponse>('/users/register', payload);
        return response.data;
    },

  // POST /login
    login: async (payload: LoginPayload) => {
        // Note: Your notebook wrote 'pass:', assuming standard 'password' key here.
        const response = await apiClientV1.post<AuthResponse>('/users/login', payload);
        return response.data;
    },

  // Helper to save session
    saveSession: (token: string, userId: string) => {
        if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('userId', userId);
        }
    },

    clearSession: () => {
        if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        }
    }
};