import styles from "./invite.module.css";
import { inviteThemes } from "./inviteThemes";

// Static server-rendered SVG, same Unveil/Drift motion classes as
// ToranCover.tsx (per the Kalamkari reference: no new motion styles
// needed, reuse as-is). Double-border frame coordinates and the bloom
// path data are copied directly from the reviewed reference
// (utsav-invite-design-system.html), not re-derived. Bottom row genuinely
// has 3 blooms where the top has 5 — asymmetric on purpose.
//
// Drift's falling element here is a small bloom-fragment (one navy petal
// curve, scaled down), not Toran's marigold dot — a deliberate per-design
// choice, confirmed with the user rather than guessed, since the two
// designs' ambient motion shouldn't look identical to their motifs.

const theme = inviteThemes.kalamkari;

const TOP_Y = 70;
const BOTTOM_Y = 446;
const TOP_XS = [64, 132, 200, 268, 336];
const BOTTOM_XS = [64, 200, 336];
const PETAL_TOP = "M0-14C5-7 5 7 0 14-5 7-5-7 0-14z";
const PETAL_SIDE = "M-14 0C-7-5 7-5 14 0 7 5-7 5-14 0z";
const DRIFT_PETAL = "M0-5C1.8-2.5 1.8 2.5 0 5-1.8 2.5-1.8-2.5 0-5z";
const PETAL_POSITIONS = [46, 112, 178, 238, 298, 348, 76];

// className applied here (not baked in) so the caller controls the
// drop-in stagger via CSS :nth-of-type, same mechanism Toran's leaves use.
function Bloom({ x, y, className }: { x: number; y: number; className?: string }) {
  return (
    <g className={className} transform={`translate(${x} ${y})`}>
      <path d={PETAL_TOP} fill={theme.colors.line} opacity={0.7} />
      <path d={PETAL_SIDE} fill={theme.colors.line} opacity={0.7} />
      <circle r={6} fill={theme.colors.accent} />
    </g>
  );
}

function formatEventDate(dateStr: string | null): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" }).toUpperCase();
}

export default function KalamkariCover({
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
  const twoNames = !!(partner1Name && partner2Name);
  const singleName = partner1Name && !partner2Name ? partner1Name : !partner1Name ? eventName : null;

  return (
    <div className={styles.stage} data-motion="unveil" data-run="1">
      <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="500" fill={theme.colors.bg} />

        {/* No .archLine here — that class's stroke-dasharray is calibrated
            to Toran's 520-unit arch path length; reusing it on this
            rectangle's much longer perimeter would draw a broken dashed
            border instead of a solid one. Rects are static, same as
            Toran's own static background rect fills. */}
        <path
          d="M20 20h360v460h-360z"
          stroke={theme.colors.line}
          strokeWidth={1.3}
          fill="none"
          opacity={0.9}
        />
        <path
          d="M27 27h346v446h-346z"
          stroke={theme.colors.line}
          strokeWidth={0.7}
          fill="none"
          opacity={0.55}
        />

        <path d={`M40 ${TOP_Y}h320`} stroke={theme.colors.line} strokeWidth={0.8} opacity={0.35} />
        <path d={`M40 ${BOTTOM_Y}h320`} stroke={theme.colors.line} strokeWidth={0.8} opacity={0.35} />
        {/* Blooms drop in staggered, same .leaf class/keyframes/delay table
            Toran's 9 leaves use — 8 blooms here fits within its existing
            nth-of-type(1..9) delay range, no new CSS needed. */}
        <g>
          {TOP_XS.map((x, i) => <Bloom key={`t${i}`} className={styles.leaf} x={x} y={TOP_Y} />)}
          {BOTTOM_XS.map((x, i) => <Bloom key={`b${i}`} className={styles.leaf} x={x} y={BOTTOM_Y} />)}
        </g>

        {/* Drift: falling bloom fragments, ambient background — a navy
            petal curve rather than Toran's marigold dot, per this
            design's own motif. */}
        <g fill={theme.colors.line} opacity={0.7}>
          {PETAL_POSITIONS.map((x, i) => (
            <path key={i} className={styles.petal} d={DRIFT_PETAL} transform={`translate(${x} 0)`} />
          ))}
        </g>

        <text
          className={`${styles.anim} ${styles.a1} ${styles.venueLine}`}
          x="200" y="186" textAnchor="middle" fill={theme.colors.accent} fontSize={10}
        >
          {theme.kicker}
        </text>

        {hostedBy && (
          <text
            className={`${styles.anim} ${styles.a1} ${styles.venueLine}`}
            x="200" y="206" textAnchor="middle" fill={theme.colors.dim} fontSize={9.5}
          >
            {hostedBy}
          </text>
        )}

        {twoNames ? (
          <>
            <text className={`${styles.anim} ${styles.a2} ${styles.names}`} x="200" y="252" textAnchor="middle" fill={theme.colors.ink} fontSize={44}>
              {partner1Name}
            </text>
            <text
              className={`${styles.anim} ${styles.a3}`}
              x="200" y="284" textAnchor="middle" fill={theme.colors.accent}
              fontFamily="'Cormorant Garamond', serif" fontSize={19} fontStyle="italic"
            >
              {theme.connector}
            </text>
            <text className={`${styles.anim} ${styles.a3} ${styles.names}`} x="200" y="330" textAnchor="middle" fill={theme.colors.ink} fontSize={44}>
              {partner2Name}
            </text>
          </>
        ) : (
          <text className={`${styles.anim} ${styles.a2} ${styles.names}`} x="200" y="270" textAnchor="middle" fill={theme.colors.ink} fontSize={44}>
            {singleName}
          </text>
        )}

        <path className={`${styles.anim} ${styles.a4}`} d="M150 356h100" stroke={theme.colors.accent} strokeWidth={0.9} opacity={0.65} />
        {eventDate && (
          <text
            className={`${styles.anim} ${styles.a4} ${styles.dateLine}`}
            x="200" y="386" textAnchor="middle" fill={theme.colors.dateColor} fontSize={11.5}
          >
            {formatEventDate(eventDate)}
          </text>
        )}
        {venue && (
          <text
            className={`${styles.anim} ${styles.a5} ${styles.venueLine}`}
            x="200" y="408" textAnchor="middle" fill={theme.colors.dim} fontSize={10}
          >
            {venue}
          </text>
        )}
      </svg>
    </div>
  );
}
