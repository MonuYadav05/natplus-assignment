"use client";

import { TeamStats, TeamMatchesData } from "@/types/matches";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface SeasonPerformanceChartProps {
  teams: TeamStats[];
  selectedTeamMatches: TeamMatchesData[];
}

export default function SeasonPerformanceChart({ teams, selectedTeamMatches }: SeasonPerformanceChartProps) {
  // Get unique seasons from matches
  const seasons = Array.from(new Set(
    selectedTeamMatches.flatMap(teamData =>
      teamData.matches.map(match => match.season)
    )
  )).sort((a, b) => a - b);

  // Calculate win rates for each team per season
  const chartData = seasons.map(season => {
    const dataPoint: any = { season };

    teams.forEach(team => {
      const teamMatches = selectedTeamMatches.find(tm => tm.teamId === team.id)?.matches || [];
      const seasonMatches = teamMatches.filter(match => match.season === season);

      if (seasonMatches.length > 0) {
        const wins = seasonMatches.filter(match => match.winner === team.name).length;
        const winRate = (wins / seasonMatches.length) * 100;
        dataPoint[team.id] = Math.round(winRate * 10) / 10; // Round to 1 decimal place
      } else {
        dataPoint[team.id] = null; // No matches in this season
      }
    });

    return dataPoint;
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Season Performance</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="season"
              tickFormatter={(value) => value.toString()}
            />
            <YAxis
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              formatter={(value) => value === null ? ['No matches', ''] : [`${value}%`, 'Win Rate']}
              labelFormatter={(label) => `Season ${label}`}
            />
            <Legend />
            {teams.map((team, index) => (
              <Line
                key={team.id}
                type="monotone"
                dataKey={team.id}
                name={team.name}
                stroke={team.color || `hsl(var(--chart-${(index % 5) + 1}))`}
                strokeWidth={2}
                dot={true}
                connectNulls={true}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}