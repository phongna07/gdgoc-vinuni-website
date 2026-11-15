import Link from "next/link";
import { site } from "@/lib/content";
import { LogoMark } from "./logo";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/articles", label: "Articles" },
  { href: "/team", label: "Team" },
  { href: "/join", label: "Join us" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-white">
      <div className="flex h-2" aria-hidden="true">
        <span className="flex-1 bg-g-blue" />
        <span className="flex-1 bg-g-red" />
        <span className="flex-1 bg-g-yellow" />
        <span className="flex-1 bg-g-green" />
      </div>
      <div className="wrap py-14">
        <p className="display text-[clamp(2.6rem,9vw,7rem)] leading-[0.9]">
          Build your <span className="text-g-blue">next</span>
          <span className="text-g-yellow">_</span>
        </p>

        <div className="mt-12 grid gap-10 border-t border-white/20 pt-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <LogoMark className="h-5 w-auto" />
              <span className="display text-lg">{site.name}</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/70">{site.description}</p>
            <p className="mono mt-4 text-xs text-white/50">{site.location}</p>
          </div>

          <nav aria-label="Footer">
            <h2 className="mono text-xs uppercase tracking-widest text-white/50">{"// sitemap"}</h2>
            <ul className="mt-4 space-y-2">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-g-yellow">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="mono text-xs uppercase tracking-widest text-white/50">{"// contact"}</h2>
            <ul className="mt-4 space-y-2">
              {site.email.map((e) => (
                <li key={e}>
                  <a href={`mailto:${e}`} className="break-all hover:text-g-yellow">
                    {e}
                  </a>
                </li>
              ))}
              {site.socials.map((s) => (
                <li key={s.href}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="hover:text-g-yellow">
                    {s.label} <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mono mt-12 flex flex-col gap-2 text-[0.7rem] text-white/45 sm:flex-row sm:justify-between">
          <p>
            {site.version} {"// "}gen {site.generation} · since {site.foundedYear}
          </p>
          <p>
            A student community at VinUniversity. Not an official Google website; Google and related marks are
            trademarks of Google LLC.
          </p>
        </div>
      </div>
    </footer>
  );
}
