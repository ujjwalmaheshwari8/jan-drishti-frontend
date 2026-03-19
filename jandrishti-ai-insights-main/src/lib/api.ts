const API_BASE = import.meta.env.VITE_API_URL ?? "";

async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const url = API_BASE ? `${API_BASE.replace(/\/$/, "")}${path}` : path;
  const res = await fetch(url, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error((err as { error?: string }).error ?? "Request failed");
  }
  return res.json();
}

export interface Booth {
  id: string;
  name: string;
  blockId: string;
  lat: number;
  lng: number;
  issueCount: number;
  sentimentScore: number;
  status: "green" | "yellow" | "red";
}

export interface Block {
  id: string;
  name: string;
  booths: Booth[];
}

export interface ConstituencyResponse {
  name: string;
  blocks: Block[];
  center: [number, number];
}

export interface ComplaintResponse {
  id: string;
  text: string;
  boothId: string;
  issueType: string;
  sentiment:"Positive" | "Neutral" | "Negative";
  priority: string;
  location: string;
  timestamp: string;
  status: string;
}

export interface GovernmentActionResponse {
  boothId: string;
  boothName: string;
  issue: string;
  department: string;
  status: string;
  eta: string;
}

export interface AIAnalysisResponse {
  issueType: string;
  sentiment: "Positive" | "Neutral" | "Negative";
  location: string;
  boothId: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  keywords: string[];
  confidence: number;
}

export const api = {
  getConstituency: () => fetchApi<ConstituencyResponse>("/api/constituency"),
  getComplaints: () => fetchApi<ComplaintResponse[]>("/api/complaints"),
  createComplaint: (body: {
    text: string;
    boothId: string;
    issueType: string;
    sentiment: string;
    priority: string;
    location: string;
    status?: string;
  }) =>
    fetchApi<ComplaintResponse>("/api/complaints", {
      method: "POST",
      body: JSON.stringify(body),
    }),
  getActions: () => fetchApi<GovernmentActionResponse[]>("/api/actions"),
  getTrend: () => fetchApi<{ date: string; issues: number }[]>("/api/stats/trend"),
  getCategories: () =>
    fetchApi<{ category: string; count: number; fill: string }[]>("/api/stats/categories"),
  getSentiment: () =>
    fetchApi<{ name: string; value: number; fill: string }[]>("/api/stats/sentiment"),
  analyze: (text: string) =>
    fetchApi<AIAnalysisResponse>("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ text }),
    }),
  health: () => fetchApi<{ ok: boolean }>("/api/health"),
};

export async function isBackendAvailable() {
  try {
    const res = await fetch("http://localhost:3001/api/categories");
    return res.ok;
  } catch {
    return false;
  }

}
