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
// Per-lamp flicker timing — deliberately uneven so the five flames read as
// independently alive, same "don't let them look synchronized" principle
// as Toran's falling-petal stagger.
const FLAME_TIMING = [
  { duration: 2400, delay: 0 },
  { duration: 2900, delay: 240 },
  { duration: 2600, delay: 480 },
  { duration: 3100, delay: 120 },
  { duration: 2700, delay: 360 },
];

function formatEventDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }).toUpperCase();
}

// Unlike Toran/Kalamkari/Ivory's names (short first names, rarely more
// than ~10 characters), Diya's headline defaults to a full real event name
// ("The Agarwal Griha Pravesh") — verified live that a single line at a
// size matching the other designs' headlines runs off both edges of the
// 400-wide canvas. SVG <text> doesn't wrap on its own, so long headlines
// split onto a second line at the nearest word boundary past the midpoint,
// same "fix it with real layout, not by shrinking until illegible" instinct
// as Ivory's date/venue stacking fix.
function wrapHeadline(text: string): string[] {
  if (text.length <= 22) return [text];
  const words = text.split(" ");
  if (words.length < 2) return [text];
  let line1 = "";
  let i = 0;
  while (i < words.length && (line1 + words[i]).length <= text.length / 2 + 3) {
    line1 += (line1 ? " " : "") + words[i];
    i++;
  }
  if (!line1) line1 = words[0];
  const line2 = words.slice(i).join(" ");
  return line2 ? [line1, line2] : [line1];
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
  const headlineLines = wrapHeadline(headline || "");
  // Divider/date/venue shift down when the headline wraps to a second line
  // — computed, not hardcoded, so it stays correct for any real name length.
  const bodyY = 300 + (headlineLines.length > 1 ? 26 : 0);

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
            else's first beat).
            Absolute coordinates (centred at 200,100), not a wrapping
            transform="translate(...)" attribute — verified live that
            combining an SVG transform attribute with a CSS .anim/.aN class
            (whose riseIn keyframe also animates the transform property)
            makes the CSS-driven transform win outright and drop the
            attribute's translate entirely once the animation settles,
            collapsing the whole group toward the SVG origin. The
            reference's own path data is already absolute for exactly this
            reason — used as given, not translated into a local group. */}
        <g className={`${styles.anim} ${styles.a1}`} stroke={theme.colors.accent} fill="none">
          <circle cx={200} cy={100} r={44} strokeWidth={0.8} opacity={0.3} />
          <circle cx={200} cy={100} r={32} strokeWidth={0.8} opacity={0.3} />
          <path d="M200 60v104M148 112h104M164 76l72 72M236 76l-72 72" strokeWidth={0.6} opacity={0.3} />
          <circle cx={200} cy={100} r={9} fill={theme.colors.accent} stroke="none" opacity={0.8} />
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

        <text className={`${styles.anim} ${styles.a3} ${styles.names}`} x="200" y={headlineLines.length > 1 ? 256 : 272} textAnchor="middle" fill={theme.colors.ink} fontSize={32}>
          {headlineLines.map((line, i) => (
            <tspan key={i} x="200" dy={i === 0 ? 0 : 38}>{line}</tspan>
          ))}
        </text>

        <path className={`${styles.anim} ${styles.a4}`} d={`M150 ${bodyY}h100`} stroke={theme.colors.line} strokeWidth={0.9} opacity={0.65} />
        {eventDate && (
          <text
            className={`${styles.anim} ${styles.a4} ${styles.dateLine}`}
            x="200" y={bodyY + 30} textAnchor="middle" fill={theme.colors.dateColor} fontSize={11.5}
          >
            {formatEventDate(eventDate)}
          </text>
        )}
        {venue && (
          <text
            className={`${styles.anim} ${styles.a5} ${styles.venueLine}`}
            x="200" y={bodyY + 52} textAnchor="middle" fill={theme.colors.dim} fontSize={10}
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
            {/* Each flame's translate lives on a static outer <g> — putting
                it on the same element as .diyaFlame (which animates the CSS
                transform property for the flicker) hits the exact same
                attribute-vs-CSS-transform collision the rangoli above had,
                just per-lamp instead of once. */}
            {LAMP_X.map((x, i) => (
              <g key={`flame-${x}`} transform={`translate(${x} 417)`}>
                <path
                  className={styles.diyaFlame}
                  style={{ animationDuration: `${FLAME_TIMING[i].duration}ms`, animationDelay: `${FLAME_TIMING[i].delay}ms` }}
                  d="M0-13c4 6 4 10 0 13-4-3-4-7 0-13z"
                  fill={FLAME_AMBER}
                />
              </g>
            ))}
          </g>
        </g>
      </svg>
    </div>
  );
}
