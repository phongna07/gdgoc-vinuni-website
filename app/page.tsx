import Image from "next/image";
import Link from "next/link";
import { HeroBlocks } from "@/components/hero-blocks";
import { TimelineScroller } from "@/components/timeline-scroller";
import {
  ACCENT_BG,
  ACCENT_SOFT,
  ArticleCard,
  EventCard,
  JoinBanner,
  SectionHeading,
} from "@/components/ui";
import {
  departments,
  formatMonth,
  getArticles,
  getEvents,
  getPhotoWall,
  site,
  timeline,
} from "@/lib/content";

const TICKER = ["Learn", "Build", "Connect", "Ship", "Workshops", "Hackathons", "Study jams", "Community"];

export default function HomePage() {
  const events = getEvents();
  const featured = events.filter((e) => e.featured);
  const [lead, ...rest] = featured.length ? featured : events;
  const articles = getArticles().slice(0, 3);
  const wall = getPhotoWall();
  const { recruitment } = site;

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="relative overflow-hidden border-b-2 border-ink">
        <div className="wrap pb-12 pt-6 md:pb-16 md:pt-8">
          <div className="mono flex items-center justify-between text-[0.7rem] uppercase tracking-widest text-muted">
            <span>{"> initializing next_generation..."}</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-g-green" aria-hidden="true" />
              {site.version} {"// online"}
            </span>
          </div>

          <div className="crop mt-5 grid items-end gap-10 px-1 py-6 md:mt-6 md:py-10 lg:grid-cols-[1.25fr_1fr]">
            <div>
              <p className="rise mono inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3 py-1.5 text-[0.7rem] uppercase tracking-widest">
                <span className="rounded-full bg-g-yellow px-1.5 font-bold">GEN 0{site.generation}</span>
                Google Developer Group on Campus · VinUniversity
              </p>

              <h1 className="display mt-6 text-hero uppercase">
                <span className="rise block">Build</span>
                <span className="rise block" style={{ animationDelay: "0.08s" }}>
                  Your
                </span>
                <span className="rise block text-g-blue" style={{ animationDelay: "0.16s" }}>
                  Next<span className="cursor text-ink">_</span>
                </span>
              </h1>

              <p className="rise mt-6 max-w-lg leading-relaxed text-muted md:text-lg" style={{ animationDelay: "0.3s" }}>
                We are the student developer community at VinUniversity. We learn new technology, build real things
                with it, and do it together.
              </p>

              <div className="rise mt-7 flex flex-wrap gap-3" style={{ animationDelay: "0.4s" }}>
                <Link href="/join" className="btn btn-blue">
                  {recruitment.open ? "Apply now" : "Join us"} <span aria-hidden="true">→</span>
                </Link>
                <Link href="/events" className="btn btn-white">
                  See our events
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-start gap-7 lg:items-end">
              <HeroBlocks />
              <div className="w-full max-w-[19rem]">
                <p className="mono text-[0.8rem]">
                  <span className="text-g-blue">{">"}</span> build(<span className="text-g-red">your</span>.
                  <span className="text-g-green">next</span>)
                </p>
                <div className="mt-2.5 h-2.5 overflow-hidden rounded-full border-2 border-ink bg-white">
                  <div className="load-bar h-full bg-g-blue" />
                </div>
                <p className="mono mt-2 flex justify-between text-[0.65rem] uppercase tracking-widest text-muted">
                  <span>gen {site.generation} loaded</span>
                  <span>100%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- ticker ---------- */}
      <div className="overflow-hidden border-b-2 border-ink bg-ink py-2.5 text-white" aria-hidden="true">
        <div className="marquee flex w-max">
          {[0, 1].map((n) => (
            <div key={n} className="flex shrink-0 items-center">
              {TICKER.map((word, i) => (
                <span key={word} className="display flex items-center text-lg uppercase md:text-xl">
                  <span className="px-5">{word}</span>
                  <span
                    className={`h-2.5 w-2.5 rounded-[3px] ${["bg-g-blue", "bg-g-red", "bg-g-yellow", "bg-g-green"][i % 4]}`}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ---------- who we are ---------- */}
      <section className="wrap mt-16 md:mt-20">
        <SectionHeading index="01" label="who we are" title={<>A community that learns by building.</>}>
          {site.description}
        </SectionHeading>

        <div className="grid gap-4 md:grid-cols-3">
          {site.pillars.map((p, i) => (
            <article
              key={p.title}
              data-reveal
              className="card p-5 md:p-6"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <span
                className={`mono inline-flex h-8 w-8 items-center justify-center rounded-lg border-2 border-ink text-xs font-bold ${
                  ["bg-g-yellow", "bg-g-red text-white", "bg-g-green text-white"][i % 3]
                }`}
              >
                {i + 1}
              </span>
              <h3 className="display mt-4 text-xl">{p.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{p.text}</p>
            </article>
          ))}
        </div>

        <dl data-reveal className="card mt-4 grid grid-cols-2 overflow-hidden md:grid-cols-4">
          {site.stats.map((s, i) => (
            <div
              key={s.label}
              className={`p-5 md:p-6 ${i % 2 === 1 ? "border-l-2 border-ink" : ""} ${
                i >= 2 ? "border-t-2 border-ink md:border-t-0" : ""
              } ${i === 2 ? "md:border-l-2" : ""}`}
            >
              <dt className="mono order-2 text-[0.7rem] uppercase tracking-widest text-muted">{s.label}</dt>
              <dd className="display mt-1.5 text-4xl md:text-5xl">{s.value}</dd>
            </div>
          ))}
        </dl>

        <p data-reveal className="mt-6">
          <Link href="/about" className="mono text-xs uppercase tracking-wider underline decoration-2 underline-offset-4 hover:text-g-blue">
            Read our story →
          </Link>
        </p>
      </section>

      {/* ---------- stations ---------- */}
      <section className="wrap mt-20">
        <SectionHeading
          index="02"
          label="four stations"
          title={<>Find the station where you build.</>}
          action={
            <Link href="/join" className="btn btn-white">
              How to join <span aria-hidden="true">→</span>
            </Link>
          }
        >
          Every member finds a role that fits. Three departments run the club, and a fourth station keeps the door
          open to anyone who wants to learn with us.
        </SectionHeading>

        <div className="grid gap-4 sm:grid-cols-2">
          {departments.map((d) => (
            <Link
              key={d.id}
              href={`/join#${d.id}`}
              data-reveal
              className={`card card-link group flex flex-col p-5 md:p-6 ${ACCENT_SOFT[d.color]}`}
            >
              <div className="flex items-start justify-between">
                <span className={`chip !border-2 ${ACCENT_BG[d.color]} ${d.color === "yellow" ? "" : "!text-white"}`}>
                  Station {d.station}
                </span>
                <span className="display text-5xl text-ink/15 md:text-6xl" aria-hidden="true">
                  {d.station}
                </span>
              </div>
              <h3 className="display mt-1 text-2xl md:text-[2rem]">{d.name}</h3>
              <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-ink/75">{d.summary}</p>
              <ul className="mt-5 flex flex-wrap gap-1.5">
                {d.tracks.map((t) => (
                  <li key={t} className="chip">
                    {t}
                  </li>
                ))}
              </ul>
              <p className="mono mt-auto pt-5 text-xs uppercase tracking-wider">
                Open station{" "}
                <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* ---------- events ---------- */}
      <section className="wrap mt-20">
        <SectionHeading
          index="03"
          label="events"
          title={<>What we have shipped so far.</>}
          action={
            <Link href="/events" className="btn btn-white">
              All {events.length} events <span aria-hidden="true">→</span>
            </Link>
          }
        >
          Workshops with engineers from industry, a national hackathon hosted on our campus, and evenings where the
          only agenda is to share what we know.
        </SectionHeading>

        <div className="grid gap-4 lg:grid-cols-[1.35fr_1fr]">
          {lead && (
            <div data-reveal>
              <EventCard event={lead} large />
            </div>
          )}
          <ul className="flex flex-col gap-4">
            {rest.slice(0, 4).map((e) => (
              <li key={e.slug} data-reveal>
                <Link href={`/events/${e.slug}`} className="card card-link group flex items-stretch overflow-hidden">
                  <div className="relative w-24 shrink-0 border-r-2 border-ink bg-soft-blue sm:w-32">
                    {e.cover && (
                      <Image src={e.cover.src} alt="" fill sizes="128px" className="object-cover" />
                    )}
                  </div>
                  <div className="min-w-0 px-4 py-3.5">
                    <p className="mono text-[0.7rem] uppercase tracking-wider text-muted">{e.dateLabel}</p>
                    <h3 className="display mt-1 text-lg !leading-[1.1] sm:text-xl">{e.title}</h3>
                    <p className="mt-1 line-clamp-2 text-[0.82rem] text-muted">{e.summary}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- timeline ---------- */}
      <section className="mt-20 border-y-2 border-ink bg-white/70 py-14">
        <div className="wrap">
          <SectionHeading index="04" label="git log" title={<>From GDSC to Gen {site.generation}.</>}>
            A short commit history of the chapter, from the first post in September {site.foundedYear} to today.
          </SectionHeading>
          <TimelineScroller>
            <ol className="flex w-max min-w-full gap-6 pr-2">
              {timeline.map((m, i) => (
                <li key={m.date + m.tag} className="group relative w-60 shrink-0 pt-7 sm:w-64">
                  <span
                    className="absolute left-0 right-[-1.5rem] top-[9px] h-0.5 bg-ink group-last:right-0"
                    aria-hidden="true"
                  />
                  <span
                    className={`absolute left-0 top-0 h-5 w-5 rounded-md border-2 border-ink ${ACCENT_BG[m.color]}`}
                    aria-hidden="true"
                  />
                  <p className="mono mt-3 text-xs uppercase tracking-wider text-muted">
                    <time dateTime={m.date} className="text-ink">{formatMonth(m.date)}</time> · {m.tag}
                  </p>
                  <h3 className="display mt-2 text-xl !leading-[1.08]">{m.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{m.text}</p>
                  <p className="mono mt-3 text-[0.65rem] text-muted">commit {String(i + 1).padStart(2, "0")}</p>
                </li>
              ))}
            </ol>
          </TimelineScroller>
        </div>
      </section>

      {/* ---------- articles ---------- */}
      <section className="wrap mt-20">
        <SectionHeading
          index="05"
          label="articles"
          title={<>Stories from the community.</>}
          action={
            <Link href="/articles" className="btn btn-white">
              All articles <span aria-hidden="true">→</span>
            </Link>
          }
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a, i) => (
            <div key={a.slug} data-reveal style={{ animationDelay: `${i * 60}ms` }}>
              <ArticleCard article={a} />
            </div>
          ))}
        </div>
      </section>

      {/* ---------- photo wall ---------- */}
      {wall.length > 0 && (
        <section className="wrap mt-20">
          <SectionHeading index="06" label="photo wall" title={<>Faces behind the code.</>} />
          <div className="columns-2 gap-3.5 md:columns-3 lg:columns-4 [&>*]:mb-3.5">
            {wall.map((img, i) => (
              <figure
                key={img.src}
                data-reveal
                className={`break-inside-avoid overflow-hidden rounded-xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)] ${
                  i % 3 === 0 ? "rotate-[-1.2deg]" : i % 3 === 1 ? "rotate-[0.8deg]" : ""
                }`}
              >
                <Image
                  src={img.src}
                  alt="GDGoC VinUni members at a club event"
                  width={img.width}
                  height={img.height}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="h-auto w-full"
                />
              </figure>
            ))}
          </div>
        </section>
      )}

      <JoinBanner open={recruitment.open} period={recruitment.period} generation={recruitment.generation} />
    </>
  );
}
