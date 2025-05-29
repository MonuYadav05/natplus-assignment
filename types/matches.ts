export interface MatchData {
  id: string;
  season: number;
  city: string;
  date: string;
  matchType: string;
  playerOfMatch: string;
  venue: string;
  team1: string;
  team2: string;
  tossWinner: string;
  tossDecision: string;
  winner: string;
  result: string;
  resultMargin: number;
  targetRuns: number;
  targetOvers: number;
  superOver: boolean;
  method: string;
  umpire1: string;
  umpire2: string;
}

export interface TeamStats {
  id: string;
  name: string;
  shortName?: string;
  color?: string;
  homeCityName: string;
  homeGroundName: string;
  location: {
    latitude: number;
    longitude: number;
  };
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  tossesWon: number;
  battingFirst: number;
  fieldingFirst: number;
  superOvers: number;
  playerOfMatchAwards: number;
  winRate: number;
  homeWinRate: number;
  awayWinRate: number;
}

export interface TeamMatchesData {
  teamId: string;
  matches: MatchData[];
}