import { Loader2 } from "lucide-react";

export default function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h2 className="text-2xl font-semibold text-foreground">
          Loading IPL Insights
        </h2>
        <p className="text-muted-foreground">
          Preparing your cricket analytics experience...
        </p>
      </div>
    </div>
  );
}