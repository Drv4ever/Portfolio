import * as React from "react";
import { GithubHeatmapClient } from "./GithubHeatmapClient";

interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface ContributionCalendar {
  totalContributions: number;
  weeks: ContributionWeek[];
}

export async function getGithubContributions(): Promise<ContributionCalendar | null> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return null;
  }

  const query = `
    query($userName: String!) {
      user(login: $userName) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "Drv4ever-Portfolio",
      },
      body: JSON.stringify({
        query,
        variables: { userName: "Drv4ever" },
      }),
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return null;
    }

    const data = await res.json();
    return data?.data?.user?.contributionsCollection?.contributionCalendar ?? null;
  } catch (e) {
    return null;
  }
}

export async function GithubHeatmap() {
  const calendar = await getGithubContributions();

  if (!calendar) {
    // Graceful degradation when token is missing or network fails
    return null;
  }

  return <GithubHeatmapClient calendar={calendar} />;
}
