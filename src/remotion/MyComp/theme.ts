export const c = {
  deepest: "#0b1914",
  deep: "#162b22",
  deepAlt: "#1e352c",
  teal: "#1a8a74",
  tealLight: "#35ad95",
  sage: "#ccddd4",
  sageDeep: "#6d8579",
  pearl: "#f8f5ef",
  stone: "#eeebe3",
  white: "#ffffff",
  ink: "#0f1a15",
  muted: "#6d8579",
  gold: "#c49a5c",
  goldLight: "#dbb878",
} as const;

export type Theme = "dark" | "light" | "pearl";

export const themeStyles: Record<
  Theme,
  { bg: string; fg: string; muted: string; accent: string }
> = {
  dark: {
    bg: c.deepest,
    fg: c.white,
    muted: "rgba(255,255,255,0.5)",
    accent: c.teal,
  },
  light: {
    bg: c.stone,
    fg: c.ink,
    muted: c.sageDeep,
    accent: c.teal,
  },
  pearl: {
    bg: c.pearl,
    fg: c.ink,
    muted: c.sageDeep,
    accent: c.gold,
  },
};

export const ease = [0.16, 1, 0.3, 1] as const;
