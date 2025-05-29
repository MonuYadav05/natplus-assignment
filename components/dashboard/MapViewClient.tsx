"use client";

import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { TeamStats } from "@/types/matches";

interface MapViewClientProps {
  teams: TeamStats[];
  selectedTeams: string[];
  onTeamSelect: (teamId: string) => void;
}

export default function MapViewClient({
  teams,
  selectedTeams,
  onTeamSelect
}: MapViewClientProps) {
  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    });
  }, []);

  return (
    <MapContainer
      center={[20.5937, 78.9629]} // Center of India
      zoom={5}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {teams.map((team) => {
        if (team.location && team.location.latitude && team.location.longitude) {
          const isSelected = selectedTeams.includes(team.id);

          return (
            <Marker
              key={team.id}
              position={[team.location.latitude, team.location.longitude]}
              eventHandlers={{
                click: () => onTeamSelect(team.id),
              }}
              icon={L.divIcon({
                className: 'custom-div-icon',
                html: `
                  <div class="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-transform duration-200 
                  ${isSelected
                    ? 'bg-primary text-primary-foreground shadow-lg scale-125'
                    : 'bg-secondary text-secondary-foreground hover:scale-110'}"
                  style="${team.color ? `background-color: ${team.color}; color: white;` : ''}">
                    <span class="font-bold text-xs">${team.shortName || team.name.substring(0, 3)}</span>
                  </div>
                `,
                iconSize: [48, 48],
                iconAnchor: [24, 48],
              })}
            >
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold">{team.name}</h3>
                  <p className="text-sm">{team.homeCityName}</p>
                  <p className="text-sm">{team.homeGroundName}</p>
                </div>
              </Popup>
            </Marker>
          );
        }
        return null;
      })}
    </MapContainer>
  );
}