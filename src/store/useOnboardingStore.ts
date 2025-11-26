import { create } from 'zustand';

interface OnboardingState {
    // Data Fields
    email: string;
    password: string;
    role: string;
    institution: string;
    domain: string;
    scholarUrl: string;
    scholarLinked: boolean;
    
    // Actions
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setRole: (role: string) => void;
    setInstitution: (institution: string) => void;
    setDomain: (domain: string) => void;
    setScholarData: (url: string, linked: boolean) => void;
    reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
    // Initial State
    email: '',
    password: '',
    role: '',
    institution: '',
    domain: '',
    scholarUrl: '',
    scholarLinked: false,

    // Setters
    setEmail: (email) => set({ email }),
    setPassword: (password) => set({ password }),
    setRole: (role) => set({ role }),
    setInstitution: (institution) => set({ institution }),
    setDomain: (domain) => set({ domain }),
    setScholarData: (url, linked) => set({ scholarUrl: url, scholarLinked: linked }),
    
    // Reset Action
    reset: () => set({ 
        email: '',
        password: '',
        role: '', 
        institution: '', 
        domain: '', 
        scholarUrl: '', 
        scholarLinked: false 
    }),
}));