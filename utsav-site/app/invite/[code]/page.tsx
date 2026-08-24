import type { Metadata } from "next";
import Link from "next/link";

// Wave 0, Step 5 — connectivity test only. Hardcoded, no Supabase call.
// Confirms dynamic routing + per-page generateMetadata (WhatsApp/OG preview)
// actually work end to end on the live Cloudflare deployment before Wave 1
// wires this up to real invite data.

type Props = {
  params: Promise<{ code: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `You're invited! — Utsav`,
    description: `Test invite page for code ${code} — confirming dynamic per-page previews work.`,
    openGraph: {
      title: `You're invited! — Utsav`,
      description: "Someone's celebrating, and you're invited. Open to see the details.",
      images: ["/brand/og-image-1200x630.png"],
    },
  };
}

export default async function InviteTestPage({ params }: Props) {
  const { code } = await params;

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-bg px-6 text-center">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-accent">
        Wave 0 · Step 5 test route
      </p>
      <h1 className="text-3xl font-semibold text-ink">You&apos;re invited!</h1>
      <p className="text-ink-secondary">
        This is a hardcoded placeholder confirming dynamic routing works — no
        real invite data yet.
      </p>
      <p className="rounded-full border border-border bg-surface px-4 py-1.5 font-mono text-sm text-ink">
        code: {code}
      </p>
      <Link href="/" className="text-sm text-accent hover:underline">
        Back to homepage
      </Link>
    </main>
  );
}
