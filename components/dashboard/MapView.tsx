"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { TeamStats } from "@/types/matches";
import { Icon } from "leaflet";
import { Skeleton } from "@/components/ui/skeleton";

interface MapViewProps {
  teams: TeamStats[];
  selectedTeams: string[];
  onTeamSelect: (teamId: string) => void;
  isLoading: boolean;
}

export default function MapView({ teams, onTeamSelect, isLoading }: MapViewProps) {

  // Use a proper SVG string and encode it to base64, ensuring color is injected correctly.
  const customIcon = (color: string) => {
    // Default color if not provided
    const fillColor = color || "#666666";
    // SVG string with fill color injected
    const svgString = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
        <path fill="${fillColor}" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
      </svg>
    `;
    // Encode SVG to base64
    const svgBase64 = btoa(unescape(encodeURIComponent(svgString)));
    return new Icon({
      iconUrl: `data:image/svg+xml;base64,${svgBase64}`,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  };

  const getVenueMatches = (venue: string) => {
    return teams
      .filter(team => team.homeGroundName === venue)
      .map(team => ({
        team,
        matches: team.matchesPlayed,
        wins: team.matchesWon,
        winRate: team.winRate
      }));
  };

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <Skeleton className="w-full h-full" />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <MapContainer
        center={[20.5937, 78.9629]} // Center of India
        zoom={5}
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {teams.map((team) => (
          <Marker
            key={team.id}
            position={[team.location.latitude, team.location.longitude]}
            icon={customIcon(team.color || '#666666')}
            eventHandlers={{
              click: () => {
                onTeamSelect(team.id);
              }
            }}
          >
            <Popup>
              <div className="p-2 leading-tight">
                <h3 className="font-bold text-lg">{team.name}</h3>
                <p className="text-sm text-muted-foreground">{team.homeGroundName}</p>
                <div className="leading-tight">
                  <p className="text-sm">Matches won: {team.matchesWon}/{team.matchesPlayed}</p>
                  <p className="text-sm">Win Rate: {team.winRate.toFixed(1)}%</p>
                  <p className="text-sm">Home Win Rate: {team.homeWinRate.toFixed(1)}%</p>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

    </div>
  );
}