"use client";

import { useState } from "react";
import styles from "./invite.module.css";

const SUPABASE_URL = "https://puvhqusauipotmiicrrm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ie07f0f9_X8VuS5LPxPD-g_fTxCoPHN";

type Travel = {
  is_outstation: boolean;
  arrival_date: string | null;
  arrival_time: string | null;
  departure_date: string | null;
  departure_time: string | null;
  pickup_needed: boolean;
} | null;

// Only ever writes the guest-writable travel columns — accommodation_id,
// room_number, pickup_notes are deliberately excluded, matching
// submit-rsvp/index.ts's own existing precedent for this exact table
// (host-only decisions, only ever set from GuestDetailModal.js).
export default function TravelDetails({ passCode, initialTravel }: { passCode: string; initialTravel: Travel }) {
  const [isOutstation, setIsOutstation] = useState(initialTravel?.is_outstation || false);
  const [arrivalDate, setArrivalDate] = useState(initialTravel?.arrival_date || "");
  const [arrivalTime, setArrivalTime] = useState(initialTravel?.arrival_time || "");
  const [departureDate, setDepartureDate] = useState(initialTravel?.departure_date || "");
  const [departureTime, setDepartureTime] = useState(initialTravel?.departure_time || "");
  const [pickupNeeded, setPickupNeeded] = useState(initialTravel?.pickup_needed || false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  async function save() {
    setSaving(true);
    setSaved(false);
    try {
      const res = await fetch(`${SUPABASE_URL}/functions/v1/guest-pass`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          action: "submit_travel_details",
          pass_code: passCode,
          is_outstation: isOutstation,
          arrival_date: arrivalDate || null,
          arrival_time: arrivalTime || null,
          departure_date: departureDate || null,
          departure_time: departureTime || null,
          pickup_needed: pickupNeeded,
        }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || "Could not save.");
      setSaved(true);
    } catch {
      // Silent — form keeps its values so the guest can retry.
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.wallSection}>
      <p className={styles.kicker}>Travelling from out of town?</p>

      <label className={styles.travelCheckboxRow}>
        <input
          type="checkbox"
          checked={isOutstation}
          onChange={(e) => setIsOutstation(e.target.checked)}
        />
        <span>I&apos;m coming from out of town</span>
      </label>

      {isOutstation && (
        <>
          <div className={styles.travelRow}>
            <div className={styles.travelField}>
              <label className={styles.travelLabel}>Arrival date</label>
              <input type="date" className={styles.travelInput} value={arrivalDate} onChange={(e) => setArrivalDate(e.target.value)} />
            </div>
            <div className={styles.travelField}>
              <label className={styles.travelLabel}>Arrival time</label>
              <input type="time" className={styles.travelInput} value={arrivalTime} onChange={(e) => setArrivalTime(e.target.value)} />
            </div>
          </div>
          <div className={styles.travelRow}>
            <div className={styles.travelField}>
              <label className={styles.travelLabel}>Departure date</label>
              <input type="date" className={styles.travelInput} value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
            </div>
            <div className={styles.travelField}>
              <label className={styles.travelLabel}>Departure time</label>
              <input type="time" className={styles.travelInput} value={departureTime} onChange={(e) => setDepartureTime(e.target.value)} />
            </div>
          </div>
          <label className={styles.travelCheckboxRow}>
            <input type="checkbox" checked={pickupNeeded} onChange={(e) => setPickupNeeded(e.target.checked)} />
            <span>I&apos;ll need pickup assistance</span>
          </label>
        </>
      )}

      <button type="button" className={styles.wishSubmitBtn} disabled={saving} onClick={save}>
        {saving ? "Saving…" : saved ? "Saved ✓" : "Save travel details"}
      </button>
    </div>
  );
}
