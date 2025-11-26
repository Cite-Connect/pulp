'use client';

import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/useOnboardingStore';

const DOMAIN_OPTIONS = ['Finance', 'Healthcare', 'Quantum Computing'];

export default function Step1Page() {
  const router = useRouter();
  
  const { 
    role, setRole, 
    institution, setInstitution, 
    domain, setDomain 
  } = useOnboardingStore();

  const handleNext = () => {
    if (!role || role === 'Select your role...') {
      alert("Please select a role to continue.");
      return;
    }
    if (!domain) {
      alert("Please select a domain of interest.");
      return;
    }
    router.push('/onboarding/step2');
  };

  return (
    <Wrapper>
      <Header>
        <Title>Tell us about yourself</Title>
        <Description>This helps us personalize your paper recommendations.</Description>
      </Header>

      <Form>
        <InputGroup>
          <Label htmlFor="email" $required>Email address</Label>
          <Input id="email" type="email" placeholder="Email address" />
        </InputGroup>
                
        <InputGroup>
          <Label htmlFor="password" $required>Password</Label>
          <Input id="password" type="password" placeholder="Password" />
        </InputGroup>

        <FormGroup>
          <Label $required>Current Role</Label>
          <Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="">Select your role...</option>
            <option>Bachelor&apos;s Student</option>
            <option>Master&apos;s Student</option>
            <option>PhD Candidate</option>
            <option>Researcher</option>
            <option>Professor</option>
            <option>Industry Professional</option>
          </Select>
        </FormGroup>

        <FormGroup>
          <Label>Institution / Organization</Label>
          <Input 
            type="text" 
            placeholder="e.g. Stanford University, Google DeepMind"
            value={institution}
            onChange={(e) => setInstitution(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label $required>Domain of Interest</Label>
          <DomainGrid>
            {DOMAIN_OPTIONS.map((option) => (
              <DomainCard 
                key={option}
                $selected={domain === option}
                onClick={() => setDomain(option)}
              >
                <RadioCircle $selected={domain === option} />
                <DomainText>{option}</DomainText>
              </DomainCard>
            ))}
          </DomainGrid>
        </FormGroup>
      </Form>

      <Footer>
        <NextButton onClick={handleNext}>Next Step</NextButton>
      </Footer>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div``;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  color: #111827;
  letter-spacing: -0.025em;
`;

const Description = styled.p`
  margin-top: 0.5rem;
  font-size: 0.95rem;
  color: #6b7280;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-top: 0.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.label<{ $required?: boolean }>`
  display: block;
  font-size: 0.875rem;
  font-weight: 700;
  color: #374151;
  margin-bottom: 0.5rem;

  ${props => props.$required && `
    &::after {
      content: ' *';
      color: #ef4444;
      font-weight: 800;
      margin-left: 0.1rem;
    }
  `}
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size: 0.95rem;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 1px #6366f1;
  }
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 0.95rem;
  background-color: white;

  &:focus {
    outline: none;
    border-color: #6366f1;
    box-shadow: 0 0 0 1px #6366f1;
  }
`;

// -- New Domain Selection Styles --

const DomainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
`;

const DomainCard = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;

  /* Conditional Styling */
  background-color: ${props => props.$selected ? '#111827' : '#ffffff'};
  color: ${props => props.$selected ? '#ffffff' : '#374151'};
  border: 1px solid ${props => props.$selected ? '#111827' : '#d1d5db'};
  box-shadow: ${props => props.$selected 
    ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
    : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'};

  &:hover {
    transform: ${props => props.$selected ? 'none' : 'translateY(-1px)'};
    border-color: ${props => props.$selected ? '#111827' : '#9ca3af'};
  }
`;

const RadioCircle = styled.div<{ $selected: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 2px solid ${props => props.$selected ? '#4f46e5' : '#d1d5db'};
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.$selected ? 'white' : 'transparent'};

  &::after {
    content: '';
    width: 0.6rem;
    height: 0.6rem;
    border-radius: 50%;
    background-color: #4f46e5;
    display: ${props => props.$selected ? 'block' : 'none'};
  }
`;

const DomainText = styled.span`
  font-size: 0.95rem;
`;

const Footer = styled.div`
  padding-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const NextButton = styled.button`
  display: inline-flex;
  justify-content: center;
  padding: 0.75rem 2rem;
  border: 1px solid transparent;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  font-size: 0.875rem;
  font-weight: 700;
  border-radius: 0.5rem;
  color: white;
  background-color: #111827;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #000000;
    transform: translateY(-1px);
  }
`;

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    `;