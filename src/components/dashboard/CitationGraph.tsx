'use client';

import React, { useEffect, useState, useRef, useMemo } from 'react';
import dynamic from 'next/dynamic';
import styled from 'styled-components';
import { graphApi } from '@/api/services/graph';
import { GraphDataResponse } from '@/api/interface/types';
import { GraphNode } from '@/api/interface/types';
import { fetchPaperDetails } from '@/api/services/paper';
import { useSelectionStore } from '@/store/useSelectionStore';

interface SimulationNode extends GraphNode {
    x?: number;
    y?: number;
    vx?: number;
    vy?: number;
    fx?: number | null;
    fy?: number | null;
    index?: number;
}

const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
    ssr: false,
    loading: () => <div className="p-4 text-center">Loading Graph Engine...</div>
});


const GraphWrapper = styled.div`
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.05);
    border: 1px solid #eaeaea;
    overflow: hidden;
    height: 600px; /* Fixed height for dashboard */
    position: relative;
    width: 100%;
`;

const GraphHeader = styled.div`
    position: absolute;
    top: 1rem;
    left: 1rem;
    z-index: 10;
    background: rgba(255, 255, 255, 0.9);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(0,0,0,0.1);

    h3 { margin: 0; font-size: 0.9rem; font-weight: 600; }
    span { font-size: 0.75rem; color: #666; }
`;

export default function CitationGraph() {
    const [data, setData] = useState<GraphDataResponse | null>(null);
    const [containerDimensions, setDimensions] = useState({ width: 800, height: 600 });
    const containerRef = useRef<HTMLDivElement>(null);
    const setSelectedNode = useSelectionStore((state) => state.setSelectedNode);
    
    // Hardcoded ID for testing (The Medical Imaging paper from your logs)
    const TEST_ID = '61827838932597591901992a4d3a86b71b42ac69';

    useEffect(() => {
        const updateDimensions = () => {
        if (containerRef.current) {
            setDimensions({
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight
            });
        }
        };

        updateDimensions();

        window.addEventListener('resize', updateDimensions);
        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    useEffect(() => {
        const loadGraph = async () => {
        try {
            const graphData = await graphApi.fetchGraphData(TEST_ID);
            setData(graphData);
        } catch (error) {
            console.error("Graph load failed:", error);
        }
    };
        loadGraph();
    }, []);

    const handleNodeClick = async (nodeId: string | number | undefined) => {
        try {
            const paperDetails = await fetchPaperDetails(nodeId);
            console.log("Paper Details:", paperDetails);
        } catch (error) {
            console.error("Failed to fetch paper details:", error);
        }
    };

    const graphData = useMemo(() => {
        if (!data) return { nodes: [], links: [] };
        
        // We clone the data because D3 mutates objects (adds x, y, vx, vy)
        return {
        nodes: data.nodes.map(node => ({ ...node })),
        links: data.edges.map(link => ({ ...link }))
        };
    }, [data]);

    if (!data) {
        return (
        <GraphWrapper ref={containerRef} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#888' }}>Initializing Citation Network...</p>
        </GraphWrapper>
        );
    }

    return (
        <GraphWrapper ref={containerRef}>
        <GraphHeader>
            <h3>{data.nodes.find(n => n.type === 'central')?.label.slice(0, 40)}...</h3>
            <span>{data.stats.total_nodes} Papers · {data.stats.total_edges} Citations</span>
        </GraphHeader>

        <ForceGraph2D
            width={containerDimensions.width}
            height={containerDimensions.height}
            graphData={graphData}
            
            // Appearance
            backgroundColor="#ffffff"
            nodeLabel="label" // Tooltip on hover
            nodeColor={(node) => (node as SimulationNode).type === 'central' ? '#ff5252' : ((node as SimulationNode).color || '#4285F4')}
            nodeRelSize={6} // Node size multiplier
            
            // Links
            linkColor={() => '#e0e0e0'}
            linkWidth={1.5}
            linkDirectionalArrowLength={3.5}
            linkDirectionalArrowRelPos={1}
            
            // Physics (Optional tuning)
            d3VelocityDecay={0.1} // Lower = more "floaty"
            cooldownTicks={100}   // Stop simulation after 100 frames to save battery
            
            // Interaction
            onNodeClick={node => {
                console.log("Clicked node:", node);
                handleNodeClick(node.id);
                setSelectedNode(node as GraphNode);
            }}

        />
        </GraphWrapper>
    );
}