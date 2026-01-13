export interface TrendData {
    date: string;
    value: number;
    overall?: number;
    biometric?: number;
    demographic?: number;
    male?: number;
    female?: number;
}

export interface StateData {
    id: string;
    value: number;
}

export interface AnomalyData {
    district: string;
    state: string;
    total: number;
}

export interface PredictionData {
    date: string;
    value: number;
    lowerBound: number;
    upperBound: number;
}

export interface InsightData {
    title: string;
    description: string;
    category: 'Migration' | 'Digital Inclusion' | 'Administrative';
    impact: 'High' | 'Medium' | 'Low';
}

export interface RecommendationData {
    title: string;
    action: string;
    urgency: 'High' | 'Medium' | 'Low';
    cost: 'High' | 'Medium' | 'Low';
}

export interface DashboardData {
    trends: TrendData[];
    heatmap: StateData[];
    topDistricts: AnomalyData[];
    predictions: PredictionData[];
    insights: InsightData[];
    recommendations: RecommendationData[];
}
