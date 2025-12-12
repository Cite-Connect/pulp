'use client';

import React from 'react';
import styled from 'styled-components';
import CitationGraph from '@/components/dashboard/CitationGraph';

const DashboardContainer = styled.div`
    padding: 2rem;
    width: 100%;
    height: 100%;
`;

const Header = styled.div`
    margin-bottom: 2rem;
    
    h1 {
        font-size: 1.8rem;
        font-weight: 700;
        color: #1a1a1a;
        margin-bottom: 0.5rem;
    }
    
    p {
        color: #666;
    }
`;

export default function DashboardPage() {
    return (
        <DashboardContainer>
            <Header>
                <h1>Citation Network</h1>
                <p>Visualizing relationships for you</p>
            </Header>
            
            <CitationGraph />
        </DashboardContainer>
    );
}