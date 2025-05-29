export interface TeamData {
  id: string;
  name: string;
  shortName?: string;
  color?: string;
  status: "active" | "inactive";
  homeCityName: string;
  homeGroundName: string;
  location: {
    latitude: number;
    longitude: number;
  };
  foundedYear: number;
  titles: number;
  matchesPlayed: number;
  matchesWon: number;
  matchesLost: number;
  matchesTied: number;
  winRate: number;
  totalPlayers: number;
  owner: string;
  captain?: string;
  coach?: string;
}