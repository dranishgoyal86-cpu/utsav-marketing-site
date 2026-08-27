import styles from "./invite.module.css";

// Wave 9 — Night Bloom. Styles ONE function's expanded card, not the whole
// invite — no entry in inviteThemes.ts on purpose (see the comment there).
// Colours/type are its own fixed palette per the reference, not looked up
// through resolveTheme(). Reuses .anim/.aN Unveil motion classes from
// invite.module.css (per the reference: no new motion styles needed).

const NB = {
  bg: "#0C0A12",
  violet: "#9066FF",
  pink: "#FF4F9E",
  orange: "#FF9A3D",
  ink: "#F5F2FF",
  lav: "#CFC6E8",
  muted: "#8E85AC",
};

// Fixed, deterministic scatter — not random per render (would replay on
// every optimistic RSVP state update, since this card stays mounted).
const DOTS = [
  { x: 12, y: 22, r: 1.4 },
  { x: 78, y: 14, r: 1.2 },
  { x: 90, y: 46, r: 1.6 },
  { x: 22, y: 70, r: 1.3 },
  { x: 60, y: 82, r: 1.8 },
];

function formatFunctionDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" }).toUpperCase();
}

// event_functions.time is the same free-text "HH:MM" 24-hour convention as
// events.event_time elsewhere in this codebase — parsed defensively since
// it's plain text, not a real time type.
function formatFunctionTime(timeStr: string | null): string {
  if (!timeStr) return "";
  const m = timeStr.match(/^(\d{1,2}):(\d{2})/);
  if (!m) return timeStr;
  let h = parseInt(m[1], 10);
  const min = m[2];
  const suffix = h >= 12 ? "PM" : "AM";
  h = h % 12 || 12;
  return `${h}:${min} ${suffix}`;
}

export default function NightBloomCard({
  name,
  date,
  time,
  headlineText,
}: {
  name: string;
  date: string | null;
  time: string | null;
  headlineText: string | null;
}) {
  // Kicker is always the real function name (per the reference — never a
  // fixed "SANGEET NIGHT" string). Headline is host-editable and defaults
  // to the same function name rather than shipping evocative copy that
  // only suits one specific kind of function.
  const headline = headlineText || name;
  const dateLine = formatFunctionDate(date);
  const timeLine = formatFunctionTime(time);

  return (
    <div className={styles.nbCard}>
      <div className={styles.nbGlow1} />
      <div className={styles.nbGlow2} />
      {DOTS.map((d, i) => (
        <span key={i} className={styles.nbDot} style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.r * 2, height: d.r * 2 }} />
      ))}

      <div className={styles.nbContent}>
        <div className={styles.nbKicker}>{name.toUpperCase()}</div>
        <div className={styles.nbDivider} />
        <div className={styles.nbHeadline}>{headline}</div>
        {(dateLine || timeLine) && (
          <div className={styles.nbDetails}>
            {dateLine && <div className={styles.nbDetailLine}>{dateLine}</div>}
            {timeLine && <div className={styles.nbDetailLine}>{timeLine}</div>}
          </div>
        )}
        {/* No dress-code line — no real data source for it anywhere in this
            app today (per the reference: don't invent content with nothing
            behind it). RSVP buttons stay outside this component, rendered
            by FunctionRsvps.tsx same as every function, styled or not. */}
      </div>
    </div>
  );
}
