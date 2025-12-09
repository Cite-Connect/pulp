'use client';

import React from 'react';
import styled from 'styled-components';
import { useLibraryStore } from '@/store/useLibraryStore';
import { useSelectionStore } from '@/store/useSelectionStore';
import { GraphNode } from '@/api/interface/types';


export default function LibraryList() {
    const savedPapers = useLibraryStore((state) => state.savedPapers);
    const setSelectedNode = useSelectionStore((state) => state.setSelectedNode);

    if (savedPapers.length === 0) return null;

    return (
    <div>
        <SectionTitle>My Library ({savedPapers.length})</SectionTitle>
        
        {savedPapers.map((paper) => (
        <SavedItem 
            key={paper.paper_id}
            onClick={() => {
                // Click to view details
                setSelectedNode({
                    ...paper, 
                    label: paper.title 
                } as unknown as GraphNode);
            }}
            title={paper.title} // Tooltip on hover
        >
            {paper.title}
        </SavedItem>
        ))}
    </div>
    );
}

const SectionTitle = styled.h3`
    font-size: 0.75rem;
    font-weight: 700;
    color: #888;
    margin-top: 2rem;
    margin-bottom: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    padding-left: 10px; /* Align with items */
`;

const SavedItem = styled.div`
    padding: 8px 10px;
    margin-bottom: 4px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
    color: #333;
    transition: background 0.2s;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &:hover {
        background: #e3f2fd;
        color: #1565c0;
    }
`;