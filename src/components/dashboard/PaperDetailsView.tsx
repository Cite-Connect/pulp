'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { FiShare2, FiArrowLeft, FiBookmark, FiCheck, FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { PaperDetails } from '@/api/interface/types';
import { useLibraryStore } from '@/store/useLibraryStore';

interface PaperDetailViewProps {
    paper: PaperDetails;
    onBack: () => void;
}

export default function PaperDetailView({ paper, onBack }: PaperDetailViewProps) {
    const { savedPapers, toggleSave } = useLibraryStore();
    const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null);

    const isPaperSaved = savedPapers.some(p => p.paper_id === paper.paper_id);

    const handleFeedback = (type: 'like' | 'dislike') => {
        setFeedback(prev => (prev === type ? null : type));
    };

    return (
        <Panel>
            <PanelHeader>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <IconButton onClick={onBack} title="Back">
                    <FiArrowLeft />
                </IconButton>
                <PanelTitle>Paper Details</PanelTitle>
                </div>
                <IconButton><FiShare2 /></IconButton>
            </PanelHeader>

            <ScrollableContent>
                <div style={{ marginBottom: '1rem' }}>
                <Badge>{paper.domain}</Badge>
                {paper.quality_score && paper.quality_score > 0 && (
                    <span style={{ fontSize: '0.75rem', color: '#666' }}>
                    Score: {Math.round(paper.quality_score * 100)}%
                    </span>
                )}
                </div>

                <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                {paper.title}
                </h2>

                <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.5rem' }}>
                {paper.year} • {paper.citation_count} Citations
                </p>

                <ActionRow>
                <ActionButton 
                    onClick={() => toggleSave(paper)} 
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

                {paper.tldr && (
                <TldrBox>
                    <strong>TL;DR:</strong> {paper.tldr}
                </TldrBox>
                )}

                {paper.matching_aspects && paper.matching_aspects.length > 0 && (
                <div style={{ marginBottom: '1rem' }}>
                    <h4 style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#888', marginBottom: '0.5rem' }}>
                    MATCHING TOPICS
                    </h4>
                    {paper.matching_aspects.map((tag: string) => (
                    <AspectTag key={tag}>{tag}</AspectTag>
                    ))}
                </div>
                )}

                <h4 style={{ fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>ABSTRACT</h4>
                <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#444', marginBottom: '2rem' }}>
                {paper.abstract || "No abstract available."}
                </p>
            </ScrollableContent>
        </Panel>
    );
}

const Panel = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
`;

const PanelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
    margin-bottom: 1rem;
`;

const PanelTitle = styled.h3`
    font-size: 1rem;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.02em;
`;

const IconButton = styled.button`
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover { color: #111827; }
`;

const ScrollableContent = styled.div`
    flex: 1;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    padding-right: 0.5rem;
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { background-color: #e5e7eb; border-radius: 4px; }
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

const ActionRow = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 1rem 0 1rem 0;
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

const PrimaryButton = styled.button`
    width: 100%;
    padding: 12px;
    background: #1a1a1a;
    color: white;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
        background: #000;
        transform: translateY(-1px);
    }
`;