"use client";

import { TeamStats } from "@/types/matches";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TeamPerformanceChartProps {
  teams: TeamStats[];
}

export default function TeamPerformanceChart({ teams }: TeamPerformanceChartProps) {
  // Format data for recharts
  const chartData = teams.map(team => ({
    name: team.shortName || team.name.substring(0, 3),
    wins: team.matchesWon,
    losses: team.matchesLost,
    color: team.color,
    ties: team.matchesPlayed - team.matchesWon - team.matchesLost
  }));
  console.log(teams);
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Match Performance</CardTitle>
      </CardHeader>
      <CardContent className="h-[calc(100%-60px)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 5,
            }}
            barGap={2}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />

            <Legend />
            <Bar dataKey="wins" name="Wins" fill="hsl(var(--chart-1))" />
            <Bar dataKey="losses" name="Losses" fill="hsl(var(--chart-3))" />
            <Bar dataKey="ties" name="Ties" fill="hsl(var(--chart-2))" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}