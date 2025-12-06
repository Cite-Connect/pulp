'use client';

import React from 'react';
import styled from 'styled-components';

import LeftSidebar from '@/components/dashboard/LeftSidebar';
import RightPanel from '@/components/dashboard/RightPanel';
import FloatingSearch from '@/components/dashboard/FloatingSearch';
import AuthGuard from '@/components/auth/AuthGuard';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <GridContainer>
                <LeftSidebar />
                <ContentWrapper>
                    <MainStage>
                    {children}
                    </MainStage>
                    <RightPanel />
                </ContentWrapper>
                <FloatingSearch />
            </GridContainer>
        </AuthGuard>
    );
}


const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 260px 1fr; /* Left Sidebar | The Rest */
    height: 100vh;
    background-color: #f3f4f6;
    overflow: hidden;
`;

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 340px; /* Middle Content | Right Panel */
    height: 100vh;
    overflow: hidden;
`;

const MainStage = styled.main`
    padding: 2rem;
    padding-bottom: 8rem; /* Space for the floating bar */
    overflow-y: auto;
    background-color: #f9fafb;
`;