import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/gallery";
import { EventCard, Frame, TypeChip } from "@/components/ui";
import { getEvent, getEvents } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getEvents().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) return {};
  return {
    title: event.title,
    description: event.summary,
    openGraph: { title: event.title, description: event.summary, images: event.cover ? [event.cover.src] : [] },
  };
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const all = getEvents();
  const idx = all.findIndex((e) => e.slug === slug);
  const more = [all[idx + 1], all[idx - 1]].filter(Boolean).slice(0, 2);

  return (
    <article>
      <header className="border-b-2 border-ink">
        <div className="wrap rise pb-10 pt-10 md:pt-14">
          <p className="mono text-xs uppercase tracking-widest text-muted">
            <Link href="/events" className="underline underline-offset-4 hover:text-g-blue">
              ← /events
            </Link>
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <TypeChip type={event.type} />
            {event.role && <span className="chip bg-soft-yellow">{event.role}</span>}
          </div>
          <h1 className="display mt-5 max-w-5xl text-[clamp(2.4rem,7vw,5.5rem)]">{event.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted md:text-xl">{event.summary}</p>
        </div>
      </header>

      <div className="wrap mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-14">
        <div className="min-w-0">
          <Frame
            img={event.cover}
            alt={`${event.title} cover`}
            sizes="(min-width: 1024px) 60vw, 100vw"
            priority
            className="card aspect-[16/10] !bg-soft-blue"
          />
          <div className="prose mt-10 max-w-none" dangerouslySetInnerHTML={{ __html: event.html }} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <dl className="card divide-y-2 divide-ink overflow-hidden">
            <div className="p-5">
              <dt className="mono text-[0.7rem] uppercase tracking-widest text-muted">{"// when"}</dt>
              <dd className="display mt-1.5 text-2xl">{event.dateLabel}</dd>
            </div>
            {event.location && (
              <div className="p-5">
                <dt className="mono text-[0.7rem] uppercase tracking-widest text-muted">{"// where"}</dt>
                <dd className="mt-1.5 font-semibold leading-snug">{event.location}</dd>
              </div>
            )}
            {event.speakers.length > 0 && (
              <div className="p-5">
                <dt className="mono text-[0.7rem] uppercase tracking-widest text-muted">{"// speakers"}</dt>
                <dd className="mt-2">
                  <ul className="space-y-3">
                    {event.speakers.map((s) => (
                      <li key={s.name}>
                        <p className="font-semibold leading-snug">{s.name}</p>
                        {s.role && <p className="text-sm leading-snug text-muted">{s.role}</p>}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            )}
          </dl>
        </aside>
      </div>

      {event.gallery.length > 1 && (
        <section className="wrap mt-16">
          <h2 className="display text-4xl md:text-5xl">Photos</h2>
          <p className="mono mt-2 text-xs uppercase tracking-widest text-muted">
            {event.gallery.length} files in /images/events/{event.slug}
          </p>
          <div className="mt-8">
            <Gallery images={event.gallery} title={event.title} />
          </div>
        </section>
      )}

      {more.length > 0 && (
        <section className="wrap mt-20">
          <h2 className="display text-4xl md:text-5xl">More events</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {more.map((e) => (
              <li key={e.slug}>
                <EventCard event={e} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
