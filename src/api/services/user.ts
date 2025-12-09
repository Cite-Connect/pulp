// src/api/services/user.ts
import { apiClientV1 } from './core';
import { CreateProfilePayload, CreateProfileResponse } from '../interface/types';
import { getAuthHeaders } from './auth';

const DOMAIN_MAPPING: Record<string, string> = {
    'Finance': 'fintech',
    'Healthcare': 'healthcare',
    'Quantum Computing': 'quantum_computing',
};

const READING_MAPPING: Record<string, string> = {
    'Introductory': 'introductory',
    'Intermediate': 'intermediate',
    'Advanced': 'advanced',
    'Expert': 'expert',
};

const RESEARCH_STAGE: Record<string, string> = {
    "Bachelor's Student": 'undergraduate',
    "Master's Student": 'masters',
    'PhD Candiate': 'postdoc',
    'Professor': 'professor',
    'Industry Researcher': 'industry',
    'Researcher': 'independent_researcher',
};

export const userApi = {
  // POST /{user-id}/profile
    createProfile: async (userId: string, payload: CreateProfilePayload) => {
        const backendDomain = DOMAIN_MAPPING[payload.primary_domain];
        const readingLevel = READING_MAPPING[payload.reading_level];
        const research_stage = RESEARCH_STAGE[payload.research_stage];

        const apiPayload = {
            ...payload,
            primary_domain: backendDomain || payload.primary_domain,
            reading_level: readingLevel || payload.reading_level,
            research_stage: research_stage || payload.research_stage,
        };

        const response = await apiClientV1.post<CreateProfileResponse>(
        `/users/${userId}/profile`, 
        apiPayload,
        {
            headers: getAuthHeaders(),
        }
        );
        return response.data;
    },

    // Helper: In case you need to fetch the profile later
    getProfile: async (userId: string) => {
        const response = await apiClientV1.get<unknown>(
            `/${userId}/profile`,
            {
                headers: getAuthHeaders(),
            }
        );
        return response.data;
    },

    updateProfile: async (userId: string, payload: Partial<CreateProfilePayload>) => {
        const response = await apiClientV1.put<CreateProfileResponse>(
            `/users/${userId}/profile`,
            payload,
            {
                headers: getAuthHeaders(),
            }
        );
        return response.data;
    },
};