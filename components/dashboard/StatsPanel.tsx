"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import TeamPerformanceChart from "@/components/dashboard/charts/TeamPerformanceChart";
import TeamDetailsCard from "@/components/dashboard/TeamDetailsCard";
import WinLossChart from "@/components/dashboard/charts/WinLossChart";
import SeasonPerformanceChart from "@/components/dashboard/charts/SeasonPerformanceChart";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TeamStats, TeamMatchesData } from "@/types/matches";

interface StatsPanelProps {
  selectedTeams: TeamStats[];
  selectedTeamMatches: TeamMatchesData[];
  compareMode: boolean;
}

export default function StatsPanel({
  selectedTeams,
  selectedTeamMatches,
  compareMode
}: StatsPanelProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => setIsExpanded(!isExpanded);

  return (
    <div className={`border-t border-border bg-card transition-all duration-300 ${isExpanded ? 'h-[350px]' : 'h-12'}`}>
      <div className="flex items-center justify-between px-4 h-12">
        <Button
          variant="ghost"
          size="sm"
          className="p-0 h-12 w-full flex justify-between hover:bg-transparent"
          onClick={toggleExpanded}
        >
          <span className="text-sm text-muted-foreground">
            {compareMode
              ? `Comparing ${selectedTeams.length} teams`
              : `Showing stats for ${selectedTeams[0]?.name}`}
          </span>
          {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
        </Button>
      </div>

      {isExpanded && (
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="h-[calc(100%-48px)]"
        >
          <div className="flex items-center justify-between px-4 pt-2">
            <ScrollArea className="w-full max-w-full">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="performance">Performance</TabsTrigger>
                <TabsTrigger value="seasons">Seasons</TabsTrigger>
                <TabsTrigger value="players">Key Players</TabsTrigger>
              </TabsList>
            </ScrollArea>
          </div>

          <div className="h-[calc(100%-48px)]">
            <TabsContent value="overview" className="m-0 p-0 h-full">
              <ScrollArea className="h-full">
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {selectedTeams.map(team => (
                    <TeamDetailsCard key={team.id} team={team} />
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="performance" className="m-0 p-0 h-full">
              <div className="grid grid-cols-1 md:grid-cols-2 h-full p-4 gap-4">
                <TeamPerformanceChart teams={selectedTeams} />
                <WinLossChart teams={selectedTeams} />
              </div>
            </TabsContent>

            <TabsContent value="seasons" className="m-0 p-0 h-full">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <SeasonPerformanceChart teams={selectedTeams} selectedTeamMatches={selectedTeamMatches} />
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="players" className="m-0 p-0 h-full">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <div className="flex justify-center items-center h-64 text-muted-foreground">
                    Player statistics will be available in the next update
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>
          </div>
        </Tabs>
      )}
    </div>
  );
}