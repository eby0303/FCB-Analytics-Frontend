// API endpoints
const BASE_URL = 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  RECENT_MATCHES: `${BASE_URL}/matches/recent`,
  UPCOMING_MATCHES: `${BASE_URL}/matches/upcoming`,
  PLAYERS: `${BASE_URL}/players`,
  SEASON_STATS: `${BASE_URL}/stats/season`,
  TEAM_STATS: `${BASE_URL}/stats/team`,
  TEAM_INFO: `${BASE_URL}/team-info`,
  NEWS: `${BASE_URL}/news`,
};

// Fetch wrapper with error handling
export async function fetchData<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error('API fetch error:', error);
    throw error;
  }
}

// Type definitions for our API responses
export interface Match {
  _id: string;
  matchId: number;
  competition: string;
  status: string;
  matchday?: number;
  stage?: string;
  utcDate: string;
  lastUpdated: string;
  homeTeam: {
    id: number;
    name: string;
  };
  awayTeam: {
    id: number;
    name: string;
  };
  score: {
    fullTime: {
      home: number | null;
      away: number | null;
    };
    halfTime: {
      home: number | null;
      away: number | null;
    };
  };
}

export interface Player {
  _id: string;
  id: number;
  name: string;
  position: string;
  dateOfBirth: string;
  nationality: string;
  status: string;
  lastUpdated: string;
}

export interface SeasonStats {
  _id: string;
  wins: number;
  draws: number;
  losses: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  form: string[];
  lastUpdated: string;
}

export interface PlayerStats {
  Player: string;
  Nation: string;
  Pos: string;
  Age: string;
  MP: string;
  Starts: string;
  Min: string;
  "90s": string;
  Gls: string;
  Ast: string;
  "G+A": string;
  "G-PK": string;
  PK: string;
  PKatt: string;
  CrdY: string;
  CrdR: string;
  xG: string;
  npxG: string;
  xAG: string;
  "npxG+xAG": string;
  PrgC: string;
  PrgP: string;
  PrgR: string;
  "G+A-PK": string;
  "xG+xAG": string;
  Matches: string;
}

export interface TeamStats {
  stats_standard_combined: PlayerStats[];
  stats_standard_12: PlayerStats[];
  stats_standard_8: PlayerStats[];
}

export interface TeamInfo {
  name: string;
  crest: string;
  venue: string;
}

export interface NewsArticle {
  title: string;
  url: string;
  imageUrl: string;
  date: string;
  isToday: boolean;
}

export interface NewsResponse {
  success: boolean;
  data: {
    dateFilter: {
      yesterday: string;
      today: string;
      includeToday: boolean;
    };
    articles: NewsArticle[];
  };
}
