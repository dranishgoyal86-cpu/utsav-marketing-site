import "@fontsource/cormorant-garamond/600.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/manrope/400.css";
import "@fontsource/tiro-devanagari-hindi/400.css";
import type { Metadata } from "next";
import ToranCover from "./ToranCover";
import DriftController from "./DriftController";
import FunctionRsvps from "./FunctionRsvps";

type Props = {
  params: Promise<{ code: string }>;
};

type InviteData = {
  guestName: string;
  eventName: string;
  eventDate: string | null;
  venueName: string | null;
  venueAddress: string | null;
  functions: { id: string; name: string; date: string | null; time: string | null; status: "yes" | "no" | "pending" }[];
  partner1Name: string | null;
  partner2Name: string | null;
  hostedBy: string | null;
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
    guestName: inv.guestName,
    eventName: inv.eventName,
    eventDate: inv.eventDate,
    venueName: inv.venueName,
    venueAddress: inv.venueAddress,
    functions: inv.functions || [],
    partner1Name: inv.partner1Name || null,
    partner2Name: inv.partner2Name || null,
    hostedBy: inv.hostedBy || null,
  };
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

  return (
    <main style={{ minHeight: "100vh", padding: "40px 16px 64px", background: "#FBF8F4" }}>
      <DriftController>
        <ToranCover
          eventName={invite.eventName}
          eventDate={invite.eventDate}
          venue={invite.venueName || invite.venueAddress}
          partner1Name={invite.partner1Name}
          partner2Name={invite.partner2Name}
          hostedBy={invite.hostedBy}
        />
      </DriftController>
      <FunctionRsvps passCode={code} functions={invite.functions} />
    </main>
  );
}
