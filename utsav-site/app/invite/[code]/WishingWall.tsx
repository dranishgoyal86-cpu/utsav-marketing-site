"use client";

import { useState } from "react";
import styles from "./invite.module.css";

type Wish = { id: string; guestName: string; message: string; createdAt: string };

const SUPABASE_URL = "https://puvhqusauipotmiicrrm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ie07f0f9_X8VuS5LPxPD-g_fTxCoPHN";

// Initials computed at render time from the guest's display name — no
// stored field, matches the reference markup's own note.
function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export default function WishingWall({
  passCode,
  eventName,
  initialWishes,
}: {
  passCode: string;
  eventName: string;
  initialWishes: Wish[];
}) {
  const [wishes, setWishes] = useState(initialWishes);
  const [draft, setDraft] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function submit() {
    const message = draft.trim();
    if (!message) return;
    setSubmitting(true);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/guest-pass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({ action: "submit_wish", pass_code: passCode, message }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Could not save your wish.");
      // Optimistic prepend — matches get_wishes' own newest-first order.
      setWishes((w) => [{ id: `local-${Date.now()}`, guestName: "You", message, createdAt: new Date().toISOString() }, ...w]);
      setDraft("");
    } catch {
      // Silent — the input keeps the draft so the guest can retry.
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className={styles.wallSection}>
      <p className={styles.kicker}>The wishing wall</p>

      {wishes.length === 0 && <p className={styles.wishEmpty}>Be the first to leave a wish.</p>}

      {wishes.map((w) => (
        <div key={w.id} className={styles.wish}>
          <div className={styles.who}>
            <span className={styles.av}>{initials(w.guestName)}</span>
            <span className={styles.n2}>{w.guestName}</span>
          </div>
          <p className={styles.m2}>&quot;{w.message}&quot;</p>
        </div>
      ))}

      <div className={styles.wishbox}>
        <textarea
          className={styles.wishInput}
          rows={2}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Leave your wish for ${eventName}…`}
          maxLength={500}
        />
        <button
          type="button"
          className={styles.wishSubmitBtn}
          disabled={submitting || !draft.trim()}
          onClick={submit}
        >
          {submitting ? "Sending…" : "Send wish"}
        </button>
      </div>
    </div>
  );
}
