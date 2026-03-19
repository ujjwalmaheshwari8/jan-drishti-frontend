import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, isBackendAvailable } from "@/lib/api";
import type { ConstituencyResponse, ComplaintResponse, GovernmentActionResponse, AIAnalysisResponse } from "@/lib/api";

const BACKEND_KEY = ["backend-available"] as const;
export const constituencyKey = ["constituency"] as const;
export const complaintsKey = ["complaints"] as const;
export const actionsKey = ["actions"] as const;
export const trendKey = ["stats", "trend"] as const;
export const categoriesKey = ["stats", "categories"] as const;
export const sentimentKey = ["stats", "sentiment"] as const;

export function useBackendAvailable() {
  return useQuery({
    queryKey: BACKEND_KEY,
    queryFn: isBackendAvailable,
    staleTime: 60_000,
  });
}

export function useConstituency() {
  return useQuery({
    queryKey: constituencyKey,
    queryFn: api.getConstituency,
    enabled: false,
  });
}

export function useConstituencyWhenReady() {
  const { data: available } = useBackendAvailable();
  return useQuery({
    queryKey: constituencyKey,
    queryFn: api.getConstituency,
    enabled: !!available,
  });
}

export function useComplaintsWhenReady() {
  const { data: available } = useBackendAvailable();
  return useQuery({
    queryKey: complaintsKey,
    queryFn: api.getComplaints,
    enabled: !!available,
  });
}

export function useActionsWhenReady() {
  const { data: available } = useBackendAvailable();
  return useQuery({
    queryKey: actionsKey,
    queryFn: api.getActions,
    enabled: !!available,
  });
}

export function useTrendWhenReady() {
  const { data: available } = useBackendAvailable();
  return useQuery({
    queryKey: trendKey,
    queryFn: api.getTrend,
    enabled: !!available,
  });
}

export function useCategoriesWhenReady() {
  const { data: available } = useBackendAvailable();
  return useQuery({
    queryKey: categoriesKey,
    queryFn: api.getCategories,
    enabled: !!available,
  });
}

export function useSentimentWhenReady() {
  const { data: available } = useBackendAvailable();
  return useQuery({
    queryKey: sentimentKey,
    queryFn: api.getSentiment,
    enabled: !!available,
  });
}

export function useCreateComplaint() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createComplaint,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: complaintsKey });
      qc.invalidateQueries({ queryKey: constituencyKey });
      qc.invalidateQueries({ queryKey: trendKey });
      qc.invalidateQueries({ queryKey: categoriesKey });
      qc.invalidateQueries({ queryKey: sentimentKey });
    },
  });
}

export function useAnalyzeMutation() {
  return useMutation({
    mutationFn: (text: string) => api.analyze(text),
  });
}
