import Image from "next/image";
import Link from "next/link";
import type { Accent, Article, EventEntry, Img } from "@/lib/types";
import { EVENT_TYPES } from "@/lib/types";

export const ACCENT_BG: Record<Accent, string> = {
  blue: "bg-g-blue",
  red: "bg-g-red",
  yellow: "bg-g-yellow",
  green: "bg-g-green",
};

export const ACCENT_SOFT: Record<Accent, string> = {
  blue: "bg-soft-blue",
  red: "bg-soft-red",
  yellow: "bg-soft-yellow",
  green: "bg-soft-green",
};

/** Three stacked blocks: the small section marker used across the site. */
export function BlockMark({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-grid grid-cols-2 gap-[3px] ${className}`} aria-hidden="true">
      <span />
      <span className="h-2.5 w-2.5 rounded-[3px] border-[1.5px] border-ink bg-g-red" />
      <span className="h-2.5 w-2.5 rounded-[3px] border-[1.5px] border-ink bg-g-yellow" />
      <span className="h-2.5 w-2.5 rounded-[3px] border-[1.5px] border-ink bg-g-blue" />
    </span>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  children,
  action,
}: {
  index: string;
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div data-reveal className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <p className="mono flex items-center gap-3 text-xs uppercase tracking-widest text-muted">
          <BlockMark />
          <span>
            {index} {"// "}
            {label}
          </span>
        </p>
        <h2 className="display mt-3 text-section">{title}</h2>
        {children && <p className="mt-4 max-w-2xl leading-relaxed text-muted">{children}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export function PageHeader({
  path,
  title,
  children,
}: {
  path: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b-2 border-ink">
      <div className="wrap rise pb-10 pt-10 md:pb-12 md:pt-14">
        <p className="mono text-xs uppercase tracking-widest text-muted">
          <span className="text-g-blue">~</span>
          {path} <span className="cursor">▌</span>
        </p>
        <h1 className="display mt-4 text-page">{title}</h1>
        {children && <p className="mt-5 max-w-2xl leading-relaxed text-muted md:text-lg">{children}</p>}
      </div>
    </header>
  );
}

export function Frame({
  img,
  alt,
  sizes,
  className = "",
  priority = false,
}: {
  img: Img | null;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div className={`relative overflow-hidden bg-soft-blue ${className}`}>
      {img ? (
        <Image src={img.src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div className="mono flex h-full items-center justify-center text-xs text-muted">no image</div>
      )}
    </div>
  );
}

export function TypeChip({ type }: { type: EventEntry["type"] }) {
  const t = EVENT_TYPES[type];
  return (
    <span className="chip">
      <span className={`h-2 w-2 rounded-full ${ACCENT_BG[t.color]}`} aria-hidden="true" />
      {t.label}
    </span>
  );
}

export function EventCard({ event, large = false }: { event: EventEntry; large?: boolean }) {
  return (
    <Link href={`/events/${event.slug}`} className="card card-link group flex h-full flex-col overflow-hidden">
      <Frame
        img={event.cover}
        alt=""
        sizes={large ? "(min-width: 1024px) 60vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"}
        className="aspect-[16/10] border-b-2 border-ink"
      />
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <div className="flex flex-wrap items-center gap-2">
          <TypeChip type={event.type} />
          <span className="mono text-xs text-muted">{event.dateLabel}</span>
        </div>
        <h3 className={`display mt-3 ${large ? "text-2xl md:text-3xl" : "text-xl"} !leading-[1.05]`}>{event.title}</h3>
        <p className="mt-2.5 line-clamp-3 text-[0.9rem] leading-relaxed text-muted">{event.summary}</p>
        {large && event.location && (
          <p className="mono mt-4 text-xs text-muted">
            <span className="text-g-red">@</span> {event.location}
          </p>
        )}
        <p className="mono mt-auto pt-4 text-xs uppercase tracking-wider">
          Read recap{" "}
          <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}

export function ArticleCard({ article, index }: { article: Article; index?: number }) {
  return (
    <Link href={`/articles/${article.slug}`} className="card card-link group flex h-full flex-col overflow-hidden">
      <Frame
        img={article.cover}
        alt=""
        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
        className="aspect-[4/3] border-b-2 border-ink"
      />
      <div className="flex flex-1 flex-col p-4 md:p-5">
        <p className="mono flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
          {index !== undefined && <span className="text-ink">#{String(index).padStart(2, "0")}</span>}
          <span>{article.dateLabel}</span>
          {article.tags[0] && <span className="uppercase tracking-wider text-g-blue">{article.tags[0]}</span>}
        </p>
        <h3 className="display mt-2.5 text-xl !leading-[1.08]">{article.title}</h3>
        <p className="mt-2.5 line-clamp-3 text-[0.9rem] leading-relaxed text-muted">{article.summary}</p>
        <p className="mono mt-auto pt-4 text-xs uppercase tracking-wider">
          Read{" "}
          <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
            →
          </span>
        </p>
      </div>
    </Link>
  );
}

export function JoinBanner({ open, period, generation }: { open: boolean; period: string; generation: number }) {
  return (
    <section className="wrap mt-20">
      <div data-reveal className="card relative overflow-hidden bg-g-blue p-7 text-white md:p-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          aria-hidden="true"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mono text-xs uppercase tracking-widest text-white/80">
              {">"} recruitment --gen {generation} {"// "}
              {open ? `open · ${period}` : "closed"}
            </p>
            <p className="display mt-3 text-headline">
              Build it
              <br />
              with us.
            </p>
            <p className="mt-4 max-w-xl text-white/90">
              {open
                ? "Applications are open. Pick your station and start building your next."
                : "You do not need to be perfect to start, only ready to learn. See the four stations and how recruitment works."}
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/join" className="btn btn-yellow">
              {open ? "Apply now" : "Explore the stations"} <span aria-hidden="true">→</span>
            </Link>
            <Link href="/events" className="btn btn-white">
              See what we do
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
