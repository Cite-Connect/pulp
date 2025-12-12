'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import Link from 'next/link';
import { FiSearch, FiShare2, FiCpu, FiArrowRight, FiCheck } from 'react-icons/fi';

export default function Home() {
  return (
    <Container>
      <HeroSection>
        <Nav>
          <Logo>CiteConnect</Logo>
          <NavLinks>
            <Link href="/login" passHref>
              <LoginButton>Log In</LoginButton>
            </Link>
          </NavLinks>
        </Nav>

        <HeroContent>
          <HeroBadge>
            <BadgeDot /> Now with AI Summaries
          </HeroBadge>
          <HeroTitle>
            Research at the <br />
            <GradientText>Speed of Thought.</GradientText>
          </HeroTitle>
          <HeroSubtitle>
            Stop drowning in PDF lists. Discover, visualize, and understand academic 
            literature with semantic search and interactive citation graphs.
          </HeroSubtitle>
          
          <ButtonGroup>
            <Link href="/login" passHref legacyBehavior>
              <PrimaryCta>
                Start Researching <FiArrowRight />
              </PrimaryCta>
            </Link>
            <SecondaryCta href="#features">
              Explore Features
            </SecondaryCta>
          </ButtonGroup>

          <VisualContainer>
            <FloatingCard $top={20} $left={10} $delay={0}>
              <FiSearch size={24} />
              <CardText>Semantic Search</CardText>
            </FloatingCard>
            <FloatingCard $top={60} $left={80} $delay={2}>
              <FiShare2 size={24} />
              <CardText>Citation Graph</CardText>
            </FloatingCard>
            <FloatingCard $top={10} $left={70} $delay={4}>
              <FiCpu size={24} />
              <CardText>Personalised Explainability</CardText>
            </FloatingCard>
            
            <CenterOrb />
            <OrbitRing $size={300} $duration={20} />
            <OrbitRing $size={500} $duration={30} />
          </VisualContainer>
        </HeroContent>
      </HeroSection>

      <FeaturesSection id="features">
        <SectionHeader>
          <SectionLabel>The Platform</SectionLabel>
          <SectionTitle>Everything you need to <br/>connect the dots.</SectionTitle>
        </SectionHeader>

        <FeatureGrid>
          <FeatureCard>
            <IconBox $color="#4f46e5">
              <FiSearch color="white" size={24} />
            </IconBox>
            <CardTitle>Semantic Retrieval</CardTitle>
            <CardDescription>
              Don&apos;t just match keywords. Our vector search understands the 
              <i>intent</i> behind your query to find contextually relevant papers.
            </CardDescription>
          </FeatureCard>

          <FeatureCard>
            <IconBox $color="#059669">
              <FiShare2 color="white" size={24} />
            </IconBox>
            <CardTitle>Citation Graphs</CardTitle>
            <CardDescription>
              Visualize the conversation. See how papers cite each other in an 
              interactive network to spot trends and foundational works.
            </CardDescription>
          </FeatureCard>

          <FeatureCard>
            <IconBox $color="#db2777">
              <FiCpu color="white" size={24} />
            </IconBox>
            <CardTitle>Personalised Explanations</CardTitle>
            <CardDescription>
              Skip the abstract skimming. Get instant, summaries 
              explaining exactly <i>why</i> a paper matches your research interests.
            </CardDescription>
          </FeatureCard>
        </FeatureGrid>
      </FeaturesSection>

      <ComparisonSection>
        <ComparisonContainer>
          <LeftComp>
            <CompTitle>The Old Way</CompTitle>
            <CompList>
              <CompItem $bad><Cross /> Endless list of 10,000+ results</CompItem>
              <CompItem $bad><Cross /> Keyword guessing games</CompItem>
              <CompItem $bad><Cross /> Manually tracking citations</CompItem>
              <CompItem $bad><Cross /> No personalization</CompItem>
            </CompList>
          </LeftComp>
          
          <RightComp>
            <CompTitle>The CiteConnect Way</CompTitle>
            <CompList>
              <CompItem><Check /> Top 20 context-aware results</CompItem>
              <CompItem><Check /> Natural language queries</CompItem>
              <CompItem><Check /> Instant visual knowledge graphs</CompItem>
              <CompItem><Check /> Recommendations based on <b> your </b> profile</CompItem>
            </CompList>
          </RightComp>
        </ComparisonContainer>
      </ComparisonSection>

      <Footer>
        <FooterContent>
          <Logo>CiteConnect</Logo>
          <FooterLinks>
            <FooterLink href="#">Privacy Policy</FooterLink>
            <FooterLink href="#">Terms of Service</FooterLink>
            <FooterLink href="https://github.com/Cite-Connect">GitHub</FooterLink>
          </FooterLinks>
          <Copyright>© 2025 CiteConnect. Built for Research.</Copyright>
        </FooterContent>
      </Footer>
    </Container>
  );
}

// --- ICONS & HELPERS ---

const Check = () => <FiCheck color="#10b981" size={20} style={{marginRight: 10}} />;
const Cross = () => <span style={{color: '#ef4444', marginRight: 12, fontWeight: 'bold', fontSize: 20}}>×</span>;

// --- STYLES ---

const Container = styled.div`
  min-height: 100vh;
  background-color: #ffffff;
`;

// -- HERO STYLES --
const HeroSection = styled.section`
  background-color: #0f172a; /* Slate 900 */
  color: white;
  padding: 0 1.5rem;
  padding-bottom: 8rem;
  position: relative;
  overflow: hidden;
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -0.03em;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const NavLink = styled.a`
  color: #94a3b8;
  font-weight: 500;
  font-size: 0.95rem;
  transition: color 0.2s;
  &:hover { color: white; }
`;

const LoginButton = styled.a`
  padding: 0.6rem 1.25rem;
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s;
  cursor: pointer;
  &:hover { background: rgba(255,255,255,0.2); }
`;

const HeroContent = styled.div`
  max-width: 1000px;
  margin: 5rem auto 0 auto;
  text-align: center;
  position: relative;
  z-index: 10;
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(99, 102, 241, 0.1);
  border: 1px solid rgba(99, 102, 241, 0.4);
  color: #818cf8;
  padding: 0.35rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
`;

const BadgeDot = styled.span`
  width: 6px;
  height: 6px;
  background-color: #818cf8;
  border-radius: 50%;
  box-shadow: 0 0 8px #818cf8;
`;

const HeroTitle = styled.h1`
  font-size: 4.5rem;
  line-height: 1.1;
  font-weight: 800;
  letter-spacing: -0.04em;
  margin-bottom: 1.5rem;
  
  @media (max-width: 768px) {
    font-size: 3rem;
  }
`;

const GradientText = styled.span`
  background: linear-gradient(135deg, #ffffff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: #94a3b8;
  max-width: 600px;
  margin: 0 auto 3rem auto;
  line-height: 1.6;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 6rem;
`;

const PrimaryCta = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #4f46e5;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 700;
  font-size: 1.125rem;
  transition: transform 0.2s, background-color 0.2s;
  cursor: pointer;

  &:hover {
    background-color: #4338ca;
    transform: translateY(-2px);
  }
`;

const SecondaryCta = styled.a`
  display: inline-flex;
  align-items: center;
  background-color: transparent;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  font-size: 1.125rem;
  border: 1px solid rgba(255,255,255,0.2);
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(255,255,255,0.05);
  }
`;

// -- HERO VISUALS --
const VisualContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  opacity: 0.4;
`;

const CenterOrb = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(79,70,229,0.3) 0%, rgba(15,23,42,0) 70%);
  border-radius: 50%;
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const FloatingCard = styled.div<{ $top: number, $left: number, $delay: number }>`
  position: absolute;
  top: ${props => props.$top}%;
  left: ${props => props.$left}%;
  background: rgba(30, 41, 59, 0.8);
  border: 1px solid rgba(255,255,255,0.1);
  backdrop-filter: blur(10px);
  padding: 0.75rem 1.25rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #e2e8f0;
  animation: ${float} 6s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
`;

const CardText = styled.span`
  font-weight: 600;
  font-size: 0.9rem;
`;

const spin = keyframes`
  from { transform: translate(-50%, -50%) rotate(0deg); }
  to { transform: translate(-50%, -50%) rotate(360deg); }
`;

const OrbitRing = styled.div<{ $size: number, $duration: number }>`
  position: absolute;
  top: 50%;
  left: 50%;
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  border: 1px dashed rgba(255,255,255,0.1);
  border-radius: 50%;
  animation: ${spin} ${props => props.$duration}s linear infinite;
`;

// -- FEATURES --
const FeaturesSection = styled.section`
  padding: 6rem 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 4rem;
`;

const SectionLabel = styled.span`
  text-transform: uppercase;
  color: #4f46e5;
  font-weight: 700;
  letter-spacing: 0.05em;
  font-size: 0.875rem;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 800;
  color: #1e293b;
  margin-top: 1rem;
  letter-spacing: -0.03em;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`;

const FeatureCard = styled.div`
  background: #f8fafc;
  padding: 2.5rem;
  border-radius: 1rem;
  transition: transform 0.2s;
  &:hover { transform: translateY(-5px); }
`;

const IconBox = styled.div<{ $color: string }>`
  width: 3.5rem;
  height: 3.5rem;
  background-color: ${props => props.$color};
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 1rem;
`;

const CardDescription = styled.p`
  color: #64748b;
  line-height: 1.6;
  font-size: 1rem;
`;

// -- COMPARISON --
const ComparisonSection = styled.section`
  background-color: #f1f5f9;
  padding: 6rem 1.5rem;
`;

const ComparisonContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const LeftComp = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  opacity: 0.7;
`;

const RightComp = styled.div`
  background: white;
  padding: 2.5rem;
  border-radius: 1rem;
  border: 2px solid #4f46e5;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transform: scale(1.05);
  
  @media (max-width: 768px) {
    transform: scale(1);
  }
`;

const CompTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 1.5rem;
  color: #1e293b;
  text-align: center;
`;

const CompList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CompItem = styled.li<{ $bad?: boolean }>`
  display: flex;
  align-items: center;
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.$bad ? '#64748b' : '#1e293b'};
`;

// -- FOOTER --
const Footer = styled.footer`
  background-color: white;
  border-top: 1px solid #e2e8f0;
  padding: 4rem 1.5rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
`;

const FooterLink = styled.a`
  color: #64748b;
  font-weight: 500;
  &:hover { color: #4f46e5; }
`;

const Copyright = styled.p`
  color: #94a3b8;
  font-size: 0.875rem;
`;