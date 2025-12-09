'use client';

import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/navigation';
import { useOnboardingStore } from '@/store/useOnboardingStore';
import { userApi } from '@/api/services/user';
import { CreateProfilePayload, CreateProfileResponse } from '@/api/interface/types';
import { getApiErrorMessage } from '@/utils/errorHandler';

const DOMAIN_OPTIONS = ['Finance', 'Healthcare', 'Quantum Computing'];

export default function Step1Page() {
  const router = useRouter();
  
  const { 
    role, setRole, 
    institution, setInstitution, 
    domain, setDomain,
    interests, setInterests 
  } = useOnboardingStore();

  const [errors, setErrors] = useState<{ role?: string; domain?: string; interests?: string; api?: string }>({});
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newTag = tagInput.trim();
      
      if (newTag && !interests.includes(newTag)) {
        if (interests.length >= 10) {
          setErrors(prev => ({ ...prev, interests: 'Maximum 10 interests allowed.' }));
          return;
        }
        setInterests([...interests, newTag]);
        setTagInput('');
        setErrors(prev => ({ ...prev, interests: undefined })); // Clear error
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setInterests(interests.filter(tag => tag !== tagToRemove));
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    let isValid = true;

    if (!role || role === 'Select your role...') {
      newErrors.role = 'Please select your current role';
      isValid = false;
    }
    if (!domain) {
      newErrors.domain = 'Please select a domain of interest';
      isValid = false;
    }

    if (interests.length < 3) {
      newErrors.interests = `Please add at least ${3 - interests.length} more interests.`;
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleNext = async () => {
    setErrors({});
    
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) throw new Error("User ID missing. Please log in again.");

      const payload: CreateProfilePayload = {
        primary_domain: domain,
        reading_level: 'Intermediate',
        interests: interests, 
        institution: institution,
        research_stage: role,
      };

      const result: CreateProfileResponse = await userApi.createProfile(userId, payload);
      
      console.log('Profile Created:', result);
      
      router.push('/onboarding/step2');

    } catch (err: unknown) {
      setErrors({ api: getApiErrorMessage(err) });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value);
    if (errors.role) setErrors({ ...errors, role: undefined });
  };

  const handleDomainSelect = (option: string) => {
    setDomain(option);
    if (interests.length === 0) setInterests([option]); 
    if (errors.domain) setErrors({ ...errors, domain: undefined });
  };

  return (
    <Wrapper>
      <Header>
        <Title>Tell us about yourself</Title>
        <Description>This helps us personalize your paper recommendations.</Description>
      </Header>

      {errors.api && <AlertBanner>{errors.api}</AlertBanner>}

      <Form>
        <FormGroup>
          <Label $required>Current Role</Label>
          <Select 
            value={role} 
            onChange={handleRoleChange}
            $hasError={!!errors.role}
          >
            <option value="">Select your role...</option>
            <option>Bachelor&apos;s Student</option>
            <option>Master&apos;s Student</option>
            <option>PhD Candidate</option>
            <option>Researcher</option>
            <option>Professor</option>
            <option>Industry Professional</option>
          </Select>
          {errors.role && <ErrorText>{errors.role}</ErrorText>}
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
                $hasError={!!errors.domain}
                onClick={() => handleDomainSelect(option)}
              >
                <RadioCircle $selected={domain === option} $hasError={!!errors.domain} />
                <DomainText>{option}</DomainText>
              </DomainCard>
            ))}
          </DomainGrid>
          {errors.domain && <ErrorText>{errors.domain}</ErrorText>}
        </FormGroup>

        {/* --- NEW: INTERESTS TAG INPUT --- */}
        <FormGroup>
          <Label $required>Specific Interests (Min 3)</Label>
          <TagsContainer $hasError={!!errors.interests}>
            {interests.map(tag => (
              <Tag key={tag}>
                {tag}
                <RemoveBtn onClick={() => removeTag(tag)}>×</RemoveBtn>
              </Tag>
            ))}
            <TagInput 
              type="text"
              placeholder={interests.length === 0 ? "Type e.g. 'NLP' and press Enter..." : "Add another..."}
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
          </TagsContainer>
          <Hint>Press <b>Enter</b> to add a tag.</Hint>
          {errors.interests && <ErrorText>{errors.interests}</ErrorText>}
        </FormGroup>

      </Form>

      <Footer>
        <NextButton onClick={handleNext} disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Next Step'}
        </NextButton>
      </Footer>
    </Wrapper>
  );
}

// --- STYLES ---

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

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
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

const Select = styled.select<{ $hasError?: boolean }>`
  display: block;
  width: 100%;
  padding: 0.75rem;
  border: 1px solid ${props => props.$hasError ? '#ef4444' : '#d1d5db'};
  border-radius: 0.5rem;
  font-size: 0.95rem;
  background-color: white;
  animation: ${props => props.$hasError ? shake : 'none'} 0.3s ease-in-out;

  &:focus {
    outline: none;
    border-color: ${props => props.$hasError ? '#ef4444' : '#6366f1'};
    box-shadow: 0 0 0 1px ${props => props.$hasError ? '#ef4444' : '#6366f1'};
  }
`;

const DomainGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
`;

const DomainCard = styled.div<{ $selected: boolean; $hasError?: boolean }>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-weight: 600;

  background-color: ${props => props.$selected ? '#111827' : '#ffffff'};
  color: ${props => props.$selected ? '#ffffff' : '#374151'};
  
  border: 1px solid ${props => 
    props.$selected ? '#111827' : 
    props.$hasError ? '#ef4444' : '#d1d5db'
  };

  box-shadow: ${props => props.$selected 
    ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
    : '0 1px 2px 0 rgba(0, 0, 0, 0.05)'};
  
  animation: ${props => props.$hasError ? shake : 'none'} 0.3s ease-in-out;

  &:hover {
    transform: ${props => props.$selected ? 'none' : 'translateY(-1px)'};
    border-color: ${props => props.$selected ? '#111827' : props.$hasError ? '#ef4444' : '#9ca3af'};
  }
`;

const RadioCircle = styled.div<{ $selected: boolean; $hasError?: boolean }>`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 50%;
  border: 2px solid ${props => 
    props.$selected ? '#4f46e5' : 
    props.$hasError ? '#ef4444' : '#d1d5db'
  };
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

// --- Tag Styles ---
const TagsContainer = styled.div<{ $hasError?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid ${props => props.$hasError ? '#ef4444' : '#d1d5db'};
  border-radius: 0.5rem;
  background-color: white;
  min-height: 3rem;
  animation: ${props => props.$hasError ? shake : 'none'} 0.3s ease-in-out;

  &:focus-within {
    border-color: ${props => props.$hasError ? '#ef4444' : '#6366f1'};
    box-shadow: 0 0 0 1px ${props => props.$hasError ? '#ef4444' : '#6366f1'};
  }
`;

const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  background-color: #e0e7ff; /* indigo-100 */
  color: #3730a3; /* indigo-800 */
  font-size: 0.875rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  border-radius: 9999px;
`;

const RemoveBtn = styled.button`
  background: none;
  border: none;
  color: #6366f1;
  margin-left: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  display: flex;
  align-items: center;
  
  &:hover { color: #3730a3; }
`;

const TagInput = styled.input`
  flex: 1;
  border: none;
  min-width: 120px;
  font-size: 0.95rem;
  padding: 0.25rem;
  &:focus { outline: none; }
  &::placeholder { color: #9ca3af; }
`;

const Hint = styled.p`
  font-size: 0.75rem;
  color: #6b7280;
  margin-top: 0.25rem;
`;

const ErrorText = styled.span`
  color: #ef4444;
  font-size: 0.75rem;
  font-weight: 600;
  margin-top: 0.25rem;
`;

const AlertBanner = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #b91c1c;
  padding: 0.75rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  text-align: center;
  font-weight: 500;
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

  &:hover:not(:disabled) {
    background-color: #000000;
    transform: translateY(-1px);
  }

  &:disabled {
    background-color: #9ca3af;
    cursor: not-allowed;
  }
`;