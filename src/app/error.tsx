"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    // Log unexpected runtime errors gracefully
    console.error("Client runtime error captured:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background text-foreground">
      <span className="font-mono text-sm uppercase tracking-widest text-destructive pb-2">
        Application Error
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight">
        Something unexpected occurred.
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        An unhandled exception was caught. You can retry the operation or return to the home screen.
      </p>
      <div className="mt-8 flex items-center gap-3">
        <Button onClick={() => reset()} className="rounded-full gap-2">
          <RefreshCw className="h-4 w-4" />
          <span>Try Again</span>
        </Button>
        <Button asChild variant="outline" className="rounded-full gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
