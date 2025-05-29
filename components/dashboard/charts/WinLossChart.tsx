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
} from "recharts";

interface WinLossChartProps {
  teams: TeamStats[];
}

export default function WinLossChart({ teams }: WinLossChartProps) {
  // For single team, we'll show win/loss breakdown
  // For multiple teams, we'll show win percentage comparison

  if (teams.length === 1) {
    const team = teams[0];
    const data = [
      { name: 'Wins', value: team.matchesWon, color: 'hsl(var(--chart-1))' },
      { name: 'Losses', value: team.matchesLost, color: 'hsl(var(--chart-3))' },
    ];

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
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} matches`, '']} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }

  // For multiple teams, show win percentage comparison
  const data = teams.map(team => ({
    name: team.shortName || team.name.substring(0, 3),
    fullName: team.name,
    value: team.winRate,
    color: team.color || `hsl(var(--chart-${(teams.indexOf(team) % 5) + 1}))`,
  }));

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
              label={({ name, value }) => `${name}: ${value}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`${value}%`, 'Win Rate']} labelFormatter={(label) => teams.find(t => t.shortName === label)?.name || label} />
            <Legend formatter={(value) => teams.find(t => t.shortName === value)?.name || value} />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}