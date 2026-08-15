"use client";

import { useMemo, useState } from "react";

type EventType = "wedding" | "birthday" | "housewarming";
type Season = "summer" | "monsoon" | "winter";
type TimeOfDay = "day" | "night";
type Venue = "indoor" | "outdoor";
type WeddingFn = "haldi" | "sangeet" | "reception";

type Item = { id: string; label: string; tag: string };

const EVENT_TYPES: { id: EventType; label: string }[] = [
  { id: "wedding", label: "Wedding" },
  { id: "birthday", label: "Birthday" },
  { id: "housewarming", label: "Housewarming" },
];

const WEDDING_FUNCTIONS: { id: WeddingFn; label: string }[] = [
  { id: "haldi", label: "Haldi" },
  { id: "sangeet", label: "Sangeet" },
  { id: "reception", label: "Reception" },
];

function baseItems(type: EventType): Item[] {
  const common: Item[] = [
    { id: "venue", label: "Confirm venue booking", tag: "Venue" },
    { id: "guests", label: "Finalize guest list", tag: "Guests" },
    { id: "budget", label: "Set up budget tracker", tag: "Budget" },
  ];
  if (type === "wedding") {
    return [
      ...common,
      { id: "photo", label: "Book photographer & videographer", tag: "Vendors" },
      { id: "outfits", label: "Choose bridal & groom outfits", tag: "Attire" },
    ];
  }
  if (type === "birthday") {
    return [
      ...common,
      { id: "cake", label: "Order cake & theme décor", tag: "Décor" },
      { id: "games", label: "Plan games & entertainment", tag: "Entertainment" },
    ];
  }
  return [
    ...common,
    { id: "puja", label: "Arrange puja with pandit", tag: "Rituals" },
    { id: "kitchen", label: "Set up kitchen inauguration", tag: "Rituals" },
  ];
}

function seasonItems(season: Season, venue: Venue): Item[] {
  if (season === "summer") {
    return [
      { id: "s-shade", label: "Arrange shaded seating & cooling", tag: "Season" },
      { id: "s-water", label: "Add extra drinking water stations", tag: "Season" },
    ];
  }
  if (season === "monsoon") {
    const items: Item[] = [
      { id: "m-tent", label: "Book covered backup venue", tag: "Season" },
    ];
    if (venue === "outdoor") {
      items.push({ id: "m-mat", label: "Lay waterproof pathway matting", tag: "Season" });
    }
    return items;
  }
  const items: Item[] = [
    { id: "w-heat", label: "Arrange outdoor heating", tag: "Season" },
  ];
  return items;
}

function timeItems(time: TimeOfDay): Item[] {
  if (time === "night") {
    return [
      { id: "n-light", label: "Confirm lighting & sound vendor", tag: "Time" },
      { id: "n-food", label: "Set up late-night catering counter", tag: "Time" },
    ];
  }
  return [{ id: "d-tea", label: "Set up morning tea & snack counter", tag: "Time" }];
}

function venueItems(venue: Venue): Item[] {
  if (venue === "outdoor") {
    return [
      { id: "v-power", label: "Arrange generator / power backup", tag: "Venue" },
      { id: "v-weather", label: "Prepare weather contingency plan", tag: "Venue" },
    ];
  }
  return [{ id: "v-ac", label: "Check AC & ventilation with venue", tag: "Venue" }];
}

function dietItems(vegOnly: boolean): Item[] {
  return vegOnly
    ? [{ id: "diet-veg", label: "Confirm veg-only menu with caterer", tag: "Catering" }]
    : [{ id: "diet-mix", label: "Set up separate veg / non-veg live counters", tag: "Catering" }];
}

function functionItems(fn: WeddingFn): Item[] {
  if (fn === "haldi") {
    return [
      { id: "f-haldi-decor", label: "Arrange haldi décor & seating", tag: "Haldi" },
      { id: "f-haldi-outfit", label: "Order haldi outfits for close family", tag: "Haldi" },
    ];
  }
  if (fn === "sangeet") {
    return [
      { id: "f-sangeet-choreo", label: "Book choreographer", tag: "Sangeet" },
      { id: "f-sangeet-stage", label: "Set up stage & sound for performances", tag: "Sangeet" },
    ];
  }
  return [
    { id: "f-recep-backdrop", label: "Finalize reception stage backdrop", tag: "Reception" },
    { id: "f-recep-seating", label: "Confirm reception seating chart", tag: "Reception" },
  ];
}

export default function SmartChecklist() {
  const [type, setType] = useState<EventType>("wedding");
  const [season, setSeason] = useState<Season>("winter");
  const [time, setTime] = useState<TimeOfDay>("night");
  const [venue, setVenue] = useState<Venue>("outdoor");
  const [vegOnly, setVegOnly] = useState(false);
  const [functions, setFunctions] = useState<WeddingFn[]>(["haldi", "sangeet"]);
  const [checked, setChecked] = useState<Record<string, boolean>>({ venue: true, guests: true });

  const items = useMemo(() => {
    let list = [
      ...baseItems(type),
      ...seasonItems(season, venue),
      ...timeItems(time),
      ...venueItems(venue),
      ...dietItems(vegOnly),
    ];
    if (type === "wedding") {
      for (const fn of functions) list = [...list, ...functionItems(fn)];
    }
    return list;
  }, [type, season, time, venue, vegOnly, functions]);

  const doneCount = items.filter((i) => checked[i.id]).length;

  function toggleFunction(fn: WeddingFn) {
    setFunctions((prev) => (prev.includes(fn) ? prev.filter((f) => f !== fn) : [...prev, fn]));
  }

  return (
    <div className="w-full rounded-3xl border border-border bg-surface-raised shadow-[0_1px_2px_rgba(var(--shadow-color)/0.04)]">
      <div className="border-b border-border px-5 py-4 sm:px-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-faint">
          Live preview · your checklist rebuilds as you change details
        </p>
      </div>

      <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:px-6">
        <div className="flex flex-wrap gap-2">
          {EVENT_TYPES.map((t) => (
            <button
              key={t.id}
              onClick={() => setType(t.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
                type === t.id
                  ? "bg-accent text-accent-ink"
                  : "border border-border text-ink-secondary hover:border-border-strong hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {type === "wedding" && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
              Functions
            </span>
            {WEDDING_FUNCTIONS.map((fn) => (
              <button
                key={fn.id}
                onClick={() => toggleFunction(fn.id)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  functions.includes(fn.id)
                    ? "border-accent bg-accent-soft text-ink"
                    : "border-border text-ink-secondary hover:border-border-strong"
                }`}
              >
                {fn.label}
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <SegmentGroup
            label="Season"
            value={season}
            onChange={(v) => setSeason(v as Season)}
            options={[
              { id: "summer", label: "Summer" },
              { id: "monsoon", label: "Monsoon" },
              { id: "winter", label: "Winter" },
            ]}
          />
          <SegmentGroup
            label="Time"
            value={time}
            onChange={(v) => setTime(v as TimeOfDay)}
            options={[
              { id: "day", label: "Day" },
              { id: "night", label: "Night" },
            ]}
          />
          <SegmentGroup
            label="Venue"
            value={venue}
            onChange={(v) => setVenue(v as Venue)}
            options={[
              { id: "indoor", label: "Indoor" },
              { id: "outdoor", label: "Outdoor" },
            ]}
          />
          <label className="flex items-center gap-2 text-ink-secondary">
            <input
              type="checkbox"
              checked={vegOnly}
              onChange={(e) => setVegOnly(e.target.checked)}
              className="h-4 w-4 rounded border-border-strong accent-[var(--accent)]"
            />
            Veg-only menu
          </label>
        </div>
      </div>

      <div className="px-5 py-5 sm:px-6">
        <div className="mb-3 flex items-center justify-between">
          <p className="text-sm font-medium text-ink-secondary">
            {items.length} tasks for this event
          </p>
          <p className="font-mono text-xs text-ink-faint">
            {doneCount}/{items.length} done
          </p>
        </div>
        <ul className="flex flex-col gap-1.5">
          {items.map((item) => (
            <li key={item.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-bg-subtle">
                <input
                  type="checkbox"
                  checked={!!checked[item.id]}
                  onChange={() =>
                    setChecked((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                  }
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-border-strong accent-[var(--accent)]"
                />
                <span
                  className={`flex-1 text-sm ${
                    checked[item.id] ? "text-ink-faint line-through" : "text-ink"
                  }`}
                >
                  {item.label}
                </span>
                <span className="shrink-0 rounded-full bg-bg-subtle px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-ink-faint">
                  {item.tag}
                </span>
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SegmentGroup({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { id: string; label: string }[];
}) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-faint">
        {label}
      </span>
      <div className="flex overflow-hidden rounded-full border border-border">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => onChange(opt.id)}
            className={`px-2.5 py-1 text-xs font-medium transition-colors ${
              value === opt.id
                ? "bg-ink text-bg"
                : "text-ink-secondary hover:bg-bg-subtle"
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
