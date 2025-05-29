"use client";

import { useState } from "react";
import MapView from "@/components/dashboard/MapView";
import Sidebar from "@/components/dashboard/Sidebar";
import StatsPanel from "@/components/dashboard/StatsPanel";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import { useFetchMatches } from "@/hooks/useFetchMatches";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

export default function Dashboard() {
  const { teamStats, matches, isLoading, error } = useFetchMatches();
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);
  const [compareMode, setCompareMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTeamSelect = (teamId: string) => {
    if (compareMode) {
      if (selectedTeams.includes(teamId)) {
        setSelectedTeams(selectedTeams.filter((id) => id !== teamId));
      } else {
        setSelectedTeams([...selectedTeams, teamId]);
      }
    } else {
      if (selectedTeams.includes(teamId)) {
        setSelectedTeams([]);
      } else {
        setSelectedTeams([teamId]);
      }
    }
  };

  const handleCompareToggle = () => {
    setCompareMode(!compareMode);
    if (!compareMode) {
      // Keep current selection when entering compare mode
    } else {
      // When exiting compare mode, keep only the first selected team
      setSelectedTeams(selectedTeams.length > 0 ? [selectedTeams[0]] : []);
    }
  };

  const getSelectedTeamsData = () => {
    return teamStats.filter((team) => selectedTeams.includes(team.id));
  };

  const getTeamMatches = (teamId: string) => {
    return matches.filter(match => {
      const team = teamStats.find(t => t.id === teamId);
      return team && (match.team1 === team.name || match.team2 === team.name);
    });
  };

  const SidebarContent = () => (
    <Sidebar
      teams={teamStats}
      selectedTeams={selectedTeams}
      onTeamSelect={(teamId) => {
        handleTeamSelect(teamId);
        setSidebarOpen(false);
      }}
      compareMode={compareMode}
      isLoading={isLoading}
    />
  );

  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader
        compareMode={compareMode}
        onCompareToggle={handleCompareToggle}
      />

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 h-full overflow-hidden relative">
          <MapView
            teams={teamStats}
            selectedTeams={selectedTeams}
            onTeamSelect={handleTeamSelect}
            isLoading={isLoading}
          />

          <div className="lg:hidden absolute top-4 right-4 z-[400]">
            <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="bg-background/80 backdrop-blur-sm">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 p-0 z-[1000]">
                <SidebarContent />
              </SheetContent>
            </Sheet>
          </div>
        </div>

        <div className="hidden lg:block w-80 border-l border-border bg-card">
          <SidebarContent />
        </div>
      </div>

      {selectedTeams.length > 0 && (
        <StatsPanel
          selectedTeams={getSelectedTeamsData()}
          selectedTeamMatches={selectedTeams.map(teamId => ({
            teamId,
            matches: getTeamMatches(teamId)
          }))}
          compareMode={compareMode}
        />
      )}
    </div>
  );
}