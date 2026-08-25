import styles from "./invite.module.css";
import { inviteThemes } from "./inviteThemes";

// Wave 6 — a different page, not a third Unveil/Drift variant. This
// component intentionally shares NO structure with ToranCover/
// KalamkariCover: no styles.stage wrapper, no styles.anim/aN classes, no
// data-motion/data-run attributes, no DriftController. Per the reference:
// "the animation code does not run, rather than running slowly" — that's
// achieved structurally here (the animation classes are simply never
// referenced), not by setting a duration to 0, which would still leave the
// animation code path live and easy to accidentally re-enable later.
//
// No photo slot, no couple/functions/getting-there/RSVP panes render
// alongside this — page.tsx renders StillnessCover alone when
// design==='stillness', nothing else.

const theme = inviteThemes.stillness;

export default function StillnessCover({
  nameLine1,
  nameLine2,
  years,
  detailLine1,
  detailLine2,
}: {
  nameLine1: string | null;
  nameLine2: string | null;
  years: string | null;
  detailLine1: string | null;
  detailLine2: string | null;
}) {
  return (
    <div className={styles.stillnessStage}>
      <svg viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="500" fill={theme.colors.bg} />

        <path d="M176 108h48" stroke={theme.colors.line} strokeWidth={1} />

        <text
          x="200" y="150" textAnchor="middle" fill={theme.colors.dim}
          fontFamily="'Manrope', sans-serif" fontWeight={600} fontSize={9} letterSpacing={5}
        >
          {theme.kicker}
        </text>

        {nameLine1 && (
          <text
            x="200" y="220" textAnchor="middle" fill={theme.colors.ink}
            fontFamily="'Cormorant Garamond', serif" fontWeight={400} fontSize={36}
          >
            {nameLine1}
          </text>
        )}
        {nameLine2 && (
          <text
            x="200" y="268" textAnchor="middle" fill={theme.colors.ink}
            fontFamily="'Cormorant Garamond', serif" fontWeight={400} fontSize={36}
          >
            {nameLine2}
          </text>
        )}

        {years && (
          <text
            x="200" y="308" textAnchor="middle" fill={theme.colors.dim}
            fontFamily="'Manrope', sans-serif" fontSize={10.5} letterSpacing={1.6}
          >
            {years}
          </text>
        )}

        <path d="M140 362h120" stroke={theme.colors.soft} strokeWidth={0.8} />

        {detailLine1 && (
          <text
            x="200" y="396" textAnchor="middle" fill={theme.colors.body}
            fontFamily="'Manrope', sans-serif" fontSize={10.5} letterSpacing={1.4}
          >
            {detailLine1}
          </text>
        )}
        {detailLine2 && (
          <text
            x="200" y="420" textAnchor="middle" fill={theme.colors.dim}
            fontFamily="'Manrope', sans-serif" fontSize={9.5} letterSpacing={1.2}
          >
            {detailLine2}
          </text>
        )}
      </svg>
    </div>
  );
}
