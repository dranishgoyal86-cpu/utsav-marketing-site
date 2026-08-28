import styles from "./invite.module.css";
import { inviteThemes } from "./inviteThemes";

// Wave 10 — the first design that isn't for a wedding: housewarmings,
// pujas, festivals. No couple, no connector — see the reference's own
// "Diya doesn't have a couple" note. Reuses the existing whole-event
// theme system exactly as Kalamkari/Ivory did (no new mechanism).
//
// Flame amber (#E8A020) and diya-bowl brown (#B5542A) stay literal here,
// same "decorative extras, not part of the 6-token theme shape" precedent
// Toran's own petal fill already set — theme.colors.accent carries the
// rangoli/kicker red instead.

const theme = inviteThemes.diya;
const FLAME_AMBER = "#E8A020";
const DIYA_BROWN = "#B5542A";
const LAMP_X = [104, 152, 200, 248, 296];

function formatEventDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }).toUpperCase();
}

export default function DiyaCover({
  eventName,
  eventDate,
  venue,
  hostedBy,
  kickerText,
  headlineText,
}: {
  eventName: string;
  eventDate: string | null;
  venue: string | null;
  hostedBy?: string | null;
  kickerText?: string | null;
  headlineText?: string | null;
}) {
  // Neither field ships a fixed occasion-specific default (no "GRIHA
  // PRAVESH", no "Our new beginning") — both fall back to the event's own
  // real name, exactly like every other design's "no hardcoded copy" rule.
  // Independently overridable so a host CAN differentiate them, same
  // kicker_text/headline_text mechanism Ivory and Night Bloom established.
  const kicker = (kickerText || eventName || "").toUpperCase();
  const headline = headlineText || eventName;

  return (
    <div className={styles.stage} data-motion="unveil" data-run="1">
      <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="dyGlow" cx="50%" cy="92%" r="62%">
            <stop offset="0" stopColor="#F6C97A" stopOpacity="0.65" />
            <stop offset="1" stopColor="#F6C97A" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill={theme.colors.bg} />
        <rect width="400" height="500" fill="url(#dyGlow)" />

        {/* Rangoli — concentric rings + cross, centred top, static (no
            Unveil stagger needed on a symmetrical motif; it fades in with
            the rest of the card via its own .a1 class like everything
            else's first beat). */}
        <g className={`${styles.anim} ${styles.a1}`} transform="translate(200 100)" stroke={theme.colors.accent} fill="none">
          <circle r={44} strokeWidth={0.8} opacity={0.3} />
          <circle r={32} strokeWidth={0.8} opacity={0.3} />
          <path d="M0-40v104M-52 12h104M-36-24l72 72M36-24l-72 72" strokeWidth={0.6} opacity={0.3} />
          <circle r={9} fill={theme.colors.accent} stroke="none" opacity={0.8} />
        </g>

        <text
          className={`${styles.anim} ${styles.a2} ${styles.sanskrit}`}
          x="200" y="196" textAnchor="middle" fill={theme.colors.accent} fontSize={10}
        >
          {kicker}
        </text>

        {hostedBy && (
          <text
            className={`${styles.anim} ${styles.a2} ${styles.venueLine}`}
            x="200" y="216" textAnchor="middle" fill={theme.colors.dim} fontSize={9.5}
          >
            {hostedBy}
          </text>
        )}

        <text className={`${styles.anim} ${styles.a3} ${styles.names}`} x="200" y="272" textAnchor="middle" fill={theme.colors.ink} fontSize={40}>
          {headline}
        </text>

        <path className={`${styles.anim} ${styles.a4}`} d="M150 300h100" stroke={theme.colors.line} strokeWidth={0.9} opacity={0.65} />
        {eventDate && (
          <text
            className={`${styles.anim} ${styles.a4} ${styles.dateLine}`}
            x="200" y="330" textAnchor="middle" fill={theme.colors.dateColor} fontSize={11.5}
          >
            {formatEventDate(eventDate)}
          </text>
        )}
        {venue && (
          <text
            className={`${styles.anim} ${styles.a5} ${styles.venueLine}`}
            x="200" y="352" textAnchor="middle" fill={theme.colors.dim} fontSize={10}
          >
            {venue}
          </text>
        )}

        {/* The diya row — five oil lamps, evenly spaced along the base.
            The flame flicker is the ONLY motion on this card (see the
            reference: everything else is static) — no Drift/falling
            petals layered on top, a deliberate restraint decision, not a
            default. Bowls fade in with Unveil like everything above;
            flames additionally flicker forever once settled. */}
        <g className={`${styles.anim} ${styles.a5}`}>
          {/* Bowls and flames each get their own <g> — .diyaFlame's
              nth-of-type stagger (invite.module.css) counts <path> siblings
              within its own parent, so flames need to be the only <path>
              children of their group, not sharing a parent with the bowls. */}
          <g>
            {LAMP_X.map((x) => (
              <path key={`bowl-${x}`} transform={`translate(${x} 430)`} d="M-13 0q13 11 26 0q-4 9-13 9T-13 0z" fill={DIYA_BROWN} />
            ))}
          </g>
          <g>
            {LAMP_X.map((x) => (
              <path key={`flame-${x}`} className={styles.diyaFlame} transform={`translate(${x} 417)`} d="M0-13c4 6 4 10 0 13-4-3-4-7 0-13z" fill={FLAME_AMBER} />
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
