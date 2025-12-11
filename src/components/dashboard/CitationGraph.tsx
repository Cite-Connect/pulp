'use client';

import React, { useState, useRef, useMemo, useEffect } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { FiGitCommit } from 'react-icons/fi';
import { GraphNode } from '@/api/interface/types';
import { paperApi } from '@/api/services/paper';
import { useSelectionStore } from '@/store/useSelectionStore';
import { useDashboardStore } from '@/store/useDashboardStore'; // <--- Import Dashboard Store

// Define the Node type extending GraphNode for simulation properties
interface SimulationNode extends GraphNode {
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    index?: number;
}

// Dynamically import to avoid SSR issues
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
    ssr: false,
    loading: () => <LoadingState>Loading Graph Engine...</LoadingState>
});

export default function CitationGraph() {
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
    const containerRef = useRef<HTMLDivElement>(null);
    
    // 1. Consume Data from Store instead of Props or Local State
    const { graphData } = useDashboardStore(); 
    
    // 2. We still use Selection Store to handle clicks on nodes
    const setSelectedNode = useSelectionStore((state) => state.setSelectedNode);
    const { setInspectingPaper } = useDashboardStore(); // To trigger details view on click

    // Resize Observer to handle layout changes
    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setDimensions({
                    width: entry.contentRect.width,
                    height: entry.contentRect.height
                });
            }
        });

        resizeObserver.observe(containerRef.current);
        return () => resizeObserver.disconnect();
    }, [graphData]); // Re-measure if data changes

    const handleNodeClick = async (nodeId: string) => {
        try {
            // Fetch details and open the "Paper Details" view in Right Panel
            const paperDetails = await paperApi.fetchPaperDetails(nodeId);
            setInspectingPaper(paperDetails); 
        } catch (error) {
            console.error("Failed to fetch paper details:", error);
        }
    };

    // Memoize nodes/links to prevent re-simulation on every render
    const nodesAndLinks = useMemo(() => {
        if (!graphData) return { nodes: [], links: [] };
        
        return {
            nodes: graphData.nodes.map(node => ({ ...node })),
            links: graphData.edges.map(link => ({ ...link }))
        };
    }, [graphData]);

    if (!graphData) {
        return (
            <GraphContainer ref={containerRef} style={{ alignItems: 'center', justifyContent: 'center' }}>
                <IconCircle>
                    <FiGitCommit />
                </IconCircle>
                <EmptyTitle>Explore the Knowledge Graph</EmptyTitle>
            </GraphContainer>
        );
    }

    return (
        <GraphContainer ref={containerRef}>
            <ForceGraph2D
                width={dimensions.width}
                height={dimensions.height}
                graphData={nodesAndLinks}
                
                backgroundColor="#f8fafc"
                nodeLabel="label"
                nodeRelSize={6}
                
                // Fix types for nodeColor
                nodeColor={(node: unknown) => {
                    const n = node as SimulationNode;
                    return n.type === 'central' ? '#ef4444' : (n.color || '#4f46e5');
                }}
                
                linkColor={() => '#cbd5e1'}
                linkWidth={1.5}
                linkDirectionalArrowLength={3.5}
                linkDirectionalArrowRelPos={1}
                
                d3VelocityDecay={0.3}
                cooldownTicks={100}
                
                // Interactions
                onNodeClick={(node: unknown) => {
                    const typedNode = node as GraphNode;
                    // 1. Update selection highlight
                    setSelectedNode(typedNode);
                    // 2. Trigger the details panel
                    handleNodeClick(typedNode.id);
                }}
            />
            
            <Legend>
                <LegendItem>
                    <Dot $color="#ef4444" /> Central
                </LegendItem>
                <LegendItem>
                    <Dot $color="#4f46e5" /> Citation
                </LegendItem>
                <LegendItem>
                    <Dot $color="#4ECDC4" /> Reference
                </LegendItem>
            </Legend>
        </GraphContainer>
    );
}

// --- STYLES ---

const GraphContainer = styled.div`
    width: 100%;
    height: 100%; 
    min-height: 400px;
    background-color: #f8fafc;
    position: relative;
    display: flex;
    flex-direction: column;
`;

const LoadingState = styled.div`
    padding: 2rem;
    text-align: center;
    color: #64748b;
    font-size: 0.875rem;
`;

const EmptyTitle = styled.h4`
    font-size: 1.1rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 0.75rem;
`;

const IconCircle = styled.div`
    width: 3.5rem;
    height: 3.5rem;
    background-color: #f3f4f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #94a3b8;
    font-size: 1.5rem;
    margin-bottom: 1rem;
`;

const Legend = styled.div`
    position: absolute;
    bottom: 1rem;
    right: 1rem;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5rem 0.75rem;
    border-radius: 0.375rem;
    border: 1px solid #e2e8f0;
    display: flex;
    gap: 1rem;
    z-index: 5;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
`;

const LegendItem = styled.div`
    display: flex;
    align-items: center;
    gap: 0.35rem;
    font-size: 0.75rem;
    color: #475569;
    font-weight: 600;
`;

const Dot = styled.div<{ $color: string }>`
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: ${props => props.$color};
`;