"use client";

import dynamic from "next/dynamic";
import { TeamStats } from "@/types/matches";
import { Skeleton } from "@/components/ui/skeleton";

// Dynamically import the MapViewClient component with no SSR
const MapViewClient = dynamic(
  () => import("@/components/dashboard/MapViewClient"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    ),
  }
);

interface MapViewProps {
  teams: TeamStats[];
  selectedTeams: string[];
  onTeamSelect: (teamId: string) => void;
  isLoading: boolean;
}

export default function MapView({ teams, selectedTeams, onTeamSelect, isLoading }: MapViewProps) {
  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <MapViewClient
        teams={teams}
        selectedTeams={selectedTeams}
        onTeamSelect={onTeamSelect}
      />
    </div>
  );
}