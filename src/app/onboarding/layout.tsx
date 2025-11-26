'use client';

import React from 'react';
import styled from 'styled-components';
import { usePathname } from 'next/navigation';

const LayoutWrapper = styled.div`
min-height: 100vh;
background-color: #f9fafb;
padding: 3rem 1rem;
`;

const Container = styled.div`
max-width: 48rem;
margin: 0 auto;
`;

const ProgressContainer = styled.div`
margin-bottom: 2rem;
display: flex;
align-items: center;
justify-content: space-between;
`;

const Step = styled.div`
display: flex;
flex-direction: column;
align-items: center;
position: relative;
z-index: 10;
`;

const StepLabel = styled.span`
margin-top: 0.25rem;
font-size: 0.75rem;
font-weight: 500;
color: #4b5563;
`;

const Circle = styled.div<{ $active: boolean }>`
width: 2rem;
height: 2rem;
border-radius: 9999px;
display: flex;
align-items: center;
justify-content: center;
font-size: 0.875rem;
font-weight: 600;

background-color: ${props => props.$active ? '#4f46e5' : '#e5e7eb'};
color: ${props => props.$active ? 'white' : '#6b7280'};
transition: background-color 0.3s ease;
`;

const Line = styled.div<{ $active: boolean }>`
flex: 1;
height: 0.25rem;
margin: 0 1rem;
background-color: ${props => props.$active ? '#4f46e5' : '#e5e7eb'};
transition: background-color 0.3s ease;
`;

const ContentCard = styled.div`
background-color: white;
border-radius: 0.5rem;
box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
padding: 1.5rem;

@media (min-width: 640px) {
    padding: 2.5rem;
}
`;

export default function OnboardingLayout({
children,
}: {
children: React.ReactNode;
}) {
    const pathname = usePathname();
    const currentStep = pathname.includes('step2') ? 2 : pathname.includes('step3') ? 3 : 1;

    return (
        <LayoutWrapper>
        <Container>
            {/* Progress Bar */}
            <ProgressContainer>
            <Step>
                <Circle $active={currentStep >= 1}>1</Circle>
                <StepLabel>Profile</StepLabel>
            </Step>
            
            <Line $active={currentStep >= 2} />
            
            <Step>
                <Circle $active={currentStep >= 2}>2</Circle>
                <StepLabel>Research</StepLabel>
            </Step>
            
            <Line $active={currentStep > 2} />
            
            <Step>
                <Circle $active={currentStep > 2}>3</Circle>
                <StepLabel>Finish</StepLabel>
            </Step>
            </ProgressContainer>

            {/* Content Card */}
            <ContentCard>
            {children}
            </ContentCard>
        </Container>
        </LayoutWrapper>
    );
}