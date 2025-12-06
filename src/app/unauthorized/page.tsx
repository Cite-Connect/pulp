'use client';

import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FiLock } from 'react-icons/fi';

export default function UnauthorizedPage() {
    return (
        <Container>
        <Card>
            <IconWrapper>
                <FiLock />
            </IconWrapper>
            <Title>Access Denied</Title>
            <Description>
                It looks like you are not logged in or your session has expired. 
                Please sign in to access your research dashboard.
            </Description>
            
            <ButtonGroup>
                <Link href="/login" passHref>
                    <PrimaryButton>Go to Login</PrimaryButton>
                </Link>
                <Link href="/" passHref>
                    <SecondaryButton>Back to Home</SecondaryButton>
                </Link>
            </ButtonGroup>
        </Card>
        </Container>
    );
}

// --- STYLES ---

const Container = styled.div`
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;
    padding: 1rem;
`;

const Card = styled.div`
    max-width: 450px;
    width: 100%;
    background: white;
    padding: 3rem 2rem;
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
    text-align: center;
`;

const IconWrapper = styled.div`
    width: 4rem;
    height: 4rem;
    background-color: #fee2e2; /* red-100 */
    color: #ef4444; /* red-500 */
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.75rem;
    margin: 0 auto 1.5rem auto;
`;

const Title = styled.h1`
    font-size: 1.5rem;
    font-weight: 800;
    color: #111827;
    margin-bottom: 0.75rem;
`;

const Description = styled.p`
    color: #6b7280;
    line-height: 1.6;
    margin-bottom: 2rem;
`;

const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const PrimaryButton = styled.a`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: #111827;
    color: white;
    font-weight: 600;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: transform 0.1s;

    &:hover {
        transform: translateY(-1px);
        background-color: #000000;
    }
`;

const SecondaryButton = styled.a`
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0.75rem 1rem;
    background-color: white;
    color: #374151;
    font-weight: 600;
    border: 1px solid #d1d5db;
    border-radius: 0.5rem;
    cursor: pointer;
    
    &:hover {
        background-color: #f9fafb;
    }
`;