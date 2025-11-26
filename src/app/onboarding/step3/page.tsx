'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/useOnboardingStore';

export default function Step3Page() {
    const router = useRouter();
    
    // Read Store Data
    const { role, domain, scholarLinked } = useOnboardingStore();

    return (
        <Wrapper>
        <Header>
            <Title>You&apos;re all set!</Title>
            <Description>
            We&apos;ve customized your research feed. Here is a snapshot of your profile before you dive in.
            </Description>
        </Header>

        <SummaryCard>
            <CardRow>
            <RowLabel>Role</RowLabel>
            <RowValue>{role || 'Not Selected'}</RowValue>
            </CardRow>
            
            <Divider />
            
            <CardRow>
            <RowLabel>Domain of Interest</RowLabel>
            {/* Display the single domain badge */}
            {domain ? (
                <DomainBadge>{domain}</DomainBadge>
            ) : (
                <span style={{color: '#9ca3af', fontSize: '0.875rem'}}>None selected</span>
            )}
            </CardRow>

            <Divider />

            <CardRow>
            <RowLabel>Linked Account</RowLabel>
            <StatusBadge $active={scholarLinked}>
                {scholarLinked ? (
                <>
                    <StatusDot /> Google Scholar Connected
                </>
                ) : (
                'Not Connected'
                )}
            </StatusBadge>
            </CardRow>
        </SummaryCard>

        <InfoBox>
            <InfoIcon>💡</InfoIcon>
            <InfoText>
            <strong>Pro Tip:</strong> You can always update your domain settings later in the preferences menu.
            </InfoText>
        </InfoBox>

        <Footer>
            <Link href="/dashboard" passHref>
            <LaunchButton onClick={() => router.replace('/dashboard')}>
                Launch Dashboard
                <ArrowIcon viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </ArrowIcon>
            </LaunchButton>
            </Link>
        </Footer>
        </Wrapper>
    );
}

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    animation: ${fadeIn} 0.5s ease-out;
`;

const Header = styled.div`
    text-align: center;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.025em;
    margin-bottom: 0.5rem;
`;

const Description = styled.p`
    font-size: 1rem;
    color: #6b7280;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.5;
`;

const SummaryCard = styled.div`
    background-color: #f9fafb;
    border: 1px solid #e5e7eb;
    border-radius: 0.75rem;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CardRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    @media (min-width: 640px) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
`;

const RowLabel = styled.span`
    font-size: 0.875rem;
    font-weight: 600;
    color: #6b7280;
    text-transform: uppercase;
    letter-spacing: 0.05em;
`;

const RowValue = styled.span`
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
`;

const Divider = styled.div`
    height: 1px;
    background-color: #e5e7eb;
    width: 100%;
`;

const DomainBadge = styled.span`
    display: inline-flex;
    padding: 0.35rem 1rem;
    border-radius: 9999px;
    font-size: 0.9rem;
    font-weight: 700;
    background-color: #111827; /* Dark Background */
    color: #ffffff; /* White Text */
`;

const StatusBadge = styled.div<{ $active: boolean }>`
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: ${props => props.$active ? '#059669' : '#6b7280'};
`;

const StatusDot = styled.span`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 50%;
    background-color: #10b981;
    box-shadow: 0 0 0 2px #d1fae5;
`;

const InfoBox = styled.div`
    display: flex;
    gap: 0.75rem;
    padding: 1rem;
    background-color: #fffbeb;
    border: 1px solid #fcd34d;
    border-radius: 0.5rem;
    color: #92400e;
    font-size: 0.875rem;
    line-height: 1.4;
    align-items: center;
`;

const InfoIcon = styled.span`
    font-size: 1.25rem;
`;

const InfoText = styled.p``;

const Footer = styled.div`
    padding-top: 1rem;
`;

const LaunchButton = styled.a`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 1rem;
    background-color: #111827;
    color: white;
    border-radius: 0.75rem;
    font-size: 1.125rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: #000000;
        transform: translateY(-2px);
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
    }
`;

const ArrowIcon = styled.svg`
    width: 1.25rem;
    height: 1.25rem;
    margin-left: 0.5rem;
`;