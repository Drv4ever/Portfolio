/**
 * Centralized motion language tokens and animation primitives.
 * Respects prefers-reduced-motion and standardizes all UI animations.
 */

export const MOTION_DURATIONS = {
  instant: 0,
  micro: 0.12,
  fast: 0.2,
  normal: 0.35,
  deliberate: 0.55,
  cinematic: 0.75,
} as const;

export const MOTION_EASINGS = {
  easeOutEditorial: [0.16, 1, 0.3, 1] as const,
  easeInOutCubic: [0.65, 0, 0.35, 1] as const,
  easeOutBack: [0.34, 1.56, 0.64, 1] as const,
} as const;

export const MOTION_SPRINGS = {
  snappy: { type: "spring", stiffness: 350, damping: 30 } as const,
  gentle: { type: "spring", stiffness: 180, damping: 24 } as const,
} as const;

export const MOTION_STAGGER = {
  fast: 0.03,
  normal: 0.05,
  cards: 0.07,
} as const;

export const fadeInVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.normal,
      ease: MOTION_EASINGS.easeOutEditorial,
    },
  },
};

export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.08 },
  },
};

export function getSafeVariants(isReducedMotion: boolean) {
  return isReducedMotion ? reducedMotionVariants : fadeInVariants;
}
