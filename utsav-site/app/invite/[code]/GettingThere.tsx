import styles from "./invite.module.css";
import TravelDetails from "./TravelDetails";

type Travel = {
  is_outstation: boolean;
  arrival_date: string | null;
  arrival_time: string | null;
  departure_date: string | null;
  departure_time: string | null;
  pickup_needed: boolean;
} | null;

// Wave 4, Task 2 — page 4 of the 5-page mockup. Consolidates what Wave 3
// had split across two places: FunctionRsvps.tsx's small inline "getting
// there" blurb (venue + entry window + gate-pass link, shown only after an
// RSVP yes) and TravelDetails.tsx's own standalone card. Both now live here,
// one card, so a guest sees venue info and travel questions together.
//
// Investigated before building: events.venue_lat/venue_lng and
// events.maps_link are 0/60 populated across every real event; the `venues`
// marketplace join table (booked-venue name/address/lat/lng) is empty
// entirely. The only real, populated venue signal today is the free-text
// events.venue string (3/60 events) — so "Get directions" falls back to a
// Maps search-query link built from that address text when no lat/lng or
// maps_link exists, otherwise the button would never appear for any of
// today's real events despite genuine address data existing.
//
// No hotel-block section: the mockup's "Code UTSAV27 · held until 20 Jan"
// has no real backing anywhere — event_accommodations (a real table,
// host-editable via GuestList.js) has name/address/notes but zero rows
// across the whole database, and no discount-code/hold-date field exists
// on any table. Left out entirely rather than shipping a section with
// nothing behind it, per this wave's explicit instruction.
function directionsUrl(venueName: string | null, venueAddress: string | null, lat: number | null, lng: number | null, mapsLink: string | null): string | null {
  if (mapsLink) return mapsLink;
  if (lat != null && lng != null) return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
  const text = venueName || venueAddress;
  if (text) return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(text)}`;
  return null;
}

export default function GettingThere({
  passCode,
  venueName,
  venueAddress,
  venueLat,
  venueLng,
  mapsLink,
  entryWindow,
  anyYes,
  hasOutstationGuests,
  initialTravel,
}: {
  passCode: string;
  venueName: string | null;
  venueAddress: string | null;
  venueLat: number | null;
  venueLng: number | null;
  mapsLink: string | null;
  entryWindow: string | null;
  anyYes: boolean;
  hasOutstationGuests: boolean;
  initialTravel: Travel;
}) {
  const venue = venueName || venueAddress;
  const directions = directionsUrl(venueName, venueAddress, venueLat, venueLng, mapsLink);

  if (!venue && !entryWindow && !hasOutstationGuests) return null;

  return (
    <div className={styles.wallSection}>
      <p className={styles.kicker}>Getting there</p>

      {venue && <p className={styles.gettingThereText}>{venue}</p>}
      {entryWindow && <p className={styles.gettingThereText}>Entry: {entryWindow}</p>}
      {directions && (
        <a className={styles.gettingThereLink} href={directions} target="_blank" rel="noopener noreferrer">
          Get directions →
        </a>
      )}
      {anyYes && (
        <a
          className={styles.gettingThereLink}
          style={{ display: "block", marginTop: 6 }}
          href={`https://app.theutsavapp.com/p/${passCode}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View your gate pass →
        </a>
      )}

      {hasOutstationGuests && (venue || entryWindow) && <div className={styles.gettingThereDivider} />}
      {hasOutstationGuests && <TravelDetails passCode={passCode} initialTravel={initialTravel} />}
    </div>
  );
}
