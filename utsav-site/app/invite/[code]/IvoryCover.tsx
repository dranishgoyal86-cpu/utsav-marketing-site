import styles from "./invite.module.css";
import { inviteThemes } from "./inviteThemes";

// Wave 8 — a second neutral, non-Hindu-coded option alongside Kalamkari.
// No tradition-specific symbols or content, same discipline as Kalamkari.
// Reuses the same .stage box and Unveil/Drift motion classes as Toran/
// Kalamkari (per the reference: no new motion styles needed) — this is a
// different composition within the same system, not a third architecture
// (unlike Stillness, which really is its own page).
//
// Left-aligned, enormous type is the entire visual statement per the
// reference — don't centre these as a default assumption.

const theme = inviteThemes.ivory;

// Drift's falling element reuses Toran's marigold circle shape (same hex
// as theme.colors.accent, coincidentally — this app's global amber IS
// #E8A020) but at much lower opacity than Toran's 0.85, per the
// reference's own note that the heavier marigold treatment would clash
// with this design's restraint. A real decision, not a silent default.
const PETAL_POSITIONS = [46, 112, 178, 238, 298, 348, 76];

function formatEventDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }).toUpperCase();
}

export default function IvoryCover({
  eventName,
  eventDate,
  venue,
  partner1Name,
  partner2Name,
  hostedBy,
  kickerText,
}: {
  eventName: string;
  eventDate: string | null;
  venue: string | null;
  partner1Name?: string | null;
  partner2Name?: string | null;
  hostedBy?: string | null;
  kickerText?: string | null;
}) {
  const twoNames = !!(partner1Name && partner2Name);
  const singleName = partner1Name && !partner2Name ? partner1Name : !partner1Name ? eventName : null;
  // Wave 8: "SAVE THE DATE" (the mockup's literal string) doesn't fit
  // every wedding where the invite itself carries full details — a real
  // host-editable field (event_invite_content.kicker_text) overrides
  // theme.kicker's default ("YOU'RE INVITED") when set.
  const kicker = kickerText || theme.kicker;

  return (
    <div className={styles.stage} data-motion="unveil" data-run="1">
      <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="500" fill={theme.colors.bg} />

        {/* Drift: falling marigold dots, ambient background — same shape
            as Toran's, far lower opacity to match Ivory's restraint. */}
        <g fill={theme.colors.accent} opacity={0.25}>
          {PETAL_POSITIONS.map((x, i) => (
            <circle key={i} className={styles.petal} cx={x} cy={0} r={i % 2 === 0 ? 4 : 3.4} />
          ))}
        </g>

        <path
          className={`${styles.anim} ${styles.a1}`}
          d="M52 96h44"
          stroke={theme.colors.accent}
          strokeWidth={2}
        />

        <text
          className={`${styles.anim} ${styles.a1}`}
          x="52" y="132" textAnchor="start"
          fill={theme.colors.dim} fontFamily="'Manrope', sans-serif" fontWeight={700} fontSize={9.5} letterSpacing={4.5}
        >
          {kicker}
        </text>

        {hostedBy && (
          <text
            className={`${styles.anim} ${styles.a1}`}
            x="52" y="152" textAnchor="start"
            fill={theme.colors.dim} fontFamily="'Manrope', sans-serif" fontSize={9.5}
          >
            {hostedBy}
          </text>
        )}

        {twoNames ? (
          <>
            <text
              className={`${styles.anim} ${styles.a2}`}
              x="48" y="234" textAnchor="start"
              fill={theme.colors.ink} fontFamily="'Fraunces', serif" fontWeight={600} fontSize={62} letterSpacing={-2.5}
            >
              {partner1Name}
            </text>
            <text
              className={`${styles.anim} ${styles.a3}`}
              x="48" y="286" textAnchor="start"
              fill={theme.colors.ink} fontFamily="'Fraunces', serif" fontWeight={300} fontStyle="italic" fontSize={26} letterSpacing={-0.5}
            >
              {theme.connector}
            </text>
            <text
              className={`${styles.anim} ${styles.a3}`}
              x="48" y="356" textAnchor="start"
              fill={theme.colors.ink} fontFamily="'Fraunces', serif" fontWeight={600} fontSize={62} letterSpacing={-2.5}
            >
              {partner2Name}
            </text>
          </>
        ) : (
          <text
            className={`${styles.anim} ${styles.a2}`}
            x="48" y="286" textAnchor="start"
            fill={theme.colors.ink} fontFamily="'Fraunces', serif" fontWeight={600} fontSize={62} letterSpacing={-2.5}
          >
            {singleName}
          </text>
        )}

        <path className={`${styles.anim} ${styles.a4}`} d="M52 400h296" stroke={theme.colors.line} strokeWidth={1} />

        {eventDate && (
          <text
            className={`${styles.anim} ${styles.a4}`}
            x="52" y="428" textAnchor="start"
            fill={theme.colors.dateColor} fontFamily="'Manrope', sans-serif" fontWeight={600} fontSize={11} letterSpacing={1.2}
          >
            {formatEventDate(eventDate)}
          </text>
        )}
        {venue && (
          <text
            className={`${styles.anim} ${styles.a5}`}
            x="348" y="428" textAnchor="end"
            fill={theme.colors.dim} fontFamily="'Manrope', sans-serif" fontSize={10} letterSpacing={2}
          >
            {venue}
          </text>
        )}
      </svg>
    </div>
  );
}
