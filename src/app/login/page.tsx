'use client';

import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/useOnboardingStore';

export default function LoginPage() {
    const router = useRouter();
    const resetStore = useOnboardingStore((state) => state.reset);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        
        resetStore();
        
        router.push('/dashboard');
    };

    const handleCreateAccount = (e: React.FormEvent) => {
        e.preventDefault();
        
        resetStore();
        
        router.push('/onboarding/step1');
    };

    return (
        <PageContainer>
            <LoginCard>
                <Header>
                <Title>CiteConnect</Title>
                <Subtitle>Your AI-powered research assistant</Subtitle>
                </Header>
                
                <FormSection>
                <GoogleButton type="button" onClick={handleLogin}>
                    <Image 
                    src="https://www.svgrepo.com/show/475656/google-color.svg" 
                    alt="Google logo"
                    height={10}
                    width={10}
                    />
                    Sign in with Google
                </GoogleButton>

                <Divider>
                    <Line />
                    <DividerText>Or continue with</DividerText>
                    <Line />
                </Divider>

                <Form onSubmit={handleLogin}>
                    <InputGroup>
                    <Label htmlFor="email" $required>Email address</Label>
                    <Input id="email" type="email" placeholder="Email address" />
                    </InputGroup>
                    
                    <InputGroup>
                    <Label htmlFor="password" $required>Password</Label>
                    <Input id="password" type="password" placeholder="Password" />
                    </InputGroup>

                    <PrimaryButton type="submit">Sign in</PrimaryButton>
                    <PrimaryButton onClick={handleCreateAccount}>Create Account</PrimaryButton>
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

const GoogleButton = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    background-color: white;
    color: #374151;
    font-weight: 600;
    font-size: 0.95rem;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
        background-color: #f9fafb;
    }

    img {
        height: 1.25rem;
        width: 1.25rem;
        margin-right: 0.5rem;
    }
`;

const Divider = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Line = styled.div`
    flex-grow: 1;
    border-top: 1px solid #d1d5db;
`;

const DividerText = styled.span`
    padding: 0 0.5rem;
    background-color: white;
    color: #6b7280;
    font-size: 0.875rem;
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

    &::placeholder {
        color: #9ca3af;
    }

    &:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 1px #6366f1;
    }
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

    &:hover {
        background-color: #000000;
        transform: translateY(-1px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
`;