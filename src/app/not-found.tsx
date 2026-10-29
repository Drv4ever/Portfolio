import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-background text-foreground">
      <span className="font-mono text-sm uppercase tracking-widest text-emerald-500 pb-2">
        404 — Page Not Found
      </span>
      <h1 className="font-serif text-4xl sm:text-5xl font-medium tracking-tight">
        The requested page does not exist.
      </h1>
      <p className="mt-4 max-w-md text-sm text-muted-foreground">
        The link may be outdated or the route has been moved. You can return to the portfolio home page.
      </p>
      <div className="mt-8">
        <Button asChild className="rounded-full gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Portfolio</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
