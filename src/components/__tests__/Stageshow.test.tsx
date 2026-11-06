import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { StageshowChrome } from "../stageshow/StageshowChrome";
import { SlideOSStage } from "../stageshow/SlideOSStage";
import { CloudConsoleStage } from "../stageshow/CloudConsoleStage";
import { AgentStreamStage } from "../stageshow/AgentStreamStage";

describe("StageshowChrome Component", () => {
  it("renders with default props and handles showControls false", () => {
    const { rerender } = render(
      <StageshowChrome>
        <div>Content Inside</div>
      </StageshowChrome>
    );

    expect(screen.getByText("app.internal")).toBeInTheDocument();
    expect(screen.getByText("LIVE")).toBeInTheDocument();
    expect(screen.getByText("Content Inside")).toBeInTheDocument();

    rerender(
      <StageshowChrome url="custom.domain" statusBadge="BETA" showControls={false}>
        <div>No Controls Content</div>
      </StageshowChrome>
    );
    expect(screen.getByText("custom.domain")).toBeInTheDocument();
    expect(screen.getByText("BETA")).toBeInTheDocument();
  });
});

describe("SlideOSStage Component", () => {
  it("renders slide deck and allows interactive slide tab switching", () => {
    render(<SlideOSStage />);

    expect(screen.getByText("slide-os.vercel.app/editor")).toBeInTheDocument();
    expect(screen.getAllByText("Autonomous Agent Orchestration").length).toBeGreaterThanOrEqual(1);

    // Click on slide 2
    const slide2Btn = screen.getByRole("button", { name: /Dynamic Presentation Engine/i });
    fireEvent.click(slide2Btn);

    expect(screen.getByText("Slide 2 of 3")).toBeInTheDocument();
    expect(screen.getByText("12 handcrafted visual design styles & palettes")).toBeInTheDocument();

    // Click on slide 3
    const slide3Btn = screen.getByRole("button", { name: /Fault-Tolerant State & Sync/i });
    fireEvent.click(slide3Btn);

    expect(screen.getByText("Slide 3 of 3")).toBeInTheDocument();
    expect(screen.getByText("Optimistic canvas updates with microtask queuing")).toBeInTheDocument();
  });
});

describe("CloudConsoleStage Component", () => {
  it("renders cloud services and switches to telemetry tab", () => {
    render(<CloudConsoleStage />);

    expect(screen.getByText("15.207.54.197:443/health")).toBeInTheDocument();
    expect(screen.getByText("Nginx + SSL")).toBeInTheDocument();
    expect(screen.getByText("AWS S3 + SSE")).toBeInTheDocument();

    // Switch to telemetry
    const telemetryBtn = screen.getByRole("button", { name: "Telemetry" });
    fireEvent.click(telemetryBtn);

    expect(screen.getByText(/GET \/api\/v1\/health HTTP\/1.1/)).toBeInTheDocument();
    expect(screen.getByText(/SSL handshake completed/)).toBeInTheDocument();

    // Switch back to services
    const servicesBtn = screen.getByRole("button", { name: "Services" });
    fireEvent.click(servicesBtn);
    expect(screen.getByText("Nginx + SSL")).toBeInTheDocument();
  });
});

describe("AgentStreamStage Component", () => {
  it("renders MCP, TCRAS, and Vaultify variants correctly", () => {
    const { rerender } = render(<AgentStreamStage type="mcp" />);
    expect(screen.getByText("Autonomous Agent Stream")).toBeInTheDocument();
    expect(screen.getByText(/infer_schema/)).toBeInTheDocument();

    rerender(<AgentStreamStage type="tcras" />);
    expect(screen.getByText("Risk Amplification Engine")).toBeInTheDocument();
    expect(screen.getByText(/Isolation Forest Evaluation/)).toBeInTheDocument();

    rerender(<AgentStreamStage type="vaultify" />);
    expect(screen.getByText("AES-256 Secure Vault")).toBeInTheDocument();
    expect(screen.getByText(/Zero-Knowledge Encryption Pipeline/)).toBeInTheDocument();
  });
});
