'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

// 1. The Animation
const rotate = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

// 2. The Container (Centers the spinner)
const LoaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    min-height: 200px; /* Ensure it takes up space */
    color: #666;
    gap: 1rem;
`;

// 3. The Spinner Circle
const Spinner = styled.div<{ size?: number }>`
    width: ${props => props.size || 40}px;
    height: ${props => props.size || 40}px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-top: 3px solid #0070f3; /* Your Brand Color */
    border-radius: 50%;
    animation: ${rotate} 0.8s linear infinite;
`;

const LoadingText = styled.p`
    font-size: 0.875rem;
    font-weight: 500;
    color: #888;
`;

interface LoaderProps {
    text?: string;
    size?: number;
}

export default function Loader({ text = "Loading...", size }: LoaderProps) {
    return (
        <LoaderWrapper>
            <Spinner size={size} />
            {text && <LoadingText>{text}</LoadingText>}
        </LoaderWrapper>
    );
}