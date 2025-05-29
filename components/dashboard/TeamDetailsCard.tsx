import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TeamStats } from "@/types/matches";
import { Trophy, Target, MapPin, Award } from "lucide-react";

interface TeamDetailsCardProps {
  team: TeamStats;
}

export default function TeamDetailsCard({ team }: TeamDetailsCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: team.color || "hsl(var(--muted))" }}
          >
            {team.shortName || team.name.substring(0, 2)}
          </div>
          <CardTitle>{team.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-chart-1" />
              <span className="text-sm">
                {team.matchesWon} Wins
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-chart-2" />
              <span className="text-sm">
                {team.matchesPlayed} Matches
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-chart-3" />
              <span className="text-sm">{team.homeCityName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-chart-4" />
              <span className="text-sm">
                {team.playerOfMatchAwards} Player of Match
              </span>
            </div>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm">
                <span className="font-medium">Win Rate:</span> {team.winRate.toFixed(1)}%
              </div>
              <div
                className="w-full max-w-24 h-2 rounded-full bg-muted overflow-hidden"
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${team.winRate}%`,
                    backgroundColor: team.color || "hsl(var(--chart-1))"
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}