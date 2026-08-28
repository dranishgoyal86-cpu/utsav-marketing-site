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
// Same 8 values as .leaf:nth-of-type(1..8) in invite.module.css (the
// dropIn stagger table Toran's 9 leaves define) — supplied inline now,
// see the Bloom() render call above for why.
const BLOOM_DELAYS = [550, 650, 750, 850, 950, 1050, 1150, 1250];
// Same 7 values as .petal:nth-of-type(1..7) in invite.module.css (the
// fall-animation timing table) — supplied inline for the same reason.
const PETAL_TIMING = [
  { duration: 7.5, delay: 0 },
  { duration: 9.5, delay: 1.1 },
  { duration: 8.2, delay: 2.3 },
  { duration: 10.5, delay: 0.6 },
  { duration: 8.8, delay: 3.4 },
  { duration: 11, delay: 1.8 },
  { duration: 9, delay: 4.2 },
];

// className applied here (not baked in) so the caller controls the
// drop-in stagger via CSS :nth-of-type, same mechanism Toran's leaves use.
//
// Wave 11 investigation found this had been silently broken since Wave 5:
// the positioning transform="translate(x y)" and the .leaf class's own
// animated CSS transform (dropIn's keyframes) were both on this same <g>.
// Per the SVG-transform-vs-CSS-animation collision (see
// gotcha_svg_transform_css_animation_collision) the CSS one wins outright
// once the entrance animation settles, dropping the translate entirely —
// verified live: all 8 blooms were collapsing into the card's top-left
// corner instead of their real top/bottom-row positions. Fixed the same
// way Diya's rangoli was: the translate lives on a static outer <g>, the
// animated class goes on an inner <g> that carries no transform attribute
// of its own.
function Bloom({ x, y, className, delay }: { x: number; y: number; className?: string; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className={className} style={{ animationDelay: `${delay}ms` }}>
        <path d={PETAL_TOP} fill={theme.colors.line} opacity={0.7} />
        <path d={PETAL_SIDE} fill={theme.colors.line} opacity={0.7} />
        <circle r={6} fill={theme.colors.accent} />
      </g>
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
        {/* Blooms drop in staggered, same .leaf dropIn keyframes/timing
            Toran's 9 leaves use. Delay now passed per-bloom via inline
            style rather than relying on :nth-of-type(1..9) — the Bloom()
            transform-collision fix above means each bloom's animated <g>
            is now alone within its own static wrapper, so sibling-counting
            selectors can't tell them apart any more (same reason Diya's
            flames moved to inline timing). Same 8 delay values Toran's CSS
            table already used for blooms 1-8, just supplied directly. */}
        <g>
          {TOP_XS.map((x, i) => <Bloom key={`t${i}`} className={styles.leaf} delay={BLOOM_DELAYS[i]} x={x} y={TOP_Y} />)}
          {BOTTOM_XS.map((x, i) => <Bloom key={`b${i}`} className={styles.leaf} delay={BLOOM_DELAYS[TOP_XS.length + i]} x={x} y={BOTTOM_Y} />)}
        </g>

        {/* Drift: falling bloom fragments, ambient background — a navy
            petal curve rather than Toran's marigold dot, per this
            design's own motif.
            Wave 11 investigation found this had the same collision as the
            blooms above: transform="translate(x 0)" and .petal's own
            animated transform (the fall keyframe) on the same <path>.
            Verified live: all 7 petals were collapsing to x=0, falling in
            a stuck line along the card's left edge instead of spread
            across it (unlike Toran's petals, which use cx/cy — a real
            positional attribute the CSS transform property never touches
            — so Toran was never at risk here). Same static-outer/animated-
            inner split as the blooms, with per-petal timing supplied
            inline for the same nth-of-type reason. */}
        <g fill={theme.colors.line} opacity={0.7}>
          {PETAL_POSITIONS.map((x, i) => (
            <g key={i} transform={`translate(${x} 0)`}>
              <path
                className={styles.petal}
                style={{ animationDuration: `${PETAL_TIMING[i].duration}s`, animationDelay: `${PETAL_TIMING[i].delay}s` }}
                d={DRIFT_PETAL}
              />
            </g>
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
