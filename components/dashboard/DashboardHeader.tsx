import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { GitCompareIcon as CompareIcon, Trophy } from "lucide-react";

interface DashboardHeaderProps {
  compareMode: boolean;
  onCompareToggle: () => void;
}

export default function DashboardHeader({
  compareMode,
  onCompareToggle
}: DashboardHeaderProps) {
  return (
    <header className="border-b border-border bg-card p-2 sticky top-0 z-[1000]">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <Trophy className="h-6 w-6 text-chart-1" />
          <h1 className="text-xl font-bold">IPL Insights</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={compareMode ? "default" : "outline"}
            size="sm"
            onClick={onCompareToggle}
            className="gap-2"
          >
            <CompareIcon className="h-4 w-4" />
            <span className="hidden sm:inline">
              {compareMode ? "Comparing Teams" : "Compare Teams"}
            </span>
          </Button>
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}