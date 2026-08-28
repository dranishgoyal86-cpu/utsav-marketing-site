import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/manrope/400.css";
import "@fontsource/tiro-devanagari-hindi/400.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/300-italic.css";
import "@fontsource/fraunces/700.css";
import type { Metadata } from "next";
import ToranCover from "./ToranCover";
import KalamkariCover from "./KalamkariCover";
import IvoryCover from "./IvoryCover";
import StillnessCover from "./StillnessCover";
import DiyaCover from "./DiyaCover";
import DriftController from "./DriftController";
import CoupleFrame from "./CoupleFrame";
import FunctionRsvps from "./FunctionRsvps";
import GettingThere from "./GettingThere";
import WishingWall from "./WishingWall";

type Props = {
  params: Promise<{ code: string }>;
};

type InviteData = {
  design: string;
  guestName: string;
  eventName: string;
  eventDate: string | null;
  venueName: string | null;
  venueAddress: string | null;
  entryWindow: string | null;
  functions: { id: string; name: string; date: string | null; time: string | null; status: "yes" | "no" | "pending"; templateId: string | null; headlineText: string | null }[];
  partner1Name: string | null;
  partner2Name: string | null;
  hostedBy: string | null;
  couplePhotoUrl: string | null;
  coupleQuote: string | null;
  kickerText: string | null;
  headlineText: string | null;
  subjectNameLine1: string | null;
  subjectNameLine2: string | null;
  subjectYears: string | null;
  detailLine1: string | null;
  detailLine2: string | null;
  venueLat: number | null;
  venueLng: number | null;
  mapsLink: string | null;
  hasOutstationGuests: boolean;
  travel: {
    is_outstation: boolean;
    arrival_date: string | null;
    arrival_time: string | null;
    departure_date: string | null;
    departure_time: string | null;
    pickup_needed: boolean;
  } | null;
} | null;

const SUPABASE_URL = "https://puvhqusauipotmiicrrm.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_ie07f0f9_X8VuS5LPxPD-g_fTxCoPHN";

// Server-side only — no client-side Supabase calls, matching every other
// guest-facing surface in this codebase. Used by both generateMetadata and
// the page itself; Next.js dedupes identical fetches within one request.
async function fetchInvite(code: string): Promise<InviteData> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/guest-pass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ action: "get_invite", pass_code: code }),
    cache: "no-store",
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (data.error || !data.invite) return null;
  const inv = data.invite;
  return {
    design: inv.design || "toran",
    guestName: inv.guestName,
    eventName: inv.eventName,
    eventDate: inv.eventDate,
    venueName: inv.venueName,
    venueAddress: inv.venueAddress,
    entryWindow: inv.entryWindow,
    functions: inv.functions || [],
    partner1Name: inv.partner1Name || null,
    partner2Name: inv.partner2Name || null,
    hostedBy: inv.hostedBy || null,
    couplePhotoUrl: inv.couplePhotoUrl || null,
    coupleQuote: inv.coupleQuote || null,
    kickerText: inv.kickerText || null,
    headlineText: inv.headlineText || null,
    subjectNameLine1: inv.subjectNameLine1 || null,
    subjectNameLine2: inv.subjectNameLine2 || null,
    subjectYears: inv.subjectYears || null,
    detailLine1: inv.detailLine1 || null,
    detailLine2: inv.detailLine2 || null,
    venueLat: inv.venueLat ?? null,
    venueLng: inv.venueLng ?? null,
    mapsLink: inv.mapsLink || null,
    hasOutstationGuests: !!inv.hasOutstationGuests,
    travel: inv.travel || null,
  };
}

async function fetchWishes(code: string) {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/guest-pass`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ action: "get_wishes", pass_code: code }),
    cache: "no-store",
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.wishes || [];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  const invite = await fetchInvite(code);

  if (!invite) {
    return {
      title: "Invite not found — Utsav",
      description: "This invite link isn't valid. Check the link and try again.",
    };
  }

  const title = `You're invited, ${invite.guestName}! — ${invite.eventName}`;
  const description = invite.venueName || invite.venueAddress
    ? `Join us at ${invite.eventName}, at ${invite.venueName || invite.venueAddress}.`
    : `Join us at ${invite.eventName}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ["/brand/og-image-1200x630.png"],
    },
  };
}

export default async function InvitePage({ params }: Props) {
  const { code } = await params;
  const invite = await fetchInvite(code);

  if (!invite) {
    return (
      <main style={{ display: "flex", minHeight: "100vh", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}>
        <p style={{ fontFamily: "Manrope, sans-serif", color: "#6E6259" }}>
          This invite link isn&apos;t valid. Check the link and try again.
        </p>
      </main>
    );
  }

  // Wave 6: Stillness is a different page, not a third Unveil/Drift
  // variant sharing the multi-pane layout below. No DriftController (that
  // component only exists to pause the Toran/Kalamkari petal-fall layer —
  // there is no such layer here), no couple/functions/getting-there/
  // wishing-wall panes. Single card, nothing else, per the reference.
  if (invite.design === "stillness") {
    return (
      <main style={{ minHeight: "100vh", padding: "40px 16px 64px", background: "#FBF8F4", display: "flex", alignItems: "center" }}>
        <StillnessCover
          nameLine1={invite.subjectNameLine1}
          nameLine2={invite.subjectNameLine2}
          years={invite.subjectYears}
          detailLine1={invite.detailLine1}
          detailLine2={invite.detailLine2}
        />
      </main>
    );
  }

  const wishes = await fetchWishes(code);

  return (
    <main style={{ minHeight: "100vh", padding: "40px 16px 64px", background: "#FBF8F4" }}>
      <DriftController>
        {invite.design === "kalamkari" ? (
          <KalamkariCover
            eventName={invite.eventName}
            eventDate={invite.eventDate}
            venue={invite.venueName || invite.venueAddress}
            partner1Name={invite.partner1Name}
            partner2Name={invite.partner2Name}
            hostedBy={invite.hostedBy}
          />
        ) : invite.design === "ivory" ? (
          <IvoryCover
            eventName={invite.eventName}
            eventDate={invite.eventDate}
            venue={invite.venueName || invite.venueAddress}
            partner1Name={invite.partner1Name}
            partner2Name={invite.partner2Name}
            hostedBy={invite.hostedBy}
            kickerText={invite.kickerText}
          />
        ) : invite.design === "diya" ? (
          <DiyaCover
            eventName={invite.eventName}
            eventDate={invite.eventDate}
            venue={invite.venueName || invite.venueAddress}
            hostedBy={invite.hostedBy}
            kickerText={invite.kickerText}
            headlineText={invite.headlineText}
          />
        ) : (
          <ToranCover
            eventName={invite.eventName}
            eventDate={invite.eventDate}
            venue={invite.venueName || invite.venueAddress}
            partner1Name={invite.partner1Name}
            partner2Name={invite.partner2Name}
            hostedBy={invite.hostedBy}
          />
        )}
      </DriftController>
      <CoupleFrame photoUrl={invite.couplePhotoUrl} quote={invite.coupleQuote} />
      {/* Wave 11 — a function's own card (when it has a template_id set)
          needs the event's own identity to render Toran/Kalamkari/Ivory/
          Stillness correctly (couple names, subject name/years) — Night
          Bloom/Diya's per-function cards ignore these, they have no couple. */}
      <FunctionRsvps
        passCode={code}
        functions={invite.functions}
        eventName={invite.eventName}
        venue={invite.venueName || invite.venueAddress}
        partner1Name={invite.partner1Name}
        partner2Name={invite.partner2Name}
        hostedBy={invite.hostedBy}
        kickerText={invite.kickerText}
        subjectNameLine1={invite.subjectNameLine1}
        subjectNameLine2={invite.subjectNameLine2}
        subjectYears={invite.subjectYears}
      />
      <GettingThere
        passCode={code}
        venueName={invite.venueName}
        venueAddress={invite.venueAddress}
        venueLat={invite.venueLat}
        venueLng={invite.venueLng}
        mapsLink={invite.mapsLink}
        entryWindow={invite.entryWindow}
        anyYes={invite.functions.some((f) => f.status === "yes")}
        hasOutstationGuests={invite.hasOutstationGuests}
        initialTravel={invite.travel}
      />
      <WishingWall passCode={code} eventName={invite.eventName} initialWishes={wishes} />
    </main>
  );
}
