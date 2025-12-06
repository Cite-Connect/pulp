export interface RegisterPayload {
    email: string;
    password: string;
    full_name: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user_id: string;
    user_name: string;
}

export interface CreateProfilePayload {
    // REQUIRED
    primary_domain: string;
    reading_level: 'Introductory' | 'Intermediate' | 'Advanced' | 'Expert';
    interests: string[]; // Min 3, Max 10

    // OPTIONAL
    research_stage?: string;
    sub_domains?: string[];
    google_scholar_url?: string;
}