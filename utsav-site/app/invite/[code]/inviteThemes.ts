// Wave 5 — mirrors lib/inviteThemes.js on the app side (same values, same
// reasoning: one small lookup object, two real entries, not a database
// table or an extensible engine). Colours copied directly from each
// design's reviewed reference (Toran: utsav-animated-invites.html;
// Kalamkari: utsav-invite-design-system.html), not re-derived.
export type InviteTheme = {
  colors: {
    bg: string;
    ink: string;
    dateColor: string;
    dim: string;
    line: string;
    accent: string;
  };
  motif: "arch" | "bloom";
  connector: string;
  kicker: string;
};

export const inviteThemes: Record<string, InviteTheme> = {
  toran: {
    colors: {
      bg: "#4A0E1E",
      ink: "#FFF3DC",
      dateColor: "#F0DFC2",
      dim: "#C79A5A",
      line: "#D4A03C",
      accent: "#D4A03C",
    },
    motif: "arch",
    connector: "weds",
    kicker: "श्री गणेशाय नमः",
  },
  kalamkari: {
    colors: {
      bg: "#F2E9D8",
      ink: "#12294D",
      dateColor: "#3C4E68",
      dim: "#6B7787",
      line: "#1B3A6B",
      accent: "#A8324A",
    },
    motif: "bloom",
    connector: "&",
    kicker: "TOGETHER WITH THEIR FAMILIES",
  },
};

export const DEFAULT_DESIGN = "toran";

export function resolveTheme(design: string | null | undefined): InviteTheme {
  return (design && inviteThemes[design]) || inviteThemes[DEFAULT_DESIGN];
}
