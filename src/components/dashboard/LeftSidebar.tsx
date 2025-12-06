'use client';

import React from 'react';
import styled from 'styled-components';
import { FiGrid, FiBookmark, FiSettings, FiClock } from 'react-icons/fi';
import { usePathname } from 'next/navigation';

export default function LeftSidebar() {
    const pathname = usePathname();
    const handleClick = () => {
        // Handle brand click, e.g., navigate to dashboard home
        window.location.href = '/';
    };

    return (
    <Panel>
        <Brand onClick={handleClick}>CiteConnect</Brand>
        
        <SectionTitle>Menu</SectionTitle>
        <NavItem onClick={() => window.location.href = ''} $active={pathname === '/dashboard'}>
            <FiGrid /> <span>Dashboard</span>
        </NavItem>
        <NavItem onClick={() => window.location.href = '/library'} $active={pathname === '/library'}>
            <FiBookmark /> <span>My Library</span>
        </NavItem>
        <NavItem onClick={() => window.location.href = '/settings'} $active={pathname === '/settings'}>
            <FiSettings /> <span>Settings</span>
        </NavItem>

        <SectionTitle>Recent Activity</SectionTitle>
        <HistoryItem>
            <HistoryTitle>Transformers in Finance</HistoryTitle>
            <HistoryMeta>Viewed 2h ago</HistoryMeta>
        </HistoryItem>
        <HistoryItem>
            <HistoryTitle>Quantum Error Correction</HistoryTitle>
            <HistoryMeta>Viewed 5h ago</HistoryMeta>
        </HistoryItem>
    </Panel>
    );
}

const Panel = styled.aside`
    background-color: #111827; /* Deep Navy */
    color: #e5e7eb;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    border-right: 1px solid #1f2937;
    height: 100%;
`;

const Brand = styled.div`
    font-size: 1.5rem;
    font-weight: 800;
    color: white;
    margin-bottom: 2.5rem;
    letter-spacing: -0.025em;
    cursor: pointer;
`;

const SectionTitle = styled.h3`
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #6b7280;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-weight: 700;
`;

const NavItem = styled.div<{ $active?: boolean }>`
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem;
    border-radius: 0.5rem;
    cursor: pointer;
    background-color: ${props => props.$active ? '#1f2937' : 'transparent'};
    color: ${props => props.$active ? 'white' : '#9ca3af'};
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.2s;

    &:hover {
        background-color: #1f2937;
        color: white;
    }
`;

const HistoryItem = styled.div`
    padding: 0.5rem 0;
    cursor: pointer;
    &:hover h4 { color: white; }
`;

const HistoryTitle = styled.h4`
    font-size: 0.875rem;
    color: #9ca3af;
    font-weight: 500;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: color 0.2s;
`;

const HistoryMeta = styled.span`
    font-size: 0.75rem;
    color: #4b5563;
`;