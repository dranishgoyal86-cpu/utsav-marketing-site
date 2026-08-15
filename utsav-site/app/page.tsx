import Image from "next/image";
import Nav from "@/components/Nav";
import SmartChecklist from "@/components/SmartChecklist";
import MomentsGallery from "@/components/MomentsGallery";
import {
  GuestListCard,
  InviteCard,
  GatePassCard,
  GiftCard,
} from "@/components/FeatureMockups";

function SectionEyebrow({
  children,
  color = "var(--accent)",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <p
      className="font-mono text-xs font-medium uppercase tracking-[0.14em]"
      style={{ color }}
    >
      {children}
    </p>
  );
}

function FeatureRow({
  eyebrow,
  title,
  description,
  bullets,
  mockup,
  reverse = false,
  id,
  color = "var(--accent)",
}: {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
  mockup: React.ReactNode;
  reverse?: boolean;
  id?: string;
  color?: string;
}) {
  return (
    <div
      id={id}
      className="grid scroll-mt-20 items-center gap-10 py-16 sm:py-20 md:grid-cols-2 md:gap-16"
    >
      <div className={reverse ? "md:order-2" : ""}>
        <SectionEyebrow color={color}>{eyebrow}</SectionEyebrow>
        <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {title}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-ink-secondary">{description}</p>
        <ul className="mt-6 flex flex-col gap-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2.5 text-sm text-ink-secondary">
              <svg
                className="mt-0.5 shrink-0"
                style={{ color }}
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M3.5 8.5 6.2 11 12.5 4.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className={`flex justify-center ${reverse ? "md:order-1" : ""}`}>{mockup}</div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div
            aria-hidden="true"
            className="hero-glow pointer-events-none absolute inset-x-0 top-0 -z-10 h-[720px] blur-3xl"
          />
          <div className="mx-auto max-w-6xl px-5 pt-16 sm:px-8 sm:pt-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-subtle px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              <span className="font-mono text-xs text-ink-secondary">
                Weddings · Birthdays · Housewarmings · Every celebration
              </span>
            </div>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.08] tracking-tight text-ink sm:text-6xl">
              Plan your event without any hassle.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-ink-secondary sm:text-xl">
              Utsav builds you a checklist that adapts to your event, keeps every
              guest and vendor in one place, and hands you the tools to run the
              whole thing — from the first booking to the last thank-you gift.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="https://www.theutsavapp.com/signup"
                className="w-full rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 sm:w-auto"
              >
                Start planning your event
              </a>
              {/* Intentional in-page anchor, not a dead placeholder — scrolls to the providers band below, which has the real signup CTA */}
              <a
                href="#providers"
                className="w-full rounded-full border border-border px-6 py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-border-strong sm:w-auto"
              >
                List your services
              </a>
            </div>
          </div>

          <div id="checklist" className="mx-auto mt-14 max-w-2xl scroll-mt-20 sm:mt-16">
            <SmartChecklist />
          </div>
          </div>
        </section>

        {/* Moments — real event photography goes here */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Every kind of celebration</SectionEyebrow>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              This is what it's actually for.
            </h3>
          </div>
          <div className="mt-10">
            <MomentsGallery />
          </div>
        </section>

        {/* Feature sections */}
        <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-5 sm:px-8">
          <div className="border-t border-border" />
          <FeatureRow
            id="guests"
            eyebrow="Guest management"
            color="var(--brand-blue)"
            title="Every guest, tracked the way your family actually thinks about them."
            description="RSVPs update in real time, plus-ones are counted automatically, and you can group guests by household so 'the Sharma family' shows up as one entry, not four."
            bullets={[
              "Live RSVP tracking with attending / pending / declined status",
              "Plus-ones counted against your total automatically",
              "Household and group entries for families and friend groups",
            ]}
            mockup={<GuestListCard />}
          />

          <div className="border-t border-border" />
          <FeatureRow
            reverse
            eyebrow="Digital invites"
            color="var(--brand-magenta)"
            title="Invites that fill themselves in and send themselves out."
            description="The moment your event details are set, your invite is ready — names, date, and venue pulled in automatically. Send it straight to WhatsApp, where most of your guest list already is."
            bullets={[
              "Auto-filled from your event details — no re-typing",
              "One tap to send via WhatsApp",
              "Every guest sees the same invite, formatted correctly",
            ]}
            mockup={<InviteCard />}
          />

          <div className="border-t border-border" />
          <FeatureRow
            eyebrow="Gate passes & check-in"
            color="var(--brand-violet)"
            title="Know exactly who's at the venue, even without signal."
            description="Every guest gets a QR gate pass. Scanning works offline and syncs when connectivity returns, and guests can be checked in automatically as they arrive within the venue's geofence."
            bullets={[
              "QR gate passes generated per guest",
              "Offline-first check-in — no dependency on venue Wi-Fi",
              "Geofenced auto check-in as guests arrive",
            ]}
            mockup={<GatePassCard />}
          />

          <div className="border-t border-border" />
          <FeatureRow
            reverse
            eyebrow="Gifts & return gifts"
            color="var(--brand-orange)"
            title="A running ledger so no thank-you gets missed."
            description="Log what came in as it arrives, and track which return gifts have gone out — so the week after the event isn't spent guessing who you still owe a thank-you to."
            bullets={[
              "Gift log tied to each guest or household",
              "Return-gift status tracked separately",
              "One view for what's in, what's out, what's pending",
            ]}
            mockup={<GiftCard />}
          />
          <div className="border-t border-border" />
        </section>

        {/* Multi-function tracking strip */}
        <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
          <div className="mx-auto max-w-2xl text-center">
            <SectionEyebrow>Multi-function events</SectionEyebrow>
            <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
              Haldi, Sangeet, and Reception — each tracked on its own.
            </h3>
            <p className="mt-4 text-base leading-relaxed text-ink-secondary">
              A wedding isn't one event, it's several. Utsav gives every function
              its own checklist, guest list, and gate passes, so a change to
              Sangeet doesn't touch Reception.
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
            {[
              { name: "Haldi", pct: 100, color: "var(--brand-orange)" },
              { name: "Sangeet", pct: 65, color: "var(--brand-magenta)" },
              { name: "Reception", pct: 20, color: "var(--brand-violet)" },
            ].map((fn) => (
              <div key={fn.name} className="rounded-2xl border border-border bg-surface-raised p-5">
                <div className="flex items-center justify-between">
                  <p className="font-display text-sm font-bold text-ink">{fn.name}</p>
                  <p className="font-mono text-xs text-ink-faint">{fn.pct}%</p>
                </div>
                <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-bg-subtle">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${fn.pct}%`, backgroundColor: fn.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Providers band */}
        <section id="providers" className="scroll-mt-20 border-y border-border bg-bg-subtle">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-20">
            <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
              <div>
                <SectionEyebrow>For providers</SectionEyebrow>
                <h3 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                  List your services. Run your bookings like a business.
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-secondary">
                  Caterers, decorators, photographers, and venues use Utsav as a
                  lightweight ERP: manage listings, track bookings, and talk to
                  customers already planning their event on the app.
                </p>
                <div className="mt-7">
                  <a
                    href="https://www.theutsavapp.com/signup"
                    className="inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90"
                  >
                    Become a provider
                  </a>
                </div>
              </div>
              <div className="rounded-3xl border border-border bg-surface-raised p-6">
                <ul className="flex flex-col divide-y divide-border">
                  {[
                    ["Listings", "Publish services with pricing, availability & photos"],
                    ["Bookings", "See every request and confirmed booking in one queue"],
                    ["Payments", "Track what's due, paid, and pending per event"],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft font-mono text-xs font-bold text-ink">
                        {title[0]}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-ink">{title}</p>
                        <p className="text-xs text-ink-secondary">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
            <Image
              src="/brand/logo-mark-64.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10"
            />
            <h3 className="font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">
              Plan your event without any hassle.
            </h3>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              <a
                href="https://www.theutsavapp.com/signup"
                className="w-full rounded-full bg-accent px-6 py-3 text-center text-sm font-semibold text-accent-ink transition-opacity hover:opacity-90 sm:w-auto"
              >
                Start planning your event
              </a>
              <a
                href="https://www.theutsavapp.com/signup"
                className="w-full rounded-full border border-border px-6 py-3 text-center text-sm font-semibold text-ink transition-colors hover:border-border-strong sm:w-auto"
              >
                List your services
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
          <div className="flex items-center gap-2.5">
            <Image
              src="/brand/logo-mark-64.png"
              alt=""
              width={24}
              height={24}
              className="h-6 w-6"
            />
            <span className="font-display text-base font-bold text-ink">Utsav</span>
          </div>
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                Product
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                <li><a href="#features" className="text-sm text-ink-secondary hover:text-ink">Features</a></li>
                <li><a href="#checklist" className="text-sm text-ink-secondary hover:text-ink">Smart checklist</a></li>
                <li><a href="#providers" className="text-sm text-ink-secondary hover:text-ink">For providers</a></li>
              </ul>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
                Account
              </p>
              <ul className="mt-3 flex flex-col gap-2">
                <li><a href="https://www.theutsavapp.com/login" className="text-sm text-ink-secondary hover:text-ink">Customer login</a></li>
                <li><a href="https://www.theutsavapp.com/login" className="text-sm text-ink-secondary hover:text-ink">Provider login</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-border px-5 py-6 sm:px-8">
          <p className="text-xs text-ink-faint">© {new Date().getFullYear()} Utsav. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}
