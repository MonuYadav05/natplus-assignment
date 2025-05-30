"use client";

import { TeamStats } from "@/types/matches";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieLabelRenderProps,
} from "recharts";

interface WinLossChartProps {
  teams: TeamStats[];
}

interface ChartData {
  name: string;
  value: number;
  color: string;
  matchesWon?: number;
  totalMatches?: number;
}

export default function WinLossChart({ teams }: WinLossChartProps) {
  // For single team, we'll show win/loss breakdown
  // For multiple teams, we'll show win percentage comparison

  if (teams.length === 1) {
    const team = teams[0];
    const data: ChartData[] = [
      { name: 'Wins', value: team.matchesWon, color: 'hsl(var(--chart-1))' },
      { name: 'Losses', value: team.matchesLost, color: 'hsl(var(--chart-3))' },
    ];

    const renderLabel = ({ name, value, percent }: PieLabelRenderProps) => {
      if (percent === undefined) return '';
      return `${name}: ${value} (${(percent * 100).toFixed(0)}%)`;
    };

    return (
      <Card className="h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">{team.name} - Match Results</CardTitle>
        </CardHeader>
        <CardContent className="h-[calc(100%-60px)]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={renderLabel}
                labelLine={true}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [`${value} matches`, '']}
              />
              <Legend
                formatter={(value, entry) => {
                  const data = entry.payload as unknown as ChartData;
                  return `${value}: ${data.value} (${((data.value / (team.matchesWon + team.matchesLost)) * 100).toFixed(0)}%)`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  // For multiple teams, show win percentage comparison
  const data: ChartData[] = teams.map(team => ({
    name: team.shortName || team.name.substring(0, 3),
    value: team.winRate,
    matchesWon: team.matchesWon,
    totalMatches: team.matchesWon + team.matchesLost,
    color: team.color || `hsl(var(--chart-${(teams.indexOf(team) % 5) + 1}))`,
  }));

  const renderMultiTeamLabel = ({ name, value, matchesWon, totalMatches }: PieLabelRenderProps & ChartData) => {
    if (!matchesWon || !totalMatches) return '';
    return `${name}: ${matchesWon}/${totalMatches} (${value}%)`;
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Win Rate Comparison</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="value"
              nameKey="name"
              label={renderMultiTeamLabel}
              labelLine={true}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number, name: string, props: any) => {
                const data = props.payload as unknown as ChartData;
                if (!data.matchesWon || !data.totalMatches) return ['', ''];
                return [`${data.matchesWon}/${data.totalMatches} matches (${value}%)`, 'Win Rate'];
              }}
              labelFormatter={(label) => teams.find(t => t.shortName === label)?.name || label}
            />
            <Legend
              formatter={(value, entry) => {
                const data = entry.payload as unknown as ChartData;
                if (!data.matchesWon || !data.totalMatches) return '';
                return `${teams.find(t => t.shortName === value)?.name || value}: ${data.matchesWon}/${data.totalMatches} (${data.value}%)`;
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}