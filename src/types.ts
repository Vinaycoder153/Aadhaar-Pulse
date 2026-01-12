export interface TrendData {
    date: string;
    value: number;
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

export interface DashboardData {
    trends: TrendData[];
    heatmap: StateData[];
    topDistricts: AnomalyData[];
}
