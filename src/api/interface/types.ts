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
    research_stage: string;

    // OPTIONAL
    sub_domains?: string[];
    google_scholar_url?: string;
    institution?: string;
}

export interface CreateProfileResponse {
    user_id: string | number;
    profile: UserProfile;
    message?: string;
}

export interface GetProfileResponse {
    user_id: string | number;
    profile: UserProfile;
}

export interface UserProfile {
    primary_domain: string;
    reading_level: string;
    interests: string[];
    research_stage: string;
    sub_domains: string[];
    research_methods: string[];
    research_goals: string[];
    time_availability: string;
    years_experience: number;
    h_index: number;
    prefers_recent_papers: boolean;
    prefers_high_impact: boolean;
    prefers_open_access: boolean;
    preferred_venues: string[];
    institution: string;
    department: string;
    looking_for_collaborators: boolean;
    google_scholar_url: string;
    semantic_scholar_author_id: string;
    
    user_id?: string | number;
    created_at?: string;
    updated_at?: string;
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
    paper_id: string;
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
    score_breakdown?: ScoreBreakdown;
}

export interface RecommendationPayload {
    user_id: number | string; // Optional if backend infers from token
    count: number;            // Default 10
    model_preference?: 'minilm' | 'specter';
    search_query: string;
    session_id: string | null;
}

export interface ScoreBreakdown {
    keyword: number;
    semantic: number;
    profile: number;
    multi_score_boost: number
}

export interface RecommendedPaper extends PaperDetails {
    relevance_score: number;       // 0.0 - 1.0
    relevance_explanation?: string; // "Why we showed this"
    match_source?: string;         // "keyword+semantic"
}

export interface RecommendationMetadata {
    strategy_used: string;         // "search_augmented", "cold_start", etc.
    search_query: string | null;
    model_used: string;
    generation_time_ms: number;
    evaluation_score?: number;
}

export interface RecommendationsResponse {
    recommendations: RecommendedPaper[];
    metadata: RecommendationMetadata;
}

export type InteractionType = 
    | 'cite' 
    | 'save' 
    | 'download' 
    | 'like' 
    | 'click' 
    | 'view' 
    | 'dismiss' 
    | 'not_interested';

export interface InteractionContext {
    source?: string; // e.g. "search_results", "recommendations", "citation_graph"
    position?: number;
    session_id?: string;
    score_breakdown?: ScoreBreakdown;
}

export interface TrackInteractionPayload {
    paper_id: string;
    interaction_type: InteractionType;
    duration_seconds?: number;
    context?: InteractionContext;
}

export interface TrackInteractionResponse {
    interaction_id: number;
    user_id: number;
    paper_id: string;
    interaction_type: InteractionType;
    strength: number;
    embedding_update_triggered: boolean;
    message: string;
}

export interface InteractionHistoryItem {
    interaction_id: number;
    paper_id: string;
    interaction_type: InteractionType;
    interaction_strength: number;
    created_at: string;
    duration_seconds?: number;
    source?: string;
    position?: number;
}

export interface InteractionHistoryResponse {
    user_id: number;
    interaction_count: number;
    interactions: InteractionHistoryItem[];
}

export interface InteractionStatisticsResponse {
    user_id: number;
    period_days: number;
    total_interactions: number;
    positive_interactions: number;
    negative_interactions: number;
    meaningful_interactions: number;
    domains_explored: number;
    interaction_breakdown: Record<InteractionType, number>;
    engagement_rate: number;
}

export interface SavedPaperItem {
    paper_id: string;
    title: string;
    authors: string[];
    abstract: string;
    publication_date: string;
    saved_at: string;
    citation_count: number;
    url: string;
}

export interface SavedPapersResponse {
    user_id: number;
    saved_count: number;
    saved_papers: SavedPaperItem[];
}

export interface RemoveFilterResponse {
    user_id: number;
    paper_id: string;
    message: string;
}

export interface HistoryParams {
    limit?: number;
    min_strength?: number;
}