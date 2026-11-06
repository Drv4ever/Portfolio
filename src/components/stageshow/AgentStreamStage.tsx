"use client";

import * as React from "react";
import { StageshowChrome } from "./StageshowChrome";
import { Terminal, Cpu, CheckCircle2, ShieldAlert } from "lucide-react";

interface AgentStreamStageProps {
  type?: "mcp" | "tcras" | "vaultify";
  className?: string;
}

export function AgentStreamStage({
  type = "mcp",
  className = "",
}: AgentStreamStageProps) {
  return (
    <StageshowChrome
      url={
        type === "mcp"
          ? "mcp://mongodb/tools/execute"
          : type === "tcras"
          ? "tcras://model/anomaly-detector"
          : "vaultify://crypto/aes-256"
      }
      statusBadge={type === "mcp" ? "MCP Protocol" : type === "tcras" ? "ML Isolation" : "Zero Knowledge"}
      className={className}
    >
      <div className="bg-background/95 text-foreground flex flex-col font-mono text-xs select-none">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-border/40 bg-secondary/30 px-3 py-1.5 text-[10px]">
          <div className="flex items-center gap-1.5 font-bold text-orange-500">
            {type === "mcp" ? (
              <Terminal className="h-3 w-3" />
            ) : type === "tcras" ? (
              <ShieldAlert className="h-3 w-3" />
            ) : (
              <Cpu className="h-3 w-3" />
            )}
            <span>
              {type === "mcp"
                ? "Autonomous Agent Stream"
                : type === "tcras"
                ? "Risk Amplification Engine"
                : "AES-256 Secure Vault"}
            </span>
          </div>

          <span className="text-[9px] text-muted-foreground border border-border/50 px-1.5 py-0.2 rounded">
            {type === "mcp" ? "Stdio / SSE" : type === "tcras" ? "FastAPI Core" : "PBKDF2 SHA-256"}
          </span>
        </div>

        {/* Stream Timeline */}
        <div className="p-3 sm:p-4 space-y-2 text-[10px]">
          {type === "mcp" && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-orange-500 font-bold">
                <CheckCircle2 className="h-3 w-3" />
                <span>tools/call: infer_schema(collection: &quot;orders&quot;)</span>
              </div>
              <div className="rounded bg-secondary/40 border border-border/50 p-2 text-[9px] text-zinc-300">
                <span className="text-zinc-500">{"// Zod validated schema returned:"}</span>
                <div className="text-amber-400 font-semibold">{`{ orderId: UUID, customer: String, total: Float, status: "PAID" }`}</div>
              </div>
              <div className="flex items-center justify-between text-[9px] text-muted-foreground pt-0.5">
                <span>Execution: 14.8ms</span>
                <span className="text-orange-500 font-bold">Read-Only Enforced</span>
              </div>
            </div>
          )}

          {type === "tcras" && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-orange-500 font-bold">
                <CheckCircle2 className="h-3 w-3" />
                <span>Isolation Forest Evaluation: Node Chain</span>
              </div>
              <div className="rounded bg-secondary/40 border border-border/50 p-2 text-[9px] text-zinc-300">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-zinc-400">Calculated Anomaly Score:</span>
                  <span className="text-amber-400 font-bold">0.12 [Normal Flow]</span>
                </div>
                <div className="text-zinc-500 text-[8px] truncate">
                  SHA-256 integrity match • Transfer sequence validated across SQLite graph
                </div>
              </div>
              <div className="flex items-center justify-between text-[9px] text-muted-foreground pt-0.5">
                <span>Evaluation Latency: 9.2ms</span>
                <span className="text-orange-500 font-bold">99.2% Accuracy</span>
              </div>
            </div>
          )}

          {type === "vaultify" && (
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-orange-500 font-bold">
                <CheckCircle2 className="h-3 w-3" />
                <span>Zero-Knowledge Encryption Pipeline</span>
              </div>
              <div className="rounded bg-secondary/40 border border-border/50 p-2 text-[9px] text-zinc-300 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Cipher:</span>
                  <span className="text-amber-400 font-bold">AES-256-GCM + IV</span>
                </div>
                <div className="text-zinc-500 text-[8px] truncate">
                  Key derived on client via PBKDF2 with 100,000 rounds. Server never sees master key.
                </div>
              </div>
              <div className="flex items-center justify-between text-[9px] text-muted-foreground pt-0.5">
                <span>Auth: Stateless JWT</span>
                <span className="text-orange-500 font-bold">Client-Side Decrypted</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </StageshowChrome>
  );
}
