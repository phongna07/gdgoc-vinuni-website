"use client";

import { useMemo, useState } from "react";
import type { EventEntry } from "@/lib/types";
import { EventCard } from "./ui";

export function EventsExplorer({
  events,
  types,
}: {
  events: EventEntry[];
  types: { id: string; label: string }[];
}) {
  const [type, setType] = useState("all");
  const [year, setYear] = useState("all");

  const years = useMemo(() => Array.from(new Set(events.map((e) => e.year))).sort().reverse(), [events]);
  const shown = events.filter((e) => (type === "all" || e.type === type) && (year === "all" || e.year === year));

  const pill = (active: boolean) =>
    `mono rounded-full border-2 border-ink px-3.5 py-1.5 text-xs uppercase tracking-wider transition-colors ${
      active ? "bg-ink text-white" : "bg-white hover:bg-soft-yellow"
    }`;

  return (
    <div>
      <div className="card flex flex-col gap-4 p-4 md:flex-row md:items-center md:justify-between md:p-5">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by type">
          <span className="mono mr-1 text-xs text-muted">--type</span>
          <button type="button" className={pill(type === "all")} aria-pressed={type === "all"} onClick={() => setType("all")}>
            All
          </button>
          {types.map((t) => (
            <button key={t.id} type="button" className={pill(type === t.id)} aria-pressed={type === t.id} onClick={() => setType(t.id)}>
              {t.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filter by year">
          <span className="mono mr-1 text-xs text-muted">--year</span>
          <button type="button" className={pill(year === "all")} aria-pressed={year === "all"} onClick={() => setYear("all")}>
            All
          </button>
          {years.map((y) => (
            <button key={y} type="button" className={pill(year === y)} aria-pressed={year === y} onClick={() => setYear(y)}>
              {y}
            </button>
          ))}
        </div>
      </div>

      <p className="mono mt-6 text-xs uppercase tracking-widest text-muted" aria-live="polite">
        {shown.length} {shown.length === 1 ? "event" : "events"} found
      </p>

      {shown.length > 0 ? (
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((e) => (
            <li key={e.slug}>
              <EventCard event={e} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="card mt-5 p-10 text-center">
          <p className="display text-3xl">Nothing here yet.</p>
          <p className="mt-2 text-muted">No events match these filters. Try a different type or year.</p>
          <button
            type="button"
            className="btn btn-white mt-6"
            onClick={() => {
              setType("all");
              setYear("all");
            }}
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
