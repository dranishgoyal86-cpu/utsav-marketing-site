// Wave 5 — mirrors lib/inviteThemes.js on the app side (same values, same
// reasoning: one small lookup object, two real entries, not a database
// table or an extensible engine). Colours copied directly from each
// design's reviewed reference (Toran: utsav-animated-invites.html;
// Kalamkari: utsav-invite-design-system.html), not re-derived.
export type InviteTheme = {
  colors: {
    bg: string;
    ink: string;
    dateColor?: string;
    dim: string;
    line: string;
    accent?: string;
    soft?: string;
    body?: string;
  };
  motif?: "arch" | "bloom" | "minimal";
  connector?: string;
  kicker: string;
  motion?: boolean;
  layout?: "single-card";
};

// Wave 9 — Night Bloom is NOT a whole-invite design and has no entry here.
// It styles one function's expanded card only (event_functions.template_id),
// looked up separately in NightBloomCard.tsx — it never competes with an
// event's overall design the way toran/kalamkari/stillness/ivory do.

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
  // Wave 6 — a different page, not a third palette. No motif/connector:
  // no arch, no bloom, no "weds"/"&" text at all. motion:false and
  // layout:'single-card' are read explicitly by page.tsx to skip the
  // Unveil/Drift/multi-pane rendering path entirely for this design.
  stillness: {
    colors: {
      bg: "#EFEDEA",
      ink: "#22201D",
      dim: "#6B655E",
      line: "#8C867E",
      soft: "#C9C3BA",
      body: "#4A453F",
    },
    motion: false,
    layout: "single-card",
    kicker: "IN LOVING MEMORY",
  },
  // Wave 8 — a second neutral, non-Hindu-coded option alongside Kalamkari.
  // No tradition-specific symbols, same discipline as Kalamkari. kicker
  // here is the DEFAULT only — event_invite_content.kicker_text (new,
  // Wave 8) overrides it when a host sets one; the mockup's literal
  // "SAVE THE DATE" doesn't fit every wedding, so "YOU'RE INVITED" ships
  // as the real default instead.
  ivory: {
    colors: {
      bg: "#FAF7F2",
      ink: "#1C1A17",
      accent: "#E8A020",
      line: "#DED6CB",
      dim: "#8A8078",
      dateColor: "#4A443E",
    },
    motif: "minimal",
    connector: "and",
    kicker: "YOU'RE INVITED",
  },
};

export const DEFAULT_DESIGN = "toran";

export function resolveTheme(design: string | null | undefined): InviteTheme {
  return (design && inviteThemes[design]) || inviteThemes[DEFAULT_DESIGN];
}
