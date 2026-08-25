"use client";

import { useState } from "react";
import styles from "./invite.module.css";

type EventFunction = {
  id: string;
  name: string;
  date: string | null;
  time: string | null;
  status: "yes" | "no" | "pending";
};

function formatFunctionMeta(date: string | null, time: string | null): string {
  const parts: string[] = [];
  if (date) {
    const d = new Date(date + "T00:00:00");
    if (!Number.isNaN(d.getTime())) {
      parts.push(d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }));
    }
  }
  if (time) parts.push(time);
  return parts.join(" · ");
}

// Writes go through guest-pass's submit_function_rsvp action — same
// pass_code trust model as every other guest-facing write in this
// codebase, no direct Supabase calls from the client.
export default function FunctionRsvps({
  passCode,
  functions,
  venueName,
  venueAddress,
  entryWindow,
}: {
  passCode: string;
  functions: EventFunction[];
  venueName?: string | null;
  venueAddress?: string | null;
  entryWindow?: string | null;
}) {
  const [rows, setRows] = useState(functions);
  const [pending, setPending] = useState<string | null>(null);

  async function respond(functionId: string, status: "yes" | "no") {
    setPending(functionId);
    const prev = rows;
    setRows((r) => r.map((f) => (f.id === functionId ? { ...f, status } : f)));
    try {
      const res = await fetch(
        "https://puvhqusauipotmiicrrm.supabase.co/functions/v1/guest-pass",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: "sb_publishable_ie07f0f9_X8VuS5LPxPD-g_fTxCoPHN",
            Authorization: "Bearer sb_publishable_ie07f0f9_X8VuS5LPxPD-g_fTxCoPHN",
          },
          body: JSON.stringify({ action: "submit_function_rsvp", pass_code: passCode, function_id: functionId, status }),
        }
      );
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Could not save your RSVP.");
    } catch {
      setRows(prev); // roll back the optimistic update on failure
    } finally {
      setPending(null);
    }
  }

  if (rows.length === 0) return null;

  // Shown once the guest has said yes to at least one function — no
  // "getting there" to show if they're not coming. Reuses get_invite's
  // already-returned venue/entry-window data (no new fetch), and links to
  // the existing gate-pass page (GuestPassScreen.js, on the app's own web
  // export) for the actual QR code rather than reproducing one here —
  // that page already exists and already does this.
  const anyYes = rows.some((f) => f.status === "yes");
  const venue = venueName || venueAddress;

  return (
    <div className={styles.functions}>
      {anyYes && (venue || entryWindow) && (
        <div className={styles.gettingThere}>
          <p className={styles.kicker}>Getting there</p>
          {venue && <p className={styles.gettingThereText}>{venue}</p>}
          {entryWindow && <p className={styles.gettingThereText}>Entry: {entryWindow}</p>}
          <a
            className={styles.gettingThereLink}
            href={`https://app.theutsavapp.com/p/${passCode}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View your gate pass →
          </a>
        </div>
      )}
      {rows.map((f) => (
        <div key={f.id} className={styles.functionRow}>
          <div>
            <div className={styles.functionName}>{f.name}</div>
            <div className={styles.functionMeta}>{formatFunctionMeta(f.date, f.time)}</div>
          </div>
          <div className={styles.rsvpBtns}>
            <button
              type="button"
              className={styles.rsvpBtn}
              data-active={f.status === "yes"}
              disabled={pending === f.id}
              onClick={() => respond(f.id, "yes")}
            >
              Yes
            </button>
            <button
              type="button"
              className={styles.rsvpBtn}
              data-active={f.status === "no"}
              disabled={pending === f.id}
              onClick={() => respond(f.id, "no")}
            >
              No
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
