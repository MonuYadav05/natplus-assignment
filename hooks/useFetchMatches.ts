"use client";

import { useState, useEffect } from "react";
import { MatchData, TeamStats } from "@/types/matches";
import { supabase } from "@/lib/supabase-client";

export function useFetchMatches() {
  const [matches, setMatches] = useState<MatchData[]>([]);
  const [teamStats, setTeamStats] = useState<TeamStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        setIsLoading(true);
        
        // Fetch matches from Supabase
        const { data: matchesData, error: matchesError } = await supabase
          .from('matches')
          .select('*')
          .order('date', { ascending: false });

        if (matchesError) throw matchesError;

        const processedMatches: MatchData[] = matchesData.map(match => ({
          id: match.id,
          season: match.season,
          city: match.city,
          date: match.date,
          matchType: match.match_type,
          playerOfMatch: match.player_of_match,
          venue: match.venue,
          team1: match.team1,
          team2: match.team2,
          tossWinner: match.toss_winner,
          tossDecision: match.toss_decision,
          winner: match.winner,
          result: match.result,
          resultMargin: match.result_margin,
          targetRuns: match.target_runs,
          targetOvers: match.target_overs,
          superOver: match.super_over,
          method: match.method,
          umpire1: match.umpire1,
          umpire2: match.umpire2
        }));

        // Process matches to generate team statistics
        
        // Get unique teams from matches
        const uniqueTeams = [...new Set([
          ...processedMatches.map(m => m.team1),
          ...processedMatches.map(m => m.team2)
        ])];

        // City coordinates for teams (using actual IPL venues)
        const cityCoordinates: Record<string, { lat: number; lng: number }> = {
          "Mumbai": { lat: 18.9389, lng: 72.8258 }, // Wankhede Stadium
          "Chennai": { lat: 13.0827, lng: 80.2707 }, // M.A. Chidambaram Stadium
          "Bangalore": { lat: 12.9788, lng: 77.5996 }, // M. Chinnaswamy Stadium
          "Kolkata": { lat: 22.5646, lng: 88.3433 }, // Eden Gardens
          "Delhi": { lat: 28.6304, lng: 77.2177 }, // Arun Jaitley Stadium
          "Hyderabad": { lat: 17.4065, lng: 78.5505 }, // Rajiv Gandhi Stadium
          "Mohali": { lat: 30.6909, lng: 76.7375 }, // IS Bindra Stadium
          "Jaipur": { lat: 26.8946, lng: 75.8012 }, // Sawai Mansingh Stadium
          "Ahmedabad": { lat: 23.0707, lng: 72.5946 }, // Narendra Modi Stadium
          "Lucknow": { lat: 26.7725, lng: 80.9462 }, // BRSABV Ekana Stadium
          "Pune": { lat: 18.6279, lng: 73.8720 }, // Maharashtra Cricket Association Stadium
          "Dharamsala": { lat: 32.2190, lng: 76.3234 }, // HPCA Stadium
          "Visakhapatnam": { lat: 17.7215, lng: 83.2247 }, // ACA-VDCA Stadium
          "Ranchi": { lat: 23.3441, lng: 85.3096 }, // JSCA Stadium
          "Rajkot": { lat: 22.3039, lng: 70.7794 }, // Saurashtra Cricket Association Stadium
          "Indore": { lat: 22.7196, lng: 75.8577 }, // Holkar Stadium
          "Nagpur": { lat: 21.1458, lng: 79.0882 }, // VCA Stadium
          "Kanpur": { lat: 26.4499, lng: 80.3319 }, // Green Park Stadium
          "Raipur": { lat: 21.2514, lng: 81.6296 }, // Shaheed Veer Narayan Singh Stadium
          "Cuttack": { lat: 20.4625, lng: 85.8830 }, // Barabati Stadium
          "Guwahati": { lat: 26.1445, lng: 91.7362 }, // Barsapara Stadium
          "Thiruvananthapuram": { lat: 8.5241, lng: 76.9366 }, // Greenfield Stadium
          "Kochi": { lat: 9.9312, lng: 76.2673 }, // Jawaharlal Nehru Stadium
          "Cape Town": { lat: -33.9249, lng: 18.4241 }, // Newlands
          "Durban": { lat: -29.8587, lng: 31.0218 }, // Kingsmead
          "Centurion": { lat: -25.8589, lng: 28.1857 }, // SuperSport Park
          "Port Elizabeth": { lat: -33.7139, lng: 25.5207 }, // St George's Park
          "Johannesburg": { lat: -26.1319, lng: 28.0553 }, // Wanderers Stadium
          "Sharjah": { lat: 25.3463, lng: 55.4209 }, // Sharjah Cricket Stadium
          "Dubai": { lat: 25.2403, lng: 55.3504 }, // Dubai International Cricket Stadium
          "Abu Dhabi": { lat: 24.4539, lng: 54.3773 }, // Sheikh Zayed Stadium
        };

        // Team colors (official IPL team colors)
        const teamColors: Record<string, string> = {
          "Mumbai Indians": "#004BA0",
          "Chennai Super Kings": "#FFFF00",
          "Royal Challengers Bangalore": "#EC1C24",
          "Kolkata Knight Riders": "#3A225D",
          "Delhi Capitals": "#0078BC",
          "Sunrisers Hyderabad": "#F7A721",
          "Punjab Kings": "#ED1B24",
          "Rajasthan Royals": "#254AA5",
          "Gujarat Titans": "#1C1C1C",
          "Lucknow Super Giants": "#A4D4B4",
          "Rising Pune Supergiant": "#D71920",
          "Gujarat Lions": "#F7A721",
          "Pune Warriors": "#D71920",
          "Kochi Tuskers Kerala": "#8B0000",
          "Deccan Chargers": "#00008B",
          "Delhi Daredevils": "#0078BC",
          "Kings XI Punjab": "#ED1B24",
        };

        const teamStatsMap = new Map<string, TeamStats>();

        // Initialize team stats
        uniqueTeams.forEach(teamName => {
          const city = Object.keys(cityCoordinates).find(city => 
            teamName.toLowerCase().includes(city.toLowerCase())
          ) || "Mumbai";

          teamStatsMap.set(teamName, {
            id: teamName.toLowerCase().replace(/\s+/g, '-'),
            name: teamName,
            shortName: teamName.split(' ').map(word => word[0]).join(''),
            color: teamColors[teamName] || '#666666',
            homeCityName: city,
            homeGroundName: processedMatches.find(m => 
              (m.team1 === teamName || m.team2 === teamName) && 
              m.city === city
            )?.venue || '',
            location: {
              latitude: cityCoordinates[city].lat,
              longitude: cityCoordinates[city].lng
            },
            matchesPlayed: 0,
            matchesWon: 0,
            matchesLost: 0,
            tossesWon: 0,
            battingFirst: 0,
            fieldingFirst: 0,
            superOvers: 0,
            playerOfMatchAwards: 0,
            winRate: 0,
            homeWinRate: 0,
            awayWinRate: 0
          });
        });

        // Calculate team statistics
        processedMatches.forEach(match => {
          [match.team1, match.team2].forEach(teamName => {
            const stats = teamStatsMap.get(teamName)!;
            stats.matchesPlayed++;

            if (match.winner === teamName) {
              stats.matchesWon++;
            } else if (match.winner) {
              stats.matchesLost++;
            }

            if (match.tossWinner === teamName) {
              stats.tossesWon++;
              if (match.tossDecision === 'bat') {
                stats.battingFirst++;
              } else {
                stats.fieldingFirst++;
              }
            }

            if (match.superOver) {
              stats.superOvers++;
            }

            if (match.playerOfMatch === teamName) {
              stats.playerOfMatchAwards++;
            }
          });
        });

        // Calculate win rates
        teamStatsMap.forEach(stats => {
          stats.winRate = (stats.matchesWon / stats.matchesPlayed) * 100;

          const homeMatches = processedMatches.filter(m => 
            (m.team1 === stats.name || m.team2 === stats.name) && 
            m.city === stats.homeCityName
          );
          const homeWins = homeMatches.filter(m => m.winner === stats.name).length;
          stats.homeWinRate = homeMatches.length > 0 
            ? (homeWins / homeMatches.length) * 100 
            : 0;

          const awayMatches = processedMatches.filter(m => 
            (m.team1 === stats.name || m.team2 === stats.name) && 
            m.city !== stats.homeCityName
          );
          const awayWins = awayMatches.filter(m => m.winner === stats.name).length;
          stats.awayWinRate = awayMatches.length > 0 
            ? (awayWins / awayMatches.length) * 100 
            : 0;
        });

        setMatches(processedMatches);
        setTeamStats(Array.from(teamStatsMap.values()));
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error occurred'));
        console.error('Error fetching matches:', err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchMatches();
  }, []);

  return { matches, teamStats, isLoading, error };
}