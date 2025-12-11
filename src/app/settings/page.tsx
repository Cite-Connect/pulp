'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FiArrowLeft, FiUser, FiGlobe, FiLogOut, FiBriefcase } from 'react-icons/fi';
import AuthGuard from '@/components/auth/AuthGuard';
import { GetProfileResponse, UserProfile } from '@/api/interface/types'; // Updated import
import { userApi } from '@/api/services/user';

export default function SettingsPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) return;

            try {
                const result = await userApi.getProfile(userId) as unknown as GetProfileResponse;
                
                if (result && result.profile) {
                    setProfile(result.profile);
                }
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userId');
        router.push('/login');
    }

    const formatValue = (val?: string) => {
        if (!val) return 'Not set';
        return val.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    };

    return (
        <AuthGuard>
        <Container>
            <BackLink href="/dashboard">
            <FiArrowLeft size={18} /> Back to Dashboard
            </BackLink>

            <Header>
            <h1>Settings</h1>
            <p>Manage your account preferences and profile.</p>
            </Header>

            {/* Profile Section */}
            <Section>
            <SectionHeader><h3>Profile Information</h3></SectionHeader>
            
            <Row>
                <RowContent>
                <Label><FiUser /> Role</Label>
                <Value>{loading ? 'Loading...' : formatValue(profile?.research_stage)}</Value>
                </RowContent>
            </Row>

            <Row>
                <RowContent>
                <Label><FiBriefcase /> Institution</Label>
                <Value>{loading ? 'Loading...' : (profile?.institution || 'Not set')}</Value>
                </RowContent>
            </Row>

            <Row>
                <RowContent>
                <Label><FiGlobe /> Research Domain</Label>
                <Value>{loading ? 'Loading...' : formatValue(profile?.primary_domain)}</Value>
                </RowContent>
            </Row>
            </Section>

            <Section style={{ borderColor: '#ffcdd2' }}>
            <LogoutButton onClick={() => handleLogout()}>
                <FiLogOut /> Log Out
            </LogoutButton>
            </Section>

        </Container>
        </AuthGuard>
    );
}

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 3rem 2rem;
`;

const BackLink = styled(Link)`
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: #666;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    margin-bottom: 2rem;
    padding: 8px 12px;
    margin-left: -12px;
    border-radius: 6px;
    transition: all 0.2s ease;

    &:hover {
        background: #f5f5f5;
        color: #1a1a1a;
    }
`;

const Header = styled.header`
    margin-bottom: 3rem;
    h1 { font-size: 2rem; font-weight: 800; color: #1a1a1a; }
    p { color: #666; margin-top: 0.5rem; }
`;

const Section = styled.section`
    background: white;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    padding: 0;
    margin-bottom: 2rem;
    overflow: hidden;
`;

const SectionHeader = styled.div`
    padding: 1.5rem;
    border-bottom: 1px solid #eaeaea;
    h3 { font-size: 1rem; font-weight: 600; color: #333; }
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-bottom: 1px solid #f9f9f9;

    &:last-child { border-bottom: none; }
`;

const RowContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Label = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #999;
    letter-spacing: 0.5px;
    
    svg { color: #ccc; }
`;

const Value = styled.div`
    color: #1a1a1a;
    font-weight: 600;
    font-size: 1rem;
    padding-left: 24px;
    text-transform: capitalize;
`;

const EditButton = styled.button`
    background: none;
    border: none;
    color: #2196f3;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 4px;
    transition: background 0.2s;

    &:hover {
        background: #e3f2fd;
    }
`;

const LogoutButton = styled.button`
    width: 100%;
    padding: 1rem;
    background: #ffebee;
    color: #d32f2f;
    border: none;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    transition: background 0.2s;

    &:hover { background: #ffcdd2; }
`;