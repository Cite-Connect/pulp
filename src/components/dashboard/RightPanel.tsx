'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FiBookmark, FiThumbsUp, FiThumbsDown, FiCheck } from 'react-icons/fi';
import { useSelectionStore } from '@/store/useSelectionStore';
import { useLibraryStore } from '@/store/useLibraryStore'; 
import { fetchPaperDetails } from '@/api/services/paper';
import { PaperDetails } from '@/api/interface/types';
import Loader from '@/components/common/Loader';

// --- Component ---
export default function RightPanel() {
    const selectedNode = useSelectionStore((state) => state.selectedNode);
    
    // 1. Get the list of saved papers + toggle action
    const { savedPapers, toggleSave } = useLibraryStore();

    const [details, setDetails] = useState<PaperDetails | null>(null);
    const [loading, setLoading] = useState(false);
    const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);

    // 2. Fetch Details when selection changes
    useEffect(() => {
        const loadDetails = async () => {
        if (!selectedNode) return;
        
        setDetails(null); 
        setFeedback(null);

        try {
            setLoading(true);
            // Ensure ID is passed as a string
            const data = await fetchPaperDetails(String(selectedNode.id));
            setDetails(data);
        } catch (err) {
            console.error("Failed to load details", err);
        } finally {
            setLoading(false);
        }
        };

        loadDetails();
    }, [selectedNode]);

    if (!selectedNode) {
        return (
        <PanelContainer>
            <EmptyState>Select a paper to view details.</EmptyState>
        </PanelContainer>
        );
    }

    // 3. Loading State (Generic Loader)
    if (loading) {
        return (
        <PanelContainer>
            <Loader text="Fetching details..." size={40} />
        </PanelContainer>
        );
    }

    // 4. Smart Fallback Logic (Prevents flickering titles)
    const fallbackData = selectedNode ? {
        ...selectedNode,
        title: selectedNode.label || "Untitled Paper", // Map label -> title
        matching_aspects: [] as string[],
        tldr: null,
        quality_score: 0,
        authors: selectedNode.authors || [], 
        abstract: "",
        year: selectedNode.year || new Date().getFullYear(),
        citation_count: selectedNode.citation_count || 0,
        domain: selectedNode.domain || 'Research'
    } : null;

    const display = details || (fallbackData as unknown as PaperDetails);

    // 5. Individual Save Check
    // Is *this specific paper* in the user's library?
    const isPaperSaved = savedPapers.some((p) => p.id === display.id);

    // Handlers
    const handleFeedback = (type: 'like' | 'dislike') => {
        setFeedback(prev => (prev === type ? null : type));
        // TODO: Add API call here
    };

    return (
        <PanelContainer>
        {/* Header Info */}
        <div style={{ marginBottom: '1rem' }}>
            <Badge>{display.domain}</Badge>
            {display.quality_score && display.quality_score > 0 && (
            <span style={{ fontSize: '0.75rem', color: '#666' }}>
                Score: {Math.round(display.quality_score * 100)}%
            </span>
            )}
        </div>

        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', lineHeight: '1.3' }}>
            {display.title}
        </h2>

        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
            {display.year} • {display.citation_count} Citations
        </p>

        {/* --- ACTION BAR --- */}
        <ActionRow>
            <ActionButton 
            onClick={() => toggleSave(display)} 
            $active={isPaperSaved}
            >
            {isPaperSaved ? <FiCheck size={14} /> : <FiBookmark size={14} />}
            {isPaperSaved ? 'Saved' : 'Save'}
            </ActionButton>

            <ActionButton onClick={() => handleFeedback('like')} $active={feedback === 'like'}>
            <FiThumbsUp size={14} />
            </ActionButton>

            <ActionButton onClick={() => handleFeedback('dislike')} $active={feedback === 'dislike'}>
            <FiThumbsDown size={14} />
            </ActionButton>
        </ActionRow>

        {/* TLDR Section */}
        {display.tldr && (
            <TldrBox>
            <strong>TL;DR:</strong> {display.tldr}
            </TldrBox>
        )}

        {/* Matching Aspects */}
        {display.matching_aspects && display.matching_aspects.length > 0 && (
            <div style={{ marginBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#888', marginBottom: '0.5rem' }}>
                MATCHING TOPICS
            </h4>
            {display.matching_aspects.map((tag: string) => (
                <AspectTag key={tag}>{tag}</AspectTag>
            ))}
            </div>
        )}

        <h4 style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>ABSTRACT</h4>
        <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#444', marginBottom: '2rem' }}>
            {display.abstract || "No abstract available."}
        </p>

        {/* Primary Action Button (Bottom) */}
        <div style={{ marginTop: 'auto' }}>
            <button 
            onClick={() => toggleSave(display)}
            style={{ 
                width: '100%', 
                padding: '12px', 
                background: isPaperSaved ? '#e3f2fd' : '#1a1a1a', 
                color: isPaperSaved ? '#1565c0' : 'white', 
                border: isPaperSaved ? '1px solid #2196f3' : 'none',
                borderRadius: '6px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
            }}
            >
                {isPaperSaved ? 'Remove from Library' : 'Add to Library'}
            </button>
        </div>

        </PanelContainer>
    );
}

const PanelContainer = styled.aside`
    width: 350px;
    background: #ffffff;
    border-left: 1px solid #eaeaea;
    padding: 1.5rem;
    height: 100%;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
`;

const EmptyState = styled.div`
    color: #888;
    text-align: center;
    margin-top: 50%;
    font-size: 0.9rem;
`;

const Badge = styled.span`
    background: #e3f2fd;
    color: #1565c0;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    margin-right: 0.5rem;
`;

const AspectTag = styled.span`
    background: #f3e5f5;
    color: #7b1fa2;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.7rem;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    display: inline-block;
`;

const TldrBox = styled.div`
    background: #f9f9f9;
    border-left: 3px solid #4caf50;
    padding: 10px;
    margin: 1rem 0;
    font-size: 0.85rem;
    color: #333;
    font-style: italic;
    line-height: 1.4;
`;

// --- Action Bar Styles ---
const ActionRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0 1.5rem 0;
    padding-bottom: 1rem;
    border-bottom: 1px solid #f0f0f0;
`;

const ActionButton = styled.button<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 6px;
    background: ${props => props.$active ? '#e3f2fd' : 'transparent'};
    border: 1px solid ${props => props.$active ? '#2196f3' : '#eaeaea'};
    padding: 6px 10px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 500;
    color: ${props => props.$active ? '#1565c0' : '#666'};
    transition: all 0.2s ease;

    &:hover {
        background: #f5f5f5;
        border-color: #d0d0d0;
        color: #333;
    }
`;