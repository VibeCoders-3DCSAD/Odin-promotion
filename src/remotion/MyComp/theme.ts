// Budgie V5 palette. Key names predate the rebrand; the values are Budgie's.
export const c = {
  deepest: "#013220",
  deep: "#004d1b",
  deepAlt: "#004d1b",
  teal: "#004d1b",
  tealLight: "#41eda4",
  sage: "#dbd7cd",
  sageDeep: "#414942",
  pearl: "#efebe3",
  stone: "#e9f6ef",
  white: "#ffffff",
  ink: "#1b1c1a",
  muted: "#414942",
  gold: "#722c00",
  goldLight: "#fdf3e7",
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
