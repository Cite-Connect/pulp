'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { authApi } from '@/api/services/auth';
import { FiLogOut, FiUser, FiGlobe, FiBookOpen, FiCheck, FiX } from 'react-icons/fi';

// Options matching your onboarding data
const ROLES = [
    'Bachelor\'s Student', 
    'Master\'s Student', 
    'PhD Candidate', 
    'Researcher', 
    'Professor', 
    'Industry Professional'
];

const DOMAINS = ['Finance', 'Healthcare', 'Quantum Computing'];

export default function SettingsPage() {
    const { 
        role, setRole, 
        domain, setDomain, 
        institution, setInstitution, 
        reset 
    } = useOnboardingStore();

    const [authorized, setAuthorized] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('accessToken');

        if (!token) {
        window.location.href = '/unauthorized'
        } else {
        setTimeout(() => {
            setAuthorized(true);
        }, 0);
        }
    }, []);

    const handleLogout = () => {
        authApi.clearSession();
        reset();
        window.location.replace('/login');
    };

    return (
        <Container>
            <Header>
                <Title>Settings</Title>
                <Subtitle>Manage your account preferences and profile.</Subtitle>
            </Header>

            <Section>
                <SectionTitle>Profile Information</SectionTitle>
                <Card>
                {/* Role: Dropdown Edit */}
                <ProfileRow 
                    icon={<FiUser />}
                    label="Role"
                    value={role}
                    options={ROLES}
                    onSave={(val) => setRole(val)}
                />
                
                <Divider />
                
                {/* Institution: Text Edit */}
                <ProfileRow 
                    icon={<FiGlobe />}
                    label="Institution"
                    value={institution}
                    onSave={(val) => setInstitution(val)}
                />

                <Divider />

                {/* Domain: Dropdown Edit */}
                <ProfileRow 
                    icon={<FiBookOpen />}
                    label="Research Domain"
                    value={domain}
                    options={DOMAINS}
                    onSave={(val) => setDomain(val)}
                />
                </Card>
            </Section>

            <Section>
                <SectionTitle>Account Actions</SectionTitle>
                <DangerCard>
                <DangerContent>
                    <DangerTitle>Log Out</DangerTitle>
                    <DangerDesc>End your current session on this device.</DangerDesc>
                </DangerContent>
                <LogoutButton onClick={handleLogout}>
                    <FiLogOut /> Log Out
                </LogoutButton>
                </DangerCard>
            </Section>
        </Container>
    );
}

// --- REUSABLE EDIT ROW COMPONENT ---

interface ProfileRowProps {
    icon: React.ReactNode;
    label: string;
    value: string;
    onSave: (val: string) => void;
    options?: string[]; // If present, renders a Select
}

function ProfileRow({ icon, label, value, onSave, options }: ProfileRowProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [tempValue, setTempValue] = useState(value);

    const handleSave = () => {
        onSave(tempValue);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempValue(value); // Revert
        setIsEditing(false);
    };

    return (
        <Row>
        <IconWrapper>{icon}</IconWrapper>
        
        <InfoContent>
            <Label>{label}</Label>
            {isEditing ? (
            options ? (
                <StyledSelect 
                value={tempValue} 
                onChange={(e) => setTempValue(e.target.value)}
                autoFocus
                >
                <option value="" disabled>Select {label}</option>
                {options.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                ))}
                </StyledSelect>
            ) : (
                <StyledInput 
                type="text" 
                value={tempValue} 
                onChange={(e) => setTempValue(e.target.value)}
                autoFocus
                />
            )
            ) : (
            <Value>{value || 'Not set'}</Value>
            )}
        </InfoContent>

        {isEditing ? (
            <ActionGroup>
            <IconButton onClick={handleSave} $color="#059669" title="Save">
                <FiCheck />
            </IconButton>
            <IconButton onClick={handleCancel} $color="#ef4444" title="Cancel">
                <FiX />
            </IconButton>
            </ActionGroup>
        ) : (
            <EditButton onClick={() => setIsEditing(true)}>Edit</EditButton>
        )}
        </Row>
    );
}

// --- STYLES ---

const Container = styled.div`
    max-width: 800px;
    margin: 0 auto;
`;

const Header = styled.div`
    margin-bottom: 2.5rem;
`;

const Title = styled.h1`
    font-size: 2rem;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.025em;
`;

const Subtitle = styled.p`
    font-size: 1rem;
    color: #6b7280;
    margin-top: 0.5rem;
`;

const Section = styled.div`
    margin-bottom: 3rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.1rem;
    font-weight: 700;
    color: #374151;
    margin-bottom: 1rem;
`;

const Card = styled.div`
    background: white;
    border-radius: 0.75rem;
    border: 1px solid #e5e7eb;
    box-shadow: 0 1px 2px rgba(0,0,0,0.05);
    overflow: hidden;
`;

const Row = styled.div`
    display: flex;
    align-items: center;
    padding: 1.5rem;
    gap: 1rem;
    min-height: 80px; /* Prevent layout shift during edit */
`;

const IconWrapper = styled.div`
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 50%;
    background-color: #f3f4f6;
    color: #4b5563;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
`;

const InfoContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Label = styled.div`
    font-size: 0.75rem;
    color: #6b7280;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin-bottom: 0.25rem;
`;

const Value = styled.div`
    font-size: 1rem;
    color: #111827;
    font-weight: 600;
`;

// -- Edit Inputs --

const StyledInput = styled.input`
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    width: 100%;
    max-width: 300px;
    color: #111827;
    
    &:focus {
        outline: none;
        border-color: #4f46e5;
        box-shadow: 0 0 0 1px #4f46e5;
    }
`;

const StyledSelect = styled.select`
    font-size: 1rem;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    width: 100%;
    max-width: 300px;
    background-color: white;
    color: #111827;

    &:focus {
        outline: none;
        border-color: #4f46e5;
        box-shadow: 0 0 0 1px #4f46e5;
    }
`;

// -- Actions --

const EditButton = styled.button`
    font-size: 0.875rem;
    color: #4f46e5;
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    
    &:hover {
        text-decoration: underline;
    }
`;

const ActionGroup = styled.div`
    display: flex;
    gap: 0.5rem;
`;

const IconButton = styled.button<{ $color: string }>`
    background-color: ${props => props.$color}15; /* 15 = low opacity hex */
    color: ${props => props.$color};
    border: 1px solid ${props => props.$color}30;
    width: 2rem;
    height: 2rem;
    border-radius: 0.375rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: all 0.1s;

    &:hover {
        background-color: ${props => props.$color};
        color: white;
    }
`;

const Divider = styled.div`
    height: 1px;
    background-color: #f3f4f6;
    margin: 0 1.5rem;
`;

const DangerCard = styled(Card)`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem;
    border-color: #fca5a5;
`;

const DangerContent = styled.div``;

const DangerTitle = styled.h3`
    font-size: 1rem;
    font-weight: 700;
    color: #111827;
`;

const DangerDesc = styled.p`
    font-size: 0.875rem;
    color: #6b7280;
    margin-top: 0.25rem;
`;

const LogoutButton = styled.button`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1.25rem;
    background-color: #fee2e2;
    color: #ef4444;
    border: 1px solid #fecaca;
    border-radius: 0.5rem;
    font-weight: 600;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background-color: #fecaca;
        color: #b91c1c;
    }
`;