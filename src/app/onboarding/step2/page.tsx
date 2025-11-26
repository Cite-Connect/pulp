'use client';

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/useOnboardingStore';

export default function Step2Page() {
    const router = useRouter();
    
    // 1. Access Store Actions
    const setScholarData = useOnboardingStore((state) => state.setScholarData);
    
    const [url, setUrl] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleImport = () => {
        if (!url) return;
        setStatus('loading');
        // Simulate API delay
        setTimeout(() => {
        setStatus('success');
        // Save data to store
        setScholarData(url, true);
        }, 2000); 
    };

    const handleSkip = () => {
        // Explicitly set as not linked
        setScholarData('', false);
        router.push('/onboarding/step3');
    };

    const handleFinish = () => {
        router.push('/onboarding/step3');
    };

    return (
        <Wrapper>
        <Header>
            <Title>Connect your research</Title>
            <Description>
            Import your Google Scholar profile to instantly personalize recommendations based on your past work. 
            <br />
            <Highlight>Don&apos;t have a profile? No problem. You can skip this step.</Highlight>
            </Description>
        </Header>

        <FormGroup>
            <Label>Google Scholar Profile URL</Label>
            <InputWrapper>
            <StyledInput 
                type="text" 
                placeholder="https://scholar.google.com/citations?user=..." 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <ImportButton 
                onClick={handleImport} 
                disabled={status === 'loading' || status === 'success'}
            >
                {status === 'loading' ? 'Searching...' : 'Import Papers'}
            </ImportButton>
            </InputWrapper>
        </FormGroup>

        {/* LOADING STATE */}
        {status === 'loading' && (
            <LoadingContainer>
            <Spinner />
            <LoadingText>Fetching your publications...</LoadingText>
            </LoadingContainer>
        )}

        {/* SUCCESS STATE */}
        {status === 'success' && (
            <SuccessCard>
            <IconWrapper>
                <svg viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
            </IconWrapper>
            <SuccessContent>
                <SuccessTitle>Profile Found</SuccessTitle>
                <SuccessText>
                Is this you? We found <strong>Abhinav Aditya</strong> with 5 recent publications.
                </SuccessText>
                <PaperList>
                <li>Deep Learning for AI... (2024)</li>
                <li>Model Compression Techniques... (2025)</li>
                </PaperList>
            </SuccessContent>
            </SuccessCard>
        )}

        <Footer>
            <BackButton type="button" onClick={() => router.back()}>Back</BackButton>
            <ButtonGroup>
            <SecondaryButton onClick={handleSkip}>Skip (I don&apos;t have an account)</SecondaryButton>
            
            <PrimaryButton 
                onClick={handleFinish} 
                disabled={status !== 'success'}
            >
                {status === 'success' ? 'Confirm & Finish' : 'Finish Setup'}
            </PrimaryButton>
            </ButtonGroup>
        </Footer>
        </Wrapper>
    );
}


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
`;

const Header = styled.div``;

const Title = styled.h1`
    font-size: 1.75rem;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.025em;
    margin-bottom: 0.5rem;
`;

const Description = styled.p`
    font-size: 1rem;
    color: #4b5563;
    line-height: 1.6;
`;

const Highlight = styled.span`
    color: #6b7280;
    font-weight: 500;
    display: block;
    margin-top: 0.5rem;
`;

const FormGroup = styled.div`
    margin-top: 0.5rem;
`;

const Label = styled.label`
    display: block;
    font-size: 0.875rem;
    font-weight: 700;
    color: #374151;
    margin-bottom: 0.5rem;
`;

const InputWrapper = styled.div`
    display: flex;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    border-radius: 0.5rem;
    overflow: hidden;
`;

const StyledInput = styled.input`
    flex: 1;
    min-width: 0;
    padding: 0.75rem 1rem;
    border: 1px solid #d1d5db;
    border-right: none;
    border-top-left-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
    font-size: 0.95rem;
    transition: border-color 0.2s;

    &:focus {
        outline: none;
        border-color: #6366f1;
        box-shadow: 0 0 0 1px #6366f1;
        z-index: 10;
    }
`;

const ImportButton = styled.button`
    display: inline-flex;
    align-items: center;
    padding: 0 1.25rem;
    border: 1px solid #d1d5db;
    border-left: none;
    border-top-right-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    background-color: #f9fafb;
    color: #374151;
    font-size: 0.875rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
        background-color: #f3f4f6;
        color: #111827;
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.7;
        background-color: #f3f4f6;
    }
`;

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
    padding: 2rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
`;

const Spinner = styled.div`
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 50%;
    border: 3px solid #e5e7eb;
    border-bottom-color: #4f46e5;
    animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.span`
    font-size: 0.875rem;
    color: #6b7280;
    font-weight: 500;
`;

const SuccessCard = styled.div`
    background-color: #f0fdf4;
    border: 1px solid #bbf7d0;
    border-radius: 0.5rem;
    padding: 1.25rem;
    display: flex;
    animation: fadein 0.3s ease-in;
`;

const IconWrapper = styled.div`
    flex-shrink: 0;
    svg {
        height: 1.5rem;
        width: 1.5rem;
        color: #22c55e;
    }
`;

const SuccessContent = styled.div`
    margin-left: 1rem;
`;

const SuccessTitle = styled.h3`
    font-size: 0.95rem;
    font-weight: 700;
    color: #166534;
`;

const SuccessText = styled.div`
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: #15803d;
    line-height: 1.4;
`;

const PaperList = styled.ul`
    list-style-type: disc;
    list-style-position: inside;
    margin-top: 0.5rem;
    padding-left: 0.25rem;
    font-size: 0.75rem;
    color: #15803d;
    opacity: 0.9;
`;

const Footer = styled.div`
    padding-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #e5e7eb;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
`;

const BackButton = styled.button`
    font-size: 0.95rem;
    font-weight: 600;
    color: #6b7280;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.2s;

    &:hover {
        color: #111827;
    }
`;

const SecondaryButton = styled.button`
    display: inline-flex;
    justify-content: center;
    padding: 0.75rem 1.25rem;
    border: 1px solid #d1d5db;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    font-size: 0.875rem;
    font-weight: 600;
    border-radius: 0.5rem;
    color: #374151;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #f9fafb;
        border-color: #9ca3af;
    }
`;

const PrimaryButton = styled.button`
    display: inline-flex;
    justify-content: center;
    padding: 0.75rem 1.5rem;
    border: 1px solid transparent;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    font-size: 0.875rem;
    font-weight: 700;
    border-radius: 0.5rem;
    color: white;
    background-color: #111827;
    cursor: pointer;
    transition: all 0.2s;

    &:hover:not(:disabled) {
        background-color: #000000;
        transform: translateY(-1px);
    }

    &:disabled {
        background-color: #9ca3af;
        cursor: not-allowed;
        box-shadow: none;
    }
`;