import { ScorersResponse } from "@/types/football";

const BASE_URL = process.env.FOOTBALL_API_BASE_URL || "https://api.football-data.org/v4";
const API_KEY = process.env.FOOTBALL_API_KEY || "";

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "X-Auth-Token": API_KEY },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || `API error: ${res.status}`);
  }

  return res.json();
}

export async function getTopScorers(
  competitionCode: string,
  limit = 20
): Promise<ScorersResponse> {
  return apiFetch<ScorersResponse>(
    `/competitions/${competitionCode}/scorers?limit=${limit}`
  );
}
