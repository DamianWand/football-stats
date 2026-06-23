export interface Competition {
  id: number;
  name: string;
  code: string;
  emblem: string;
  area: {
    name: string;
    flag: string;
  };
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  crest: string;
}

export interface Scorer {
  player: {
    id: number;
    name: string;
    nationality: string;
    dateOfBirth: string;
    position: string;
  };
  team: Team;
  playedMatches: number;
  goals: number;
  assists: number | null;
  penalties: number | null;
}

export interface ScorersResponse {
  competition: Competition;
  season: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
  };
  scorers: Scorer[];
}

export interface CompetitionsResponse {
  competitions: Competition[];
}

export const COMPETITIONS: { code: string; name: string; flag: string }[] = [
  { code: "PL", name: "Premier League", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
  { code: "PD", name: "La Liga", flag: "🇪🇸" },
  { code: "BL1", name: "Bundesliga", flag: "🇩🇪" },
  { code: "SA", name: "Serie A", flag: "🇮🇹" },
  { code: "FL1", name: "Ligue 1", flag: "🇫🇷" },
  { code: "CL", name: "Champions League", flag: "🏆" },
];
