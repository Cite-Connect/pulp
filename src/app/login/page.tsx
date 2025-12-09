'use client'

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { authApi } from '@/api/services/auth'; 
import { AuthResponse } from '@/api/interface/types'; 
import { getApiErrorMessage } from '@/utils/errorHandler'; // <--- 1. Import the helper

export default function LoginPage() {
    useEffect(() => {
        localStorage.clear();
    }, []);

    const router = useRouter();
    const resetStore = useOnboardingStore((state) => state.reset);

    // State to toggle between Login and Register views
    const [isRegistering, setIsRegistering] = useState(false);
    
    // Form Data
    const [formData, setFormData] = useState({ email: '', password: '', fullName: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [apiError, setApiError] = useState<string | null>(null);

    // Simple validation
    const validate = () => {
        if (!formData.email || !formData.password) return false;
        if (isRegistering && !formData.fullName) return false;
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setApiError(null);

        if (!validate()) {
            setApiError("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);

        try {
        let result: AuthResponse;
        
        if (isRegistering) {
            // --- REGISTER ---
            result = await authApi.register({
                email: formData.email,
                password: formData.password,
                full_name: formData.fullName
            });
        } else {
            // --- LOGIN ---
            result = await authApi.login({
                email: formData.email,
                password: formData.password
            });
        }

        // --- HANDLE SUCCESS ---
        const { access_token, user_id } = result;
        
        authApi.saveSession(access_token, user_id);
        resetStore();

        if (isRegistering) {
            router.push('/onboarding/step1');
        } else {
            router.push('/dashboard'); 
        }

        } catch (err: unknown) { 
        console.error('Auth Error:', err);
        // 2. Use the helper here to extract the message safely
        const msg = getApiErrorMessage(err, 'Authentication failed. Please try again.');
        setApiError(msg);
        } finally {
        setIsSubmitting(false);
        }
    };

    const toggleMode = () => {
        setIsRegistering(!isRegistering);
        setApiError(null);
    };

    return (
        <PageContainer>
        <LoginCard>
            <Header>
            <Title onClick={() => router.push('/')}>CiteConnect</Title>
            <Subtitle>Your AI-powered research assistant</Subtitle>
            </Header>
            
            <FormSection>

            {apiError && <AlertBanner>{apiError}</AlertBanner>}

            <Form onSubmit={handleSubmit}>
                
                {isRegistering && (
                    <InputGroup>
                        <Label htmlFor="fullname" $required>Full Name</Label>
                        <Input 
                            id="fullname" 
                            type="text" 
                            placeholder="John Doe" 
                            value={formData.fullName}
                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        />
                    </InputGroup>
                )}

                <InputGroup>
                <Label htmlFor="email" $required>Email address</Label>
                <Input 
                    id="email" 
                    type="email" 
                    placeholder="Email address" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                </InputGroup>
                
                <InputGroup>
                <Label htmlFor="password" $required>Password</Label>
                <Input 
                    id="password" 
                    type="password" 
                    placeholder="Password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
                </InputGroup>

                <PrimaryButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Processing...' : (isRegistering ? 'Create Account' : 'Sign in')}
                </PrimaryButton>
                
                {/* Toggle Link */}
                <ToggleButton type="button" onClick={toggleMode}>
                    {isRegistering 
                        ? "Already have an account? Sign in" 
                        : "Don't have an account? Create one"}
                </ToggleButton>
            </Form>
            </FormSection>
        </LoginCard>
        </PageContainer>
    );
}

const PageContainer = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f9fafb;
`;

const LoginCard = styled.div`
    max-width: 28rem;
    width: 100%;
    padding: 2.5rem;
    background-color: white;
    border-radius: 0.75rem;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    border: 1px solid #f3f4f6;
`;

const Header = styled.div`
    text-align: center;
    margin-bottom: 2rem;
`;

const Title = styled.h2`
    font-size: 2.25rem;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #111827;
    margin-bottom: 0.5rem;
    cursor: pointer;
`;

const Subtitle = styled.p`
    font-size: 1rem;
    font-weight: 500;
    color: #6b7280;
`;

const FormSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label<{ $required?: boolean }>`
    display: block;
    font-size: 0.875rem;
    font-weight: 700;
    color: #374151;
    margin-bottom: 0.5rem;

    ${props => props.$required && `
        &::after {
        content: ' *';
        color: #ef4444;
        font-weight: 800;
        margin-left: 0.1rem;
        }
    `}
`;

const Input = styled.input`
    appearance: none;
    display: block;
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    color: #111827;
    font-size: 0.95rem;
    transition: border-color 0.2s;

    &::placeholder {
        color: #9ca3af;
    }

    &:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 1px #6366f1;
    }
`;

const AlertBanner = styled.div`
    background-color: #fef2f2;
    border: 1px solid #fecaca;
    color: #b91c1c;
    padding: 0.75rem;
    border-radius: 0.5rem;
    font-size: 0.875rem;
    text-align: center;
    font-weight: 500;
`;

const PrimaryButton = styled.button`
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0.875rem 1rem;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    color: white;
    background-color: #111827;
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.01em;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

    &:hover:not(:disabled) {
        background-color: #000000;
        transform: translateY(-1px);
    }

    &:disabled {
        background-color: #9ca3af;
        cursor: not-allowed;
    }
`;

const ToggleButton = styled.button`
    margin-top: 0.5rem;
    background: none;
    border: none;
    color: #4f46e5;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    
    &:hover {
        text-decoration: underline;
    }
`;