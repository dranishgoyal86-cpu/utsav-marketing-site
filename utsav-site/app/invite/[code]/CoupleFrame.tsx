import styles from "./invite.module.css";

// Wave 4, Task 1 — page 2 of the original 5-page mockup (cover, couple,
// functions, getting-there, RSVP). couple_photo_url/couple_quote are new
// columns on event_invite_content (Wave 1's table) — confirmed empty there
// before this task, verified live via curl after deploy. No photo uploaded
// yet is the common case for any event created before this shipped, so this
// renders a tasteful placeholder rather than nothing or a broken <img>.
export default function CoupleFrame({
  photoUrl,
  quote,
}: {
  photoUrl: string | null;
  quote: string | null;
}) {
  if (!photoUrl && !quote) return null;

  return (
    <div className={styles.coupleSection}>
      <div className={styles.coupleFrame}>
        {photoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={photoUrl} alt="" className={styles.couplePhoto} />
        ) : (
          <div className={styles.couplePlaceholder}>
            <span className={styles.couplePlaceholderMark}>✦</span>
          </div>
        )}
      </div>
      {quote && <p className={styles.coupleQuote}>&ldquo;{quote}&rdquo;</p>}
    </div>
  );
}
