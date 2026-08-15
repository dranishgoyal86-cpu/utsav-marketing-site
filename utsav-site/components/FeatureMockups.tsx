function RsvpBadge({ status }: { status: "attending" | "pending" | "declined" }) {
  const styles = {
    attending: "bg-accent-soft text-ink",
    pending: "bg-bg-subtle text-ink-secondary",
    declined: "bg-bg-subtle text-ink-faint",
  } as const;
  const labels = { attending: "Attending", pending: "Pending", declined: "Declined" };
  return (
    <span className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${styles[status]}`}>
      {labels[status]}
    </span>
  );
}

function Avatar({ initials }: { initials: string }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent-soft font-display text-xs font-bold text-ink">
      {initials}
    </div>
  );
}

export function GuestListCard() {
  const rows: {
    name: string;
    meta: string;
    status: "attending" | "pending" | "declined";
    initials: string;
  }[] = [
    { name: "Sharma family", meta: "Household · 4 guests", status: "attending", initials: "SF" },
    { name: "Rohan Mehta", meta: "+1 guest", status: "pending", initials: "RM" },
    { name: "Kapoor family", meta: "Household · 6 guests", status: "attending", initials: "KF" },
    { name: "Ayesha Khan", meta: "Solo", status: "declined", initials: "AK" },
  ];
  return (
    <div className="w-full rounded-3xl border border-border bg-surface-raised p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-display text-sm font-bold text-ink">Guest list</p>
        <p className="font-mono text-xs text-ink-faint">146 invited · 118 attending</p>
      </div>
      <ul className="flex flex-col gap-1">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center gap-3 rounded-xl px-1 py-2">
            <Avatar initials={r.initials} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-ink">{r.name}</p>
              <p className="truncate text-xs text-ink-secondary">{r.meta}</p>
            </div>
            <RsvpBadge status={r.status} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function InviteCard() {
  return (
    <div className="w-full max-w-sm rounded-3xl border border-border bg-surface-raised p-5 sm:p-6">
      <p className="mb-4 font-display text-sm font-bold text-ink">Digital invite</p>
      <div className="rounded-2xl bg-bg-subtle p-4">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">
            Auto-filled from event details
          </p>
          <p className="mt-2 font-display text-lg font-bold text-ink">Priya &amp; Arjun</p>
          <p className="text-sm text-ink-secondary">are getting married</p>
          <div className="mt-3 flex items-center gap-2 text-xs text-ink-secondary">
            <span className="font-mono">Sat, 14 Feb</span>
            <span className="text-ink-faint">·</span>
            <span>The Manor, Bengaluru</span>
          </div>
        </div>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.5-2.3-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2.1 3.2 5 4.4.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.1-1.4-.1-.1-.3-.2-.6-.3z" />
          </svg>
          Send via WhatsApp
        </button>
      </div>
    </div>
  );
}

export function GatePassCard() {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-3xl border border-border bg-surface-raised">
      <div className="flex items-center justify-between px-5 pt-5 sm:px-6 sm:pt-6">
        <p className="font-display text-sm font-bold text-ink">Gate pass</p>
        <span className="rounded-full bg-accent-soft px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-ink">
          Checked in
        </span>
      </div>
      <div className="flex items-center gap-4 px-5 py-5 sm:px-6">
        <QrGlyph />
        <div className="min-w-0">
          <p className="text-sm font-semibold text-ink">Neha Verma</p>
          <p className="font-mono text-xs text-ink-faint">PASS · UT-2461-KM</p>
          <p className="mt-1 text-xs text-ink-secondary">Sangeet Night · Gate 2</p>
        </div>
      </div>
      <div className="flex divide-x divide-border border-t border-border">
        <div className="flex-1 px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">Offline-first</p>
          <p className="mt-0.5 text-xs text-ink-secondary">Scans work with no signal</p>
        </div>
        <div className="flex-1 px-4 py-3">
          <p className="font-mono text-[10px] uppercase tracking-wide text-ink-faint">Geofenced</p>
          <p className="mt-0.5 text-xs text-ink-secondary">Auto check-in near venue</p>
        </div>
      </div>
    </div>
  );
}

function QrGlyph() {
  // Decorative QR-like glyph, not a scannable code.
  const cells = [
    1, 1, 1, 0, 1, 0, 1, 1, 1,
    1, 0, 1, 0, 0, 0, 1, 0, 1,
    1, 1, 1, 1, 0, 1, 1, 1, 1,
    0, 0, 1, 0, 1, 0, 0, 1, 0,
    1, 0, 0, 1, 1, 1, 0, 0, 1,
    0, 1, 1, 0, 0, 0, 1, 1, 0,
    1, 1, 1, 1, 0, 1, 1, 1, 1,
    1, 0, 0, 0, 1, 0, 0, 0, 1,
    1, 1, 0, 1, 0, 1, 1, 0, 1,
  ];
  return (
    <div
      aria-hidden="true"
      className="grid h-16 w-16 shrink-0 grid-cols-9 gap-[1.5px] rounded-lg bg-ink p-1.5"
    >
      {cells.map((c, i) => (
        <div key={i} className={c ? "bg-bg" : "bg-transparent"} />
      ))}
    </div>
  );
}

export function GiftCard() {
  const rows = [
    { name: "Reema & family", gift: "Silver dinner set", returned: true },
    { name: "Vikram Rao", gift: "Envelope · ₹5,100", returned: true },
    { name: "The Iyer household", gift: "Wall art", returned: false },
  ];
  return (
    <div className="w-full max-w-sm rounded-3xl border border-border bg-surface-raised p-5 sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <p className="font-display text-sm font-bold text-ink">Gifts &amp; return gifts</p>
        <p className="font-mono text-xs text-ink-faint">62 logged</p>
      </div>
      <ul className="flex flex-col gap-2.5">
        {rows.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-3">
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{r.name}</p>
              <p className="truncate text-xs text-ink-secondary">{r.gift}</p>
            </div>
            <span
              className={`shrink-0 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide ${
                r.returned ? "bg-accent-soft text-ink" : "bg-bg-subtle text-ink-faint"
              }`}
            >
              {r.returned ? "Return sent" : "Pending"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
