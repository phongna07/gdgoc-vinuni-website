import type { Metadata } from "next";
import Link from "next/link";
import { ACCENT_BG, ACCENT_SOFT, PageHeader, SectionHeading } from "@/components/ui";
import { departments, site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Join us",
  description: "The four stations of GDG on Campus VinUniversity and how recruitment works.",
};

export default function JoinPage() {
  const r = site.recruitment;
  const facebook = site.socials.find((s) => s.label === "Facebook")?.href ?? "#";

  return (
    <>
      <PageHeader
        path="/join"
        title={
          <>
            Build your <span className="text-g-blue">next</span>
          </>
        }
      >
        You do not need to be perfect to start. You need to be willing to learn and ready to try. Here is where
        you could fit, and how to get in.
      </PageHeader>

      {/* status */}
      <section className="wrap mt-12">
        <div className={`card flex flex-col gap-6 p-6 md:flex-row md:items-center md:justify-between md:p-8 ${r.open ? "bg-soft-green" : "bg-soft-yellow"}`}>
          <div>
            <p className="mono flex items-center gap-2.5 text-xs uppercase tracking-widest">
              <span className={`h-3 w-3 rounded-full border-2 border-ink ${r.open ? "bg-g-green" : "bg-g-red"}`} aria-hidden="true" />
              Gen {r.generation} recruitment {"// "}
              {r.open ? "open" : "closed"}
            </p>
            <p className="display mt-3 text-3xl md:text-4xl">
              {r.open ? `Applications are open: ${r.period}` : "Applications are closed for now."}
            </p>
            {!r.open && <p className="mt-2 max-w-2xl text-ink/75">{r.closedMessage}</p>}
          </div>
          <div className="flex shrink-0 flex-wrap gap-3">
            {r.open && r.applyUrl ? (
              <a href={r.applyUrl} target="_blank" rel="noreferrer" className="btn btn-blue">
                Apply now <span aria-hidden="true">→</span>
              </a>
            ) : (
              <a href={facebook} target="_blank" rel="noreferrer" className="btn btn-ink">
                Follow on Facebook <span aria-hidden="true">↗</span>
              </a>
            )}
            {r.open && r.jobDescriptionUrl && (
              <a href={r.jobDescriptionUrl} target="_blank" rel="noreferrer" className="btn btn-white">
                Job description
              </a>
            )}
          </div>
        </div>
      </section>

      {/* stations */}
      <section className="wrap mt-24">
        <SectionHeading index="01" label="four stations" title="Choose your station.">
          Three departments run the club. The fourth station is open membership, for anyone who wants to take part
          without department duties.
        </SectionHeading>

        <div className="space-y-6">
          {departments.map((d) => (
            <article key={d.id} id={d.id} data-reveal className={`card overflow-hidden ${ACCENT_SOFT[d.color]}`}>
              <div className="grid lg:grid-cols-[1fr_1.25fr]">
                <div className="p-6 md:p-9">
                  <span className={`chip !border-2 ${ACCENT_BG[d.color]} ${d.color === "yellow" ? "" : "!text-white"}`}>
                    Station {d.station}
                  </span>
                  <h3 className="display mt-4 text-4xl md:text-5xl">{d.name}</h3>
                  <p className="mt-4 text-lg leading-relaxed text-ink/75">{d.summary}</p>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {d.tracks.map((t) => (
                      <li key={t} className="chip">
                        {t}
                      </li>
                    ))}
                  </ul>
                  <p className="mono mt-6 text-xs uppercase tracking-wider text-ink/60">Open to: {d.openTo}</p>
                </div>
                <div className="grid gap-4 border-t-2 border-ink p-6 sm:grid-cols-2 md:p-9 lg:border-l-2 lg:border-t-0">
                  {[
                    { label: "What you get", items: d.benefits },
                    { label: d.id === "community" ? "How it works" : d.id === "marcom" ? "What you will do" : "What we ask", items: d.requirements },
                  ].map((col) => (
                    <div key={col.label} className="rounded-xl border-2 border-ink bg-white p-5">
                      <h4 className="mono text-xs uppercase tracking-widest text-muted">{col.label}</h4>
                      <ul className="mt-3 space-y-2.5">
                        {col.items.map((it) => (
                          <li key={it} className="flex gap-2.5 text-[0.95rem] leading-snug">
                            <span className={`mt-1 h-3 w-3 shrink-0 rounded-sm border-[1.5px] border-ink ${ACCENT_BG[d.color]}`} aria-hidden="true" />
                            {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* process */}
      <section className="wrap mt-24">
        <SectionHeading index="02" label="process" title="How recruitment works." />
        <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {r.steps.map((s, i) => (
            <li key={s.title} data-reveal className="card relative p-6">
              <span className="display text-6xl text-ink/15" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-1 text-2xl">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
            </li>
          ))}
        </ol>

        <div data-reveal className="card mt-5 flex flex-col gap-5 bg-ink p-6 text-white md:flex-row md:items-center md:justify-between md:p-8">
          <div>
            <p className="display text-3xl">Preparing for the interview?</p>
            <p className="mt-1 text-white/70">Each department wrote down what it looks for and how to prepare.</p>
          </div>
          <Link href="/articles/interview-tips" className="btn btn-yellow shrink-0">
            Read the tips <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* contact */}
      <section className="wrap mt-24">
        <SectionHeading index="03" label="contact" title="Questions? Ask away." />
        <ul className="grid gap-5 sm:grid-cols-2">
          {site.email.map((e) => (
            <li key={e} data-reveal>
              <a href={`mailto:${e}`} className="card card-link block p-6">
                <span className="mono text-xs uppercase tracking-widest text-muted">Email</span>
                <span className="display mt-2 block break-all text-2xl md:text-3xl">{e}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
