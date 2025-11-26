'use client';

import React from 'react';
import styled from 'styled-components';
import { FiShare2, FiHash } from 'react-icons/fi';

export default function RightPanel() {
    return (
        <Panel>
        <PanelHeader>
            <PanelTitle>Knowledge Graph</PanelTitle>
            <IconButton><FiShare2 /></IconButton>
        </PanelHeader>
        
        {/* Static Graph Visualization for MVP */}
        <GraphBox>
            <GraphNode $top={40} $left={50} $size={60} $main />
            <GraphNode $top={20} $left={30} $size={30} />
            <GraphNode $top={70} $left={20} $size={40} />
            <GraphNode $top={60} $left={80} $size={35} />
            <Connection $angle={-45} $top={30} $left={35} $width={40} />
            <Connection $angle={60} $top={55} $left={40} $width={40} />
            <Connection $angle={-10} $top={50} $left={65} $width={30} />
            <GraphLabel>Selecting a paper will expand its network here.</GraphLabel>
        </GraphBox>

        <PanelSection>
            <PanelTitle>Trending Topics</PanelTitle>
            <TopicTag><FiHash />Algorithmic Trading</TopicTag>
            <TopicTag><FiHash />Risk Modeling</TopicTag>
            <TopicTag><FiHash />Sentiment Analysis</TopicTag>
        </PanelSection>
        </Panel>
    );
}


const Panel = styled.aside`
    background-color: white;
    border-left: 1px solid #e5e7eb;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100%;
`;

const PanelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PanelTitle = styled.h3`
    font-size: 1rem;
    font-weight: 800;
    color: #111827;
`;

const IconButton = styled.button`
    background: none;
    border: none;
    color: #6b7280;
    cursor: pointer;
    &:hover { color: #111827; }
`;

const GraphBox = styled.div`
    height: 240px;
    background-color: #f8fafc;
    border-radius: 0.75rem;
    position: relative;
    overflow: hidden;
    border: 1px solid #e2e8f0;
`;

const GraphNode = styled.div<{ $top: number, $left: number, $size: number, $main?: boolean }>`
    position: absolute;
    top: ${props => props.$top}%;
    left: ${props => props.$left}%;
    width: ${props => props.$size}px;
    height: ${props => props.$size}px;
    border-radius: 50%;
    background-color: ${props => props.$main ? '#4f46e5' : '#e0e7ff'};
    border: 2px solid ${props => props.$main ? 'white' : '#c7d2fe'};
    box-shadow: ${props => props.$main ? '0 4px 6px -1px rgba(79, 70, 229, 0.4)' : 'none'};
    z-index: 10;
`;

const Connection = styled.div<{ $angle: number, $top: number, $left: number, $width: number }>`
    position: absolute;
    top: ${props => props.$top}%;
    left: ${props => props.$left}%;
    width: ${props => props.$width}px;
    height: 2px;
    background-color: #cbd5e1;
    transform: rotate(${props => props.$angle}deg);
    transform-origin: left center;
`;

const GraphLabel = styled.div`
    position: absolute;
    bottom: 0.75rem;
    left: 0;
    width: 100%;
    text-align: center;
    font-size: 0.75rem;
    color: #64748b;
`;

const PanelSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
`;

const TopicTag = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.875rem;
    font-weight: 600;
    color: #374151;
    padding: 0.5rem 0.75rem;
    background-color: #f3f4f6;
    border-radius: 0.375rem;
    cursor: pointer;
    
    &:hover {
        background-color: #e5e7eb;
        color: #111827;
    }
`;