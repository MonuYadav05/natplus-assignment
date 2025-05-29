import { useState } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  Circle,
  Trophy
} from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { TeamStats } from "@/types/matches";

interface SidebarProps {
  teams: TeamStats[];
  selectedTeams: string[];
  onTeamSelect: (teamId: string) => void;
  compareMode: boolean;
  isLoading: boolean;
}

export default function Sidebar({
  teams,
  selectedTeams,
  onTeamSelect,
  compareMode,
  isLoading
}: SidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredTeams = teams.filter(team => {
    const matchesSearch = team.name.toLowerCase().includes(searchQuery.toLowerCase());

    if (filter === "all") return matchesSearch;
    if (filter === "active") return matchesSearch && team.matchesPlayed > 0;
    if (filter === "inactive") return matchesSearch && team.matchesPlayed === 0;

    return matchesSearch;
  });

  // Sort teams by win rate (descending)
  filteredTeams.sort((a, b) => b.winRate - a.winRate);

  return (
    <div className="flex flex-col h-full z-[1000] bg-background">
      <div className="p-4 border-b border-border">
        <h2 className="font-semibold text-lg mb-4">IPL Teams</h2>

        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select
              value={filter}
              onValueChange={setFilter}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filter teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                <SelectItem value="active">Active Teams</SelectItem>
                <SelectItem value="inactive">Inactive Teams</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="p-2">
            {isLoading ? (
              // Loading skeletons
              <div className="space-y-2">
                {Array(8).fill(0).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 p-2">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-1.5">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredTeams.length === 0 ? (
              <div className="p-4 text-center text-muted-foreground">
                No teams found matching your criteria
              </div>
            ) : (
              <div className="space-y-1">
                {filteredTeams.map((team) => (
                  <TeamListItem
                    key={team.id}
                    team={team}
                    isSelected={selectedTeams.includes(team.id)}
                    onSelect={() => onTeamSelect(team.id)}
                    compareMode={compareMode}
                  />
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {compareMode && selectedTeams.length > 0 && (
        <div className="p-3 border-t border-border bg-muted/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="h-4 w-4 text-chart-1" />
              <span className="text-sm font-medium">Teams Selected: {selectedTeams.length}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface TeamListItemProps {
  team: TeamStats;
  isSelected: boolean;
  onSelect: () => void;
  compareMode: boolean;
}

function TeamListItem({
  team,
  isSelected,
  onSelect,
  compareMode
}: TeamListItemProps) {
  return (
    <div
      onClick={onSelect}
      className={cn(
        "flex items-center gap-3 p-3 rounded-md cursor-pointer transition-colors",
        isSelected
          ? "bg-primary/10 hover:bg-primary/15"
          : "hover:bg-muted"
      )}
    >
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold"
        style={{ backgroundColor: team.color || "hsl(var(--muted))" }}
      >
        {team.shortName || team.name.substring(0, 2)}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium truncate">{team.name}</h3>
            <p className="text-xs text-muted-foreground">
              {team.matchesPlayed > 0 ? "Active" : "Inactive"} • {team.homeCityName}
            </p>
          </div>

          {compareMode ? (
            isSelected ? (
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
            ) : (
              <Circle className="h-5 w-5 text-muted-foreground flex-shrink-0" />
            )
          ) : (
            isSelected && (
              <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
            )
          )}
        </div>
      </div>
    </div>
  );
}