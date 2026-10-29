"use client";

import * as React from "react";
import { Project } from "@/content/schema";

interface DiagramProps {
  project: Project;
}

export function ProjectArchitectureDiagram({ project }: DiagramProps) {
  // SVG Architecture Schematics based strictly on project descriptions
  if (project.id === "mongo-mcp") {
    return (
      <div className="rounded-xl border border-border/70 bg-card/90 p-4 sm:p-6" aria-label="MongoDB MCP Server Architecture">
        <div className="text-xs font-mono font-semibold text-emerald-500 uppercase tracking-wider pb-4">
          Verified Architecture: AI Client → MCP Server → MongoDB
        </div>
        <svg viewBox="0 0 680 180" className="w-full h-auto text-foreground font-mono text-[11px]">
          <defs>
            <marker id="arrow-emerald" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#10b981" />
            </marker>
          </defs>

          {/* Node 1: AI Client */}
          <rect x="20" y="50" width="140" height="70" rx="8" className="fill-secondary stroke-border stroke-[1.5]" />
          <text x="90" y="80" textAnchor="middle" className="fill-foreground font-semibold">AI Client</text>
          <text x="90" y="98" textAnchor="middle" className="fill-muted-foreground text-[9px]">LLM / Cursor / Claude</text>

          {/* Arrow 1 */}
          <path d="M 160 85 L 245 85" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow-emerald)" />
          <text x="202" y="75" textAnchor="middle" className="fill-muted-foreground text-[8px]">MCP Protocol</text>

          {/* Node 2: MCP Server (Zod Validated, Read-Only Guard) */}
          <rect x="250" y="35" width="190" height="100" rx="8" className="fill-secondary stroke-emerald-500 stroke-2" />
          <text x="345" y="62" textAnchor="middle" className="fill-emerald-500 font-bold">TypeScript MCP Server</text>
          <text x="345" y="82" textAnchor="middle" className="fill-foreground text-[10px]">Zod Request Validation</text>
          <text x="345" y="100" textAnchor="middle" className="fill-muted-foreground text-[9px]">Read-Only Security Guard</text>
          <text x="345" y="118" textAnchor="middle" className="fill-emerald-400 text-[9px]">Controlled Queries Only</text>

          {/* Arrow 2 */}
          <path d="M 440 85 L 505 85" stroke="#10b981" strokeWidth="2" strokeDasharray="4 2" markerEnd="url(#arrow-emerald)" />
          <text x="472" y="75" textAnchor="middle" className="fill-muted-foreground text-[8px]">Read Query</text>

          {/* Node 3: MongoDB */}
          <rect x="510" y="45" width="150" height="80" rx="8" className="fill-secondary stroke-border stroke-[1.5]" />
          <text x="585" y="75" textAnchor="middle" className="fill-foreground font-semibold">MongoDB</text>
          <text x="585" y="93" textAnchor="middle" className="fill-muted-foreground text-[9px]">Schema Inference</text>
          <text x="585" y="108" textAnchor="middle" className="fill-muted-foreground text-[9px]">Collection Discovery</text>
        </svg>
      </div>
    );
  }

  if (project.id === "parcel-locker") {
    return (
      <div className="rounded-xl border border-border/70 bg-card/90 p-4 sm:p-6" aria-label="Digital Parcel Locker Architecture">
        <div className="text-xs font-mono font-semibold text-emerald-500 uppercase tracking-wider pb-4">
          Verified Architecture: EC2 Dashboard → S3 & Core Lambda → DynamoDB + AWS Bus
        </div>
        <svg viewBox="0 0 680 230" className="w-full h-auto text-foreground font-mono text-[11px]">
          <defs>
            <marker id="arrow-indigo" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#6366f1" />
            </marker>
          </defs>

          {/* EC2 Warden Dashboard */}
          <rect x="20" y="30" width="160" height="90" rx="8" className="fill-secondary stroke-border stroke-[1.5]" />
          <text x="100" y="55" textAnchor="middle" className="fill-foreground font-semibold">Warden Dashboard</text>
          <text x="100" y="73" textAnchor="middle" className="fill-indigo-400 text-[10px]">Node.js & Express on EC2</text>
          <text x="100" y="90" textAnchor="middle" className="fill-muted-foreground text-[9px]">Parcel Photo Upload</text>
          <text x="100" y="105" textAnchor="middle" className="fill-muted-foreground text-[9px]">Pickup Code Scanning</text>

          {/* S3 Storage */}
          <rect x="230" y="20" width="130" height="50" rx="8" className="fill-secondary stroke-border stroke-[1.5]" />
          <text x="295" y="45" textAnchor="middle" className="fill-foreground font-semibold">Amazon S3</text>
          <text x="295" y="60" textAnchor="middle" className="fill-muted-foreground text-[9px]">Photo Storage</text>

          {/* Core Lambda */}
          <rect x="230" y="95" width="130" height="65" rx="8" className="fill-secondary stroke-indigo-500 stroke-2" />
          <text x="295" y="122" textAnchor="middle" className="fill-indigo-400 font-bold">Core Lambda</text>
          <text x="295" y="140" textAnchor="middle" className="fill-foreground text-[9px]">Business Logic</text>

          {/* DynamoDB */}
          <rect x="420" y="35" width="130" height="65" rx="8" className="fill-secondary stroke-border stroke-[1.5]" />
          <text x="485" y="62" textAnchor="middle" className="fill-foreground font-semibold">DynamoDB</text>
          <text x="485" y="80" textAnchor="middle" className="fill-emerald-400 text-[9px]">Live Parcel Status</text>

          {/* Event Bus & Alarms */}
          <rect x="420" y="125" width="240" height="85" rx="8" className="fill-secondary stroke-border stroke-[1.5]" />
          <text x="540" y="148" textAnchor="middle" className="fill-foreground font-semibold">AWS Event Bus & Auditing</text>
          <text x="540" y="168" textAnchor="middle" className="fill-muted-foreground text-[9px]">SNS Fan-out • SQS DLQ Alarms</text>
          <text x="540" y="188" textAnchor="middle" className="fill-muted-foreground text-[9px]">EventBridge Scheduled State Auditing</text>

          {/* Connectors */}
          <path d="M 180 55 L 225 45" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />
          <path d="M 180 95 L 225 115" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />
          <path d="M 360 115 L 415 75" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />
          <path d="M 360 135 L 415 155" stroke="#6366f1" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />
        </svg>
      </div>
    );
  }

  if (project.id === "tcras") {
    return (
      <div className="rounded-xl border border-border/70 bg-card/90 p-4 sm:p-6" aria-label="TCRAS Risk Architecture">
        <div className="text-xs font-mono font-semibold text-emerald-500 uppercase tracking-wider pb-4">
          Verified Architecture: React → Node APIs → FastAPI → Isolation Forest → SQLite
        </div>
        <svg viewBox="0 0 680 180" className="w-full h-auto text-foreground font-mono text-[11px]">
          <defs>
            <marker id="arrow-sky" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 8 5 L 0 9 z" fill="#38bdf8" />
            </marker>
          </defs>

          {/* React */}
          <rect x="15" y="55" width="100" height="60" rx="8" className="fill-secondary stroke-border stroke-[1.5]" />
          <text x="65" y="85" textAnchor="middle" className="fill-foreground font-semibold">React</text>
          <text x="65" y="100" textAnchor="middle" className="fill-muted-foreground text-[9px]">Frontend</text>

          {/* Node */}
          <rect x="145" y="55" width="115" height="60" rx="8" className="fill-secondary stroke-border stroke-[1.5]" />
          <text x="202" y="80" textAnchor="middle" className="fill-foreground font-semibold">Node.js</text>
          <text x="202" y="98" textAnchor="middle" className="fill-muted-foreground text-[9px]">Transfer APIs</text>

          {/* FastAPI */}
          <rect x="290" y="55" width="115" height="60" rx="8" className="fill-secondary stroke-sky-400 stroke-2" />
          <text x="347" y="80" textAnchor="middle" className="fill-sky-400 font-bold">FastAPI</text>
          <text x="347" y="98" textAnchor="middle" className="fill-foreground text-[9px]">Risk Engine</text>

          {/* Isolation Forest */}
          <rect x="435" y="50" width="125" height="70" rx="8" className="fill-secondary stroke-border stroke-[1.5]" />
          <text x="497" y="78" textAnchor="middle" className="fill-foreground font-semibold">Isolation Forest</text>
          <text x="497" y="96" textAnchor="middle" className="fill-emerald-400 text-[9px]">Anomaly Scoring</text>
          <text x="497" y="108" textAnchor="middle" className="fill-muted-foreground text-[8px]">pandas & NumPy</text>

          {/* SQLite */}
          <rect x="585" y="55" width="85" height="60" rx="8" className="fill-secondary stroke-border stroke-[1.5]" />
          <text x="627" y="85" textAnchor="middle" className="fill-foreground font-semibold">SQLite</text>
          <text x="627" y="100" textAnchor="middle" className="fill-muted-foreground text-[9px]">Storage</text>

          {/* Arrows */}
          <path d="M 115 85 L 140 85" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-sky)" />
          <path d="M 260 85 L 285 85" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-sky)" />
          <path d="M 405 85 L 430 85" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-sky)" />
          <path d="M 560 85 L 580 85" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow-sky)" />
        </svg>
      </div>
    );
  }

  return null;
}
