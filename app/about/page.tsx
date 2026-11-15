import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Link from "next/link";
import { ACCENT_BG, JoinBanner, PageHeader, SectionHeading } from "@/components/ui";
import { formatMonth, getGenerations, site, timeline } from "@/lib/content";

export const metadata = pageMetadata({
  path: "/about",
  title: "About",
  description: "The story, mission and milestones of GDG on Campus VinUniversity.",
});

const WHAT_WE_DO = [
  { title: "Workshops & study jams", text: "Hands-on sessions with engineers from industry and with each other, from Android and Firebase to recommender systems and Gemini.", color: "bg-soft-blue" },
  { title: "Hackathons", text: "We compete in and help organise GDGoC Hackathon Vietnam, and hosted its northern Demo Day on campus in 2025.", color: "bg-soft-red" },
  { title: "Projects", text: "Teams turn ideas into products that answer real problems, often framed by the UN Sustainable Development Goals.", color: "bg-soft-yellow" },
  { title: "Community", text: "Club fairs, sharing evenings and joint events with other chapters in Vietnam and abroad.", color: "bg-soft-green" },
];

const RECOGNITION = [
  { year: "2024", title: "Student Champions of Change", by: "Awarded by VinUniversity", href: "/articles/student-champions-of-change" },
  { year: "2023", title: "Global GDSC Lead of the Year", by: "Lưu Bảo Yến, founding lead · as recorded by the club", href: "/articles/founder-story" },
  { year: "—", title: "Most Impactful Chapter in Vietnam", by: "As recorded by the club", href: "/articles/founder-story" },
  { year: "2023", title: "Runner-up, AI Challenge: ChatGPT Problem Solvers", by: "Team VinWin, at GDSC HUST", href: "/articles/vinwin-ai-challenge" },
];

export default function AboutPage() {
  const advisors = getGenerations().flatMap((g) => g.advisors);

  return (
    <>
      <PageHeader path="/about" title={<>About us</>}>
        {site.description}
      </PageHeader>

      <section className="wrap mt-14 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div data-reveal>
          <p className="mono text-xs uppercase tracking-widest text-muted">{"01 // mission"}</p>
          <h2 className="display mt-3 text-section">
            Technology is what you can <span className="text-g-blue">make</span>, not only what you know.
          </h2>
        </div>
        <div data-reveal className="space-y-4 leading-relaxed text-muted md:text-[1.05rem]">
          <p>
            Google Developer Groups on Campus are student communities supported by Google, found at universities
            around the world. Ours started in September {site.foundedYear} as Google Developer Student Club
            VinUniversity, and took its current name in 2024.
          </p>
          <p>
            We believe technology is about the problems you want to solve and the value you want to bring to the
            people around you. So we build a place where students can learn, practise, work together and grow,
            whether they are just starting out or already have a foundation.
          </p>
          <p className="text-ink">
            Tech or non-tech, there is a role here for you, and room to pick up skills you did not arrive with.
          </p>
        </div>
      </section>

      <section className="wrap mt-20">
        <SectionHeading index="02" label="what we do" title="Four ways we spend our time." />
        <ul className="grid gap-4 sm:grid-cols-2">
          {WHAT_WE_DO.map((w, i) => (
            <li key={w.title} data-reveal className={`card p-5 md:p-6 ${w.color}`}>
              <p className="mono text-xs text-ink/50">0{i + 1}</p>
              <h3 className="display mt-2 text-2xl">{w.title}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-ink/75">{w.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="timeline" className="wrap mt-20">
        <SectionHeading index="03" label="git log --reverse" title="How we got here." />
        <ol className="relative ml-3 border-l-2 border-ink">
          {timeline.map((m) => (
            <li key={m.date + m.tag} data-reveal className="relative pb-8 pl-7 last:pb-0 md:pl-10">
              <span
                className={`absolute -left-[11px] top-1 h-5 w-5 rounded-md border-2 border-ink ${ACCENT_BG[m.color]}`}
                aria-hidden="true"
              />
              <div className="grid gap-2 md:grid-cols-[10rem_1fr] md:gap-6">
                <p className="mono pt-1 text-xs uppercase tracking-wider text-muted">
                  <span className="text-ink">{formatMonth(m.date)}</span>
                  <br />
                  {m.tag}
                </p>
                <div>
                  <h3 className="display text-xl md:text-2xl">{m.title}</h3>
                  <p className="mt-1.5 max-w-2xl text-[0.95rem] leading-relaxed text-muted">{m.text}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap mt-20">
        <SectionHeading index="04" label="recognition" title="Things we are proud of." />
        <ul className="card divide-y-2 divide-ink overflow-hidden">
          {RECOGNITION.map((r) => (
            <li key={r.title} data-reveal>
              <Link href={r.href} className="group grid gap-1 px-5 py-4 hover:bg-soft-yellow md:grid-cols-[5rem_1fr_auto] md:items-center md:gap-5">
                <span className="mono text-sm text-muted">{r.year}</span>
                <span>
                  <span className="display block text-xl">{r.title}</span>
                  <span className="text-sm text-muted">{r.by}</span>
                </span>
                <span className="mono text-xs uppercase tracking-wider" aria-hidden="true">
                  Read →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {advisors.length > 0 && (
        <section className="wrap mt-20">
          <SectionHeading index="05" label="advisors" title="People who guide us." />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {advisors.map((a) => (
              <li key={a.name} data-reveal className="card flex items-center gap-4 p-4">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 border-ink bg-soft-blue">
                  {a.photo && <Image src={a.photo} alt={a.name} fill sizes="80px" className="object-cover" />}
                </div>
                <div>
                  <h3 className="display text-xl !leading-[1.08]">{a.name}</h3>
                  <p className="mt-1 text-sm text-muted">{a.role}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <JoinBanner
        open={site.recruitment.open}
        period={site.recruitment.period}
        generation={site.recruitment.generation}
      />
    </>
  );
}
