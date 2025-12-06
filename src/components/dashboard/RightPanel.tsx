'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from '@/components/common/Loader';
import { useSelectionStore } from '@/store/useSelectionStore';
import { fetchPaperDetails } from '@/api/services/paper';
import { PaperDetails } from '@/api/interface/types';

export default function RightPanel() {
    const selectedNode = useSelectionStore((state) => state.selectedNode);
    const [details, setDetails] = useState<PaperDetails | null>(null);
    const [loading, setLoading] = useState(false);

    // Fetch full details when a node is selected
    useEffect(() => {
        const loadDetails = async () => {
        if (!selectedNode) return;
        
        // Reset details when selection changes so we don't show old data
        setDetails(null); 
        
        try {
            setLoading(true);
            // Ensure we are using the ID correctly
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

    if (loading) {
    return (
        <PanelContainer>
            {/* The new generic loader goes here */}
            <Loader text="Fetching paper details..." size={40} />
        </PanelContainer>
        );
    }

  // --- THE FIX IS HERE ---
  // We create a "safe" fallback object that maps Graph data to the API structure.
    const fallbackData = selectedNode ? {
        // 1. Copy existing fields
        ...selectedNode,
        
        // 2. Map 'label' (Graph) -> 'title' (UI)
        // This ensures the title shows up INSTANTLY without flickering
        title: selectedNode.label, 
        
        // 3. Provide strict defaults for missing API fields
        matching_aspects: [] as string[],
        tldr: null,
        quality_score: 0,
        authors: selectedNode.authors || [], 
        abstract: "",
        year: selectedNode.year || new Date().getFullYear(),
        citation_count: selectedNode.citation_count || 0,
        domain: selectedNode.domain || 'Paper'
    } : null;

  // Use API details if loaded, otherwise use the smart fallback.
  // We use 'as unknown' to safely bypass strict structure checks without using 'any'
    const display = details || (fallbackData as unknown as PaperDetails);

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

        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>
            {display.title}
        </h2>

        <p style={{ fontSize: '0.85rem', color: '#666', marginBottom: '1rem' }}>
            {display.year} • {display.citation_count} Citations
        </p>

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
        <p style={{ fontSize: '0.9rem', lineHeight: '1.6', color: '#444' }}>
            {display.abstract || "No abstract available."}
        </p>

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
`;