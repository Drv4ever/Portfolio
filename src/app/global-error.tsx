"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("Root global error captured:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-black text-white font-sans">
        <h1 className="text-3xl font-bold tracking-tight pb-2">
          Critical System Failure
        </h1>
        <p className="max-w-md text-sm text-neutral-400 pb-6">
          A critical rendering fault occurred at the application boundary.
        </p>
        <Button onClick={() => reset()} className="rounded-full">
          Reload Application
        </Button>
      </body>
    </html>
  );
}
