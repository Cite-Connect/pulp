'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { FiTrash2, FiBookOpen } from 'react-icons/fi';
import LeftSidebar from '@/components/dashboard/LeftSidebar'; 
import AuthGuard from '@/components/auth/AuthGuard'; 
import { useLibraryStore } from '@/store/useLibraryStore';
import { paperApi } from '@/api/services/paper';


export default function LibraryPage() {
    const { savedPapers, toggleSave } = useLibraryStore();

    useEffect(() => {
        const user_id = localStorage.getItem('userId');
        const fetchSavedPapers = async () => {
            await paperApi.getSavedPapers(user_id);
        };
        fetchSavedPapers();
    }, []);

    return (
        <AuthGuard>
        <PageContainer>
            <LeftSidebar />

            <MainContent>
            <Header>
                <h1>My Library</h1>
                <StatsRow>
                <span>{savedPapers.length} Papers Saved</span>
                </StatsRow>
            </Header>

            {savedPapers.length === 0 ? (
                <EmptyState>
                <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.2 }}>📚</div>
                <h3>Your library is empty</h3>
                <p>Go back to the dashboard to explore and save papers.</p>
                <Link href="/dashboard" style={{ 
                    background: '#1a1a1a', color: 'white', padding: '10px 20px', 
                    borderRadius: '6px', textDecoration: 'none', fontWeight: 600 
                }}>
                    Browse Dashboard
                </Link>
                </EmptyState>
            ) : (
                <PaperGrid>
                {savedPapers.map((paper) => (
                    <PaperCard key={paper.paper_id}>
                    <DomainBadge>{paper.domain}</DomainBadge>
                    
                    <PaperTitle>
                        {paper.title.length > 60 ? paper.title.slice(0, 60) + '...' : paper.title}
                    </PaperTitle>
                    
                    <PaperMeta>
                        {paper.year} • {paper.citation_count} Citations
                    </PaperMeta>

                    <CardActions>
                        {/* Link to view on graph (Optional - sends you back to dashboard with ID) */}
                        <Link href={`/dashboard?paperId=${paper.paper_id}`} style={{ 
                            display: 'flex', alignItems: 'center', gap: '5px', 
                            fontSize: '0.8rem', color: '#2196f3', textDecoration: 'none', fontWeight: 600 
                        }}>
                        <FiBookOpen /> View Graph
                        </Link>

                        <RemoveButton onClick={() => toggleSave(paper)}>
                        <FiTrash2 /> Remove
                        </RemoveButton>
                    </CardActions>
                    </PaperCard>
                ))}
                </PaperGrid>
            )}
            </MainContent>
        </PageContainer>
        </AuthGuard>
    );
}

const PageContainer = styled.div`
    display: flex;
    height: 100vh;
    width: 100vw;
    background: #ffffff;
`;

const MainContent = styled.main`
    flex: 1;
    padding: 3rem 4rem;
    overflow-y: auto;
    background: #ffffff;
`;

const Header = styled.header`
    margin-bottom: 3rem;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 1.5rem;
    
    h1 {
        font-size: 2rem;
        font-weight: 800;
        color: #1a1a1a;
        margin-bottom: 0.5rem;
    }
    `;

    const StatsRow = styled.div`
    display: flex;
    gap: 2rem;
    font-size: 0.9rem;
    color: #666;
`;

// Grid Layout for the papers
const PaperGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
`;

const PaperCard = styled.div`
    border: 1px solid #eaeaea;
    border-radius: 12px;
    padding: 1.5rem;
    background: white;
    display: flex;
    flex-direction: column;
    transition: all 0.2s ease;
    position: relative;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.06);
        border-color: #2196f3;
    }
`;

const DomainBadge = styled.span`
    background: #e3f2fd;
    color: #1565c0;
    font-size: 0.7rem;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 600;
    align-self: flex-start;
    margin-bottom: 1rem;
`;

const PaperTitle = styled.h3`
    font-size: 1.1rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
    line-height: 1.4;
`;

const PaperMeta = styled.p`
    font-size: 0.85rem;
    color: #666;
    margin-bottom: 1.5rem;
`;

const CardActions = styled.div`
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid #f5f5f5;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const RemoveButton = styled.button`
    background: none;
    border: none;
    color: #d32f2f;
    font-size: 0.8rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 6px;
    cursor: pointer;
    padding: 6px 0;
    opacity: 0.7;
    transition: opacity 0.2s;

    &:hover {
        opacity: 1;
    }
`;

const EmptyState = styled.div`
    text-align: center;
    margin-top: 5rem;
    color: #888;
    
    h3 { font-size: 1.2rem; color: #333; margin-bottom: 0.5rem; }
    p { font-size: 0.9rem; margin-bottom: 1.5rem; }
`;