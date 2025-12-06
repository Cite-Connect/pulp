'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled, { keyframes } from 'styled-components';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
        router.replace('/unauthorized');
        } else {
        setTimeout(() => {
            setAuthorized(true);
        }, 0);
        }
    }, [router]);

    if (!authorized) {
        return (
        <LoaderContainer>
            <Spinner />
        </LoaderContainer>
        );
    }

    return <>{children}</>;
}

const LoaderContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;
`;

const spin = keyframes`
    to { transform: rotate(360deg); }
`;

const Spinner = styled.div`
    width: 3rem;
    height: 3rem;
    border: 4px solid #e5e7eb;
    border-top-color: #111827; /* Dark accent */
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
`;