import styles from "./invite.module.css";

// Static server-rendered SVG — animation is pure CSS (Unveil plays via
// `data-run="1"` set at render time below; there's no load-triggered JS
// needed since CSS animations start on paint by default). Path data for
// the arch string, all 9 leaves, and the two divider curves is copied
// directly from the reviewed reference prototype — same numbers as
// components/invite/motifs/TornArch.js on the app side, kept in sync
// deliberately.

const LEAF_POSITIONS = [
  { x: 34, y: 56 }, { x: 74, y: 72 }, { x: 114, y: 86 }, { x: 154, y: 95 },
  { x: 198, y: 99 }, { x: 242, y: 95 }, { x: 282, y: 86 }, { x: 322, y: 72 },
  { x: 362, y: 56 },
];
const LEAF_PATH = "c7 9 7 22 0 32-7-10-7-23 0-32z";
const PETAL_POSITIONS = [46, 112, 178, 238, 298, 348, 76];

function formatEventDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }).toUpperCase();
}

export default function ToranCover({
  eventName,
  eventDate,
  venue,
  partner1Name,
  partner2Name,
  hostedBy,
}: {
  eventName: string;
  eventDate: string | null;
  venue: string | null;
  partner1Name?: string | null;
  partner2Name?: string | null;
  hostedBy?: string | null;
}) {
  // Names slot: two structured partner names when both are present (the
  // reference's original "weds" layout), one structured name when only
  // partner_1_name is set (today's single-line treatment, just sourced
  // from the real field instead of eventName), or eventName as the
  // fallback for any event with no event_invite_content row yet — the
  // behavior this page already shipped with, unchanged for those events.
  const twoNames = !!(partner1Name && partner2Name);
  const singleName = partner1Name && !partner2Name ? partner1Name : !partner1Name ? eventName : null;

  return (
    <div className={styles.stage} data-motion="unveil" data-run="1">
      <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="tv" cx="50%" cy="30%" r="72%">
            <stop offset="0" stopColor="#6E1A2E" stopOpacity=".85" />
            <stop offset="1" stopColor="#2E0713" stopOpacity=".9" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill="#4A0E1E" />
        <rect width="400" height="500" fill="url(#tv)" />

        <path
          className={styles.archLine}
          d="M14 44 Q200 118 386 44"
          stroke="#D4A03C"
          strokeWidth={1.6}
          fill="none"
          opacity={0.85}
        />

        <g fill="#D4A03C">
          {LEAF_POSITIONS.map((pos, i) => (
            <path key={i} className={styles.leaf} d={`M${pos.x} ${pos.y}${LEAF_PATH}`} />
          ))}
        </g>

        {/* Drift: falling marigold petals, ambient background */}
        <g fill="#E8A020" opacity={0.85}>
          {PETAL_POSITIONS.map((x, i) => (
            <circle key={i} className={styles.petal} cx={x} cy={0} r={i % 2 === 0 ? 4 : 3.4} />
          ))}
        </g>

        <text
          className={`${styles.anim} ${styles.a1} ${styles.sanskrit}`}
          x="200" y="186" textAnchor="middle" fill="#D4A03C" fontSize={10}
        >
          श्री गणेशाय नमः
        </text>

        {hostedBy && (
          <text
            className={`${styles.anim} ${styles.a1} ${styles.venueLine}`}
            x="200" y="206" textAnchor="middle" fill="#C79A5A" fontSize={9.5}
          >
            {hostedBy}
          </text>
        )}

        {twoNames ? (
          <>
            <text className={`${styles.anim} ${styles.a2} ${styles.names}`} x="200" y="252" textAnchor="middle" fill="#FFF3DC" fontSize={44}>
              {partner1Name}
            </text>
            <text
              className={`${styles.anim} ${styles.a3}`}
              x="200" y="284" textAnchor="middle" fill="#D4A03C"
              fontFamily="'Cormorant Garamond', serif" fontSize={19} fontStyle="italic"
            >
              weds
            </text>
            <text className={`${styles.anim} ${styles.a3} ${styles.names}`} x="200" y="330" textAnchor="middle" fill="#FFF3DC" fontSize={44}>
              {partner2Name}
            </text>
          </>
        ) : (
          <text className={`${styles.anim} ${styles.a2} ${styles.names}`} x="200" y="270" textAnchor="middle" fill="#FFF3DC" fontSize={44}>
            {singleName}
          </text>
        )}

        <path className={`${styles.anim} ${styles.a4}`} d="M150 356h100" stroke="#D4A03C" strokeWidth={0.9} opacity={0.65} />
        {eventDate && (
          <text
            className={`${styles.anim} ${styles.a4} ${styles.dateLine}`}
            x="200" y="386" textAnchor="middle" fill="#F0DFC2" fontSize={11.5}
          >
            {formatEventDate(eventDate)}
          </text>
        )}
        {venue && (
          <text
            className={`${styles.anim} ${styles.a5} ${styles.venueLine}`}
            x="200" y="408" textAnchor="middle" fill="#C79A5A" fontSize={10}
          >
            {venue}
          </text>
        )}
        <path
          className={`${styles.anim} ${styles.a5}`}
          d="M14 456 Q200 430 386 456"
          stroke="#D4A03C" strokeWidth={1.1} fill="none" opacity={0.5}
        />
      </svg>
    </div>
  );
}
