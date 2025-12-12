'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLoaderStore } from '@/store/useLoaderStore';

export default function GlobalLoader() {
    const { isLoading } = useLoaderStore();

    if (!isLoading) return null;

    return (
        <Overlay>
            <Spinner />
        </Overlay>
    );
}

// --- STYLES ---

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent white */
    backdrop-filter: blur(2px);
    z-index: 9999; /* Highest priority */
    display: flex;
    align-items: center;
    justify-content: center;
`;

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    width: 50px;
    height: 50px;
    border: 5px solid #f3f3f3;
    border-top: 5px solid #4f46e5; /* Indigo-600 */
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
`;