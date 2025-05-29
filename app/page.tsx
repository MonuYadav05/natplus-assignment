"use client";

import { useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import Dashboard from "@/components/dashboard/Dashboard";
import LoadingScreen from "@/components/ui/loading-screen";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);



  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <main className="min-h-screen">
          <Dashboard />
        </main>
      )}
      <Toaster />
    </ThemeProvider>
  );
}