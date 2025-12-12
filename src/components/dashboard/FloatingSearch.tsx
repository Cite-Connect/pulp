'use client';

import React, { useState, useEffect, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiSearch, FiLoader, FiChevronDown } from 'react-icons/fi';
import { paperApi } from '@/api/services/paper';
import { useFeedStore } from '@/store/useFeedStore';
import { useRecommendationStore } from '@/store/useRecommendationStore';
import { useDashboardStore } from '@/store/useDashboardStore';
import { generateSessionId } from '@/utils/session';

export default function FloatingSearch() {
    const [query, setQuery] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [selectedModel, setSelectedModel] = useState<'specter' | 'llama'>('specter');
    const inputRef = useRef<HTMLInputElement>(null);
    
    const { setPapers, setLoading } = useFeedStore();
    const { setRecommendations } = useRecommendationStore();

    const { setInspectingPaper, setSelectedPaperId, setGraphData } = useDashboardStore();

    useEffect(() => {
        const handleShortcut = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        window.addEventListener('keydown', handleShortcut);
        return () => window.removeEventListener('keydown', handleShortcut);
    }, []);

    const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && query.trim()) {
            e.preventDefault();
            
            setIsSearching(true);
            setLoading(true);

            setInspectingPaper(null);      
            setSelectedPaperId(null);      
            setGraphData(null);            

            try {
                const rawId = localStorage.getItem('userId');
                const userId = rawId ? Number(rawId) : 0;
                
                const response = await paperApi.getRecommendations({
                    search_query: query,
                    user_id: userId,
                    count: 10,
                    model_preference: selectedModel === 'specter' ? 'specter' : 'minilm',
                    session_id: localStorage.getItem('sessionId') || generateSessionId(userId),
                });

                setRecommendations(response.recommendations, response.metadata);
                setPapers(response.recommendations);
                
            } catch (err) {
                console.error("Search failed:", err);
            } finally {
                setIsSearching(false);
                setLoading(false);
            }
        }
    };

    return (
        <Container>
            <InputWrapper onClick={() => inputRef.current?.focus()}>
                {isSearching ? (
                    <SpinnerIcon />
                ) : (
                    <FiSearch size={20} color="#9ca3af" />
                )}
                
                <Input 
                    ref={inputRef}
                    placeholder="Ask a question or search for papers..." 
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isSearching}
                />

                {/* Model Selector */}
                <SelectWrapper onClick={(e) => e.stopPropagation()}>
                    <ModelSelect 
                        value={selectedModel} 
                        onChange={(e) => setSelectedModel(e.target.value as 'specter' | 'llama')}
                        disabled={isSearching}
                    >
                        <option value="specter">Specter (Recommended)</option>
                        <option value="llama">all minilm</option>
                    </ModelSelect>
                    <FiChevronDown size={14} className="chevron" />
                </SelectWrapper>
                
                <KbdShortcut>⌘ K</KbdShortcut>
            </InputWrapper>
        </Container>
    );
}

const Container = styled.div`
    position: fixed;
    bottom: 2rem;
    left: 260px; 
    right: 340px; 
    display: flex;
    justify-content: center;
    z-index: 50;
    pointer-events: none; 
`;

const InputWrapper = styled.div`
    pointer-events: auto;
    width: 100%;
    max-width: 700px;
    background-color: #1f2937; 
    color: white;
    border-radius: 1rem;
    padding: 0.75rem 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    border: 1px solid #374151;
    transition: transform 0.2s, border-color 0.2s;
    cursor: text;

    &:focus-within {
        transform: translateY(-4px);
        border-color: #6366f1; 
    }
`;

const Input = styled.input`
    flex: 1;
    background: transparent;
    border: none;
    color: white;
    font-size: 1rem;
    font-weight: 500;
    min-width: 0;

    &:focus {
        outline: none;
    }
    
    &::placeholder {
        color: #9ca3af;
    }
`;

const SelectWrapper = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background-color: #374151;
    border-radius: 0.5rem;
    padding: 0 0.5rem;
    height: 2rem;

    .chevron {
        color: #9ca3af;
        pointer-events: none;
        position: absolute;
        right: 0.5rem;
    }
`;

const ModelSelect = styled.select`
    appearance: none;
    background: transparent;
    border: none;
    color: #e5e7eb;
    font-size: 0.75rem;
    font-weight: 600;
    padding-right: 1.5rem;
    padding-left: 0.25rem;
    cursor: pointer;
    outline: none;

    option {
        background-color: #1f2937;
        color: white;
    }

    &:focus {
        color: white;
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
    white-space: nowrap;
`;

const spin = keyframes`
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
`;

const SpinnerIcon = styled(FiLoader)`
    animation: ${spin} 1s linear infinite;
    color: #6366f1;
    font-size: 20px;
`;