'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { FiList, FiStar, FiGitCommit, FiArrowLeft, FiShare2 } from 'react-icons/fi';
import { graphApi } from '@/api/services/graph';
import { paperApi } from '@/api/services/paper';
import { RecommendedPaper, PaperDetails } from '@/api/interface/types';
import { useDashboardStore } from '@/store/useDashboardStore';
import { useFeedStore } from '@/store/useFeedStore';
import Loader from '@/components/common/Loader';
import PaperDetailView from './PaperDetailsView';

export default function RightPanel() {
    const {
        setSelectedPaperId, 
        setGraphData,
        isLoading, setIsLoading,
        inspectingPaper, setInspectingPaper
    } = useDashboardStore();
    
    const { papers } = useFeedStore(); 
    
    const [detailsLoading, setDetailsLoading] = useState(false);

    const handleCardClick = async (paper: PaperDetails) => {
        handleVisualizeGraph(paper)
        setInspectingPaper(paper); 
        setDetailsLoading(true);
        
        try {
            const data = await paperApi.fetchPaperDetails(paper.paper_id);
            setInspectingPaper(data);
        } catch (error) {
            console.error("Failed to fetch details", error);
        } finally {
            setDetailsLoading(false);
        }
    };

    const handleVisualizeGraph = async (paper: PaperDetails) => {
        const currentPaperId = paper.paper_id;
        
        setInspectingPaper(null);
        
        setIsLoading(true);
        
        setSelectedPaperId(currentPaperId);

        try {
            const result = await graphApi.fetchGraphData(currentPaperId);
            setGraphData(result);
        } catch (error) {
            console.error("Failed to fetch graph", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleBackToList = () => {
        setInspectingPaper(null);
    };

    if (isLoading || detailsLoading) {
        return (
            <Panel>
                <Loader text={isLoading ? "Generating Graph..." : "Fetching Details..."} />
            </Panel>
        );
    }

    if (inspectingPaper) {
        return (
            <Panel>
                <PaperDetailView 
                    paper={inspectingPaper} 
                    onBack={handleBackToList}
                />
            </Panel>
        );
    }

    const isRecommendationResult = papers.length > 0 && 'relevance_score' in papers[0];

    if (isRecommendationResult) {
        return (
        <Panel>
            <PanelHeader>
                <PanelTitle>Top Recommendations</PanelTitle>
                <IconButton><FiList /></IconButton>
            </PanelHeader>

            <ListContainer>
                {(papers as RecommendedPaper[]).map((paper, index) => (
                    <RecCard key={paper.paper_id} onClick={() => handleCardClick(paper)}>
                        <RecHeader>
                            <RankBadge>#{index + 1}</RankBadge>
                                {paper.relevance_score && (
                            <ScoreBadge $score={paper.relevance_score}>
                                <FiStar size={10} fill="currentColor" />
                                {Math.round(paper.relevance_score * 100)}% Match
                            </ScoreBadge>
                            )}
                        </RecHeader>
                        <RecTitle>{paper.title}</RecTitle>
                        {paper.relevance_explanation && (
                            <RecExplanation>
                                <FiGitCommit size={12} style={{flexShrink: 0, marginTop: 2}}/> 
                                {paper.relevance_explanation}
                            </RecExplanation>
                        )}
                        <RecMeta>{paper.venue || 'Journal'} • {paper.year}</RecMeta>
                    </RecCard>
                ))}
            </ListContainer>
        </Panel>
        );
    }

    // 4. ZERO STATE
    return (
        <Panel>
            <EmptyStateContainer>
                <EmptyDesc>
                    Query and select any paper from your feed to visualize its citation network, 
                    discover hidden connections, and find related research.
                </EmptyDesc>
            </EmptyStateContainer>
        </Panel>
    );
}

// --- STYLES ---

const Panel = styled.aside`
    background-color: white;
    border-left: 1px solid #e5e7eb;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    height: 100%;
    overflow: hidden;
`;

const PanelHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-shrink: 0;
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

const ListContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow-y: auto;
    padding-right: 0.5rem;
    
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { background-color: #e5e7eb; border-radius: 4px; }
`;

const RecCard = styled.div`
    padding: 1rem;
    background-color: #f8fafc;
    border-radius: 0.75rem;
    border: 1px solid #e2e8f0;
    transition: transform 0.1s;
    cursor: pointer;
    
    &:hover {
        border-color: #cbd5e1;
    }
`;

const RecHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const RankBadge = styled.span`
    font-size: 0.75rem;
    font-weight: 700;
    color: #94a3b8;
`;

const ScoreBadge = styled.span<{ $score: number }>`
    display: flex;
    align-items: center;
    gap: 4px;
    background-color: ${props => props.$score > 0.8 ? '#dcfce7' : '#fff7ed'};
    color: ${props => props.$score > 0.8 ? '#15803d' : '#c2410c'};
    font-size: 0.7rem;
    font-weight: 700;
    padding: 2px 6px;
    border-radius: 9999px;
`;

const RecTitle = styled.h4`
    font-size: 0.9rem;
    font-weight: 600;
    color: #334155;
    margin-bottom: 0.5rem;
    line-height: 1.4;
`;

const RecExplanation = styled.div`
    display: flex;
    gap: 0.5rem;
    font-size: 0.75rem;
    color: #64748b;
    background: white;
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid #f1f5f9;
    line-height: 1.4;
    margin-bottom: 0.5rem;
`;

const RecMeta = styled.div`
    font-size: 0.7rem;
    color: #94a3b8;
    font-weight: 500;
`;

const EmptyStateContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    text-align: center;
    padding: 0 1rem;
`;

const EmptyDesc = styled.p`
    color: #888;
    font-size: 0.9rem;
    line-height: 1.6;
    max-width: 320px;
`;

const LoadingState = styled.div`
    text-align: center;
    padding: 2rem;
    color: #94a3b8;
    font-size: 0.9rem;
`;