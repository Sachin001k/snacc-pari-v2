const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8501";

export interface SurveyResponse {
  // Demographics & SGIC
  sgic_score?: number;
  age?: number;
  sex?: string;
  school?: string;
  grade?: string;

  // Anthropometry
  height_cm?: number;
  weight_kg?: number;
  bmi_zscore?: number;

  // Dietary intake
  dietary_diversity_score?: number;
  food_groups?: Record<string, number>;

  // Economic access
  cost_barrier?: number;
  meal_availability?: number;
  school_meal_usage?: number;

  // Awareness
  protein_knowledge?: number;
  balanced_diet_knowledge?: number;

  // Structural barriers
  protein_availability?: number;
  market_access?: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export async function submitSurvey(response: SurveyResponse): Promise<ApiResponse<any>> {
  try {
    const res = await fetch(`${API_URL}/api/submit-survey`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response),
    });

    if (!res.ok) {
      return { success: false, error: `API error: ${res.status}` };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function getStatistics(): Promise<ApiResponse<any>> {
  try {
    const res = await fetch(`${API_URL}/api/statistics`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return { success: false, error: `API error: ${res.status}` };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}

export async function calculateScore(response: SurveyResponse): Promise<ApiResponse<any>> {
  try {
    const res = await fetch(`${API_URL}/api/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(response),
    });

    if (!res.ok) {
      return { success: false, error: `API error: ${res.status}` };
    }

    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: String(error) };
  }
}
