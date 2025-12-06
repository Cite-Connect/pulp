'use client';

import React from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi';

export default function FloatingSearch() {
    return (
        <Container>
            <InputWrapper>
                <FiSearch size={20} color="#9ca3af" />
                <Input placeholder="Ask a question or search for papers..." />
            </InputWrapper>
        </Container>
    );
}

const Container = styled.div`
    position: fixed;
    bottom: 2rem;
    /* These offsets ensure it centers visually between the sidebars */
    left: 260px; 
    right: 340px; 
    display: flex;
    justify-content: center;
    z-index: 50;
    pointer-events: none; /* Allows clicks to pass through around the bar */
`;

const InputWrapper = styled.div`
    pointer-events: auto;
    width: 100%;
    max-width: 640px;
    background-color: #1f2937; /* Dark */
    color: white;
    border-radius: 1rem;
    padding: 1rem 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    border: 1px solid #374151;
    transition: transform 0.2s;

    &:focus-within {
        transform: translateY(-4px);
        border-color: #6366f1; /* Indigo glow */
    }
`;

const Input = styled.input`
    flex: 1;
    background: transparent;
    border: none;
    color: white;
    font-size: 1rem;
    font-weight: 500;

    &:focus {
        outline: none;
    }
    
    &::placeholder {
        color: #9ca3af;
    }
`;

const KbdShortcut = styled.kbd`
    background-color: #374151;
    color: #9ca3af;
    padding: 0.25rem 0.5rem;
    border-radius: 0.375rem;
    font-size: 0.75rem;
    font-weight: 700;
    min-width: 2.5rem;
    text-align: center;
    border-bottom: 2px solid #111827;
`;