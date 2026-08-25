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
}: {
  passCode: string;
  functions: EventFunction[];
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

  return (
    <div className={styles.functions}>
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
