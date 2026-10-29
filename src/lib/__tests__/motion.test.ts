import { describe, it, expect } from "vitest";
import { cn } from "../utils";
import {
  MOTION_DURATIONS,
  MOTION_EASINGS,
  MOTION_SPRINGS,
  MOTION_STAGGER,
  fadeInVariants,
  reducedMotionVariants,
  getSafeVariants,
} from "../motion";

describe("lib/utils", () => {
  it("merges classes cleanly and resolves conflicts", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
    expect(cn("px-2", false && "hidden", null, undefined, "px-4")).toBe("px-4");
    expect(cn({ "bg-red-500": true, "text-white": false })).toBe("bg-red-500");
  });
});

describe("lib/motion", () => {
  it("exports correct duration tokens", () => {
    expect(MOTION_DURATIONS.instant).toBe(0);
    expect(MOTION_DURATIONS.fast).toBe(0.2);
    expect(MOTION_DURATIONS.normal).toBe(0.35);
    expect(MOTION_DURATIONS.deliberate).toBe(0.55);
    expect(MOTION_DURATIONS.cinematic).toBe(0.75);
  });

  it("exports valid easing curves", () => {
    expect(MOTION_EASINGS.easeOutEditorial).toHaveLength(4);
    expect(MOTION_EASINGS.easeInOutCubic).toHaveLength(4);
    expect(MOTION_EASINGS.easeOutBack).toHaveLength(4);
  });

  it("exports spring physics presets", () => {
    expect(MOTION_SPRINGS.snappy.stiffness).toBe(350);
    expect(MOTION_SPRINGS.gentle.damping).toBe(24);
  });

  it("exports stagger presets", () => {
    expect(MOTION_STAGGER.fast).toBeLessThan(MOTION_STAGGER.normal);
    expect(MOTION_STAGGER.normal).toBeLessThan(MOTION_STAGGER.cards);
  });

  it("returns appropriate variants based on reduced-motion preference", () => {
    expect(getSafeVariants(true)).toEqual(reducedMotionVariants);
    expect(getSafeVariants(false)).toEqual(fadeInVariants);
  });
});
