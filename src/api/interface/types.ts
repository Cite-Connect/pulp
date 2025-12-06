export interface RegisterPayload {
    email: string;
    password: string;
    full_name: string;
}

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
    user_id: string;
    user_name: string;
}

export interface CreateProfilePayload {
    primary_domain: string;
    reading_level: 'Introductory' | 'Intermediate' | 'Advanced' | 'Expert';
    interests: string[]; // Min 3, Max 10

    // OPTIONAL
    research_stage?: string;
    sub_domains?: string[];
    google_scholar_url?: string;
}

export interface GraphNode {
    id: string;
    label: string;
    type: 'central' | 'direct_citation' | string;
    year: number;
    citation_count: number;
    domain: string;
    authors: string[];
    venue: string | null;
    abstract: string;
    
    size: number;
    color: string;

    x?: number;
    y?: number;
}

export interface GraphEdge {
    source: string;
    target: string;
    type: string;
    strength: number;
    label: string;
}

export interface GraphStats {
    total_nodes: number;
    total_edges: number;
    direct_citations: number;
    co_citations: number;
    bibliographic_couples: number;
    network_centrality: number;
    avg_citation_count: number;
}

export interface GraphMetadata {
    central_paper_id: string;
    depth: number;
    total_nodes: number;
    total_edges: number;
}

export interface GraphDataResponse {
    nodes: GraphNode[];
    edges: GraphEdge[];
    stats: GraphStats;
    metadata: GraphMetadata;
}

export interface PaperDetails {
    id: string;
    title: string;
    abstract?: string;
    authors: string[];
    year: number;
    url?: string;
    venue?: string;

    domain: string;
    citation_count: number;
    quality_score?: number;
    tldr?: string;
    relevance_score?: number;
    matching_aspects: string[];
}