"use client";

import { incrementVisit } from "@/lib/analytics";
import { useEffect, useState } from "react";

export default function Footer() {
  const [visits, setVisits] = useState<number | null>(null);
  const [localFallback, setLocalFallback] = useState(false);

  useEffect(() => {
    let mounted = true;
    const hit = async () => {
      const value = await incrementVisit();
      if (!mounted) return;
      if (typeof value === "number") {
        setVisits(value);
        setLocalFallback(false);
      } else {
        try {
          const key = "portfolio_local_visits";
          const prev = parseInt(localStorage.getItem(key) ?? "0", 10) || 0;
          const next = prev + 1;
          localStorage.setItem(key, String(next));
          setVisits(next);
          setLocalFallback(true);
        } catch (e) {
          setVisits(null);
          setLocalFallback(false);
        }
      }
    };

    hit();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <footer
      id="footer"
      className="border-t border-border-light py-6 text-center text-xs uppercase tracking-editorial text-neutral-600 dark:border-border-dark dark:text-neutral-400"
    >
      <div>© {new Date().getFullYear()} Dhruv Jain. All rights reserved.</div>
      {visits !== null && (
        <div className="mt-2 text-[11px] text-neutral-500 dark:text-neutral-400">
          <span
            title={
              localFallback
                ? "CountAPI unreachable — showing local visit count"
                : "Global visit count from CountAPI"
            }
          >
            • {new Intl.NumberFormat().format(visits)} visits
            {localFallback ? " (local)" : ""}
          </span>
        </div>
      )}
    </footer>
  );
}
