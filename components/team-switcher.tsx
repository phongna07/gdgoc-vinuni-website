"use client";

import Image from "next/image";
import { useState } from "react";
import type { Generation, Person } from "@/lib/types";

const RING = ["bg-g-blue", "bg-g-red", "bg-g-yellow", "bg-g-green"];

function PersonCard({ person, i }: { person: Person; i: number }) {
  const initials = person.name
    .split(" ")
    .slice(-2)
    .map((w) => w[0])
    .join("");
  return (
    <li className="card overflow-hidden">
      <div className={`relative aspect-[4/5] border-b-2 border-ink ${person.photo ? "bg-soft-blue" : RING[i % 4]}`}>
        {person.photo ? (
          <Image
            src={person.photo}
            alt={person.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover"
          />
        ) : (
          <span className="display absolute inset-0 flex items-center justify-center text-6xl text-white">
            {initials}
          </span>
        )}
        <span className={`absolute left-3 top-3 h-4 w-4 rounded border-2 border-ink ${RING[i % 4]}`} aria-hidden="true" />
      </div>
      <div className="p-4">
        <h4 className="display text-xl !leading-[1.1]">{person.name}</h4>
        <p className="mono mt-1.5 text-[0.7rem] uppercase leading-snug tracking-wider text-muted">{person.role}</p>
      </div>
    </li>
  );
}

export function TeamSwitcher({ generations }: { generations: Generation[] }) {
  const firstFilled = generations.find((g) => !g.placeholder) ?? generations[0];
  const [active, setActive] = useState(firstFilled.generation);
  const gen = generations.find((g) => g.generation === active) ?? firstFilled;

  return (
    <div>
      <div role="tablist" aria-label="Generation" className="flex flex-wrap gap-3">
        {generations.map((g) => {
          const selected = g.generation === active;
          return (
            <button
              key={g.generation}
              role="tab"
              type="button"
              id={`tab-gen-${g.generation}`}
              aria-selected={selected}
              aria-controls="gen-panel"
              onClick={() => setActive(g.generation)}
              className={`rounded-2xl border-2 border-ink px-5 py-3 text-left transition-all ${
                selected
                  ? "translate-x-[-2px] translate-y-[-2px] bg-ink text-white shadow-[5px_5px_0_0_var(--color-g-blue)]"
                  : "bg-white hover:bg-soft-yellow"
              }`}
            >
              <span className="display block text-2xl leading-none">Gen {g.generation}</span>
              <span className={`mono mt-1 block text-[0.65rem] uppercase tracking-wider ${selected ? "text-white/70" : "text-muted"}`}>
                {g.term}
              </span>
            </button>
          );
        })}
      </div>

      <div id="gen-panel" role="tabpanel" aria-labelledby={`tab-gen-${gen.generation}`} className="mt-10">
        <p className="mono text-xs uppercase tracking-widest text-muted">
          {gen.name} {"// "}
          {gen.term}
        </p>
        {gen.note && <p className="mt-3 max-w-2xl text-lg text-muted">{gen.note}</p>}

        {gen.placeholder ? (
          <div className="card mt-8 border-dashed bg-white/60 p-8 !shadow-none md:p-12">
            <p className="display text-3xl md:text-4xl">This roster is still being written.</p>
            <p className="mt-3 max-w-xl text-muted">
              Names and photos for Generation {gen.generation} have not been added yet. Check back soon.
            </p>
            <p className="mono mt-6 text-xs text-ink/40">content/team/gen-{gen.generation}.json</p>
          </div>
        ) : (
          <>
            {gen.leads.length > 0 && (
              <section className="mt-10">
                <h3 className="display text-3xl md:text-4xl">Core team</h3>
                <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
                  {gen.leads.map((p, i) => (
                    <PersonCard key={p.name} person={p} i={i} />
                  ))}
                </ul>
              </section>
            )}

            {gen.advisors.length > 0 && (
              <section className="mt-14">
                <h3 className="display text-3xl md:text-4xl">Advisors</h3>
                <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-5 lg:grid-cols-4">
                  {gen.advisors.map((p, i) => (
                    <PersonCard key={p.name} person={p} i={i + 2} />
                  ))}
                </ul>
              </section>
            )}

            {gen.teams.length > 0 && (
              <section className="mt-14">
                <h3 className="display text-3xl md:text-4xl">Members</h3>
                <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {gen.teams.map((t, i) => (
                    <li key={t.name} className="card p-5 md:p-6">
                      <p className="mono flex items-center gap-2 text-xs uppercase tracking-wider">
                        <span className={`h-3 w-3 rounded-sm border-[1.5px] border-ink ${RING[i % 4]}`} aria-hidden="true" />
                        {t.name}
                        <span className="ml-auto text-muted">{t.members.length}</span>
                      </p>
                      <ul className="mt-4 space-y-1.5">
                        {t.members.map((m) => (
                          <li key={m} className="font-medium">
                            {m}
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
}
