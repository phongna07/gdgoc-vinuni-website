"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

const NAV = [
  { href: "/about", label: "About" },
  { href: "/events", label: "Events" },
  { href: "/articles", label: "Articles" },
  { href: "/team", label: "Team" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-50 border-b-2 border-ink bg-paper/90 backdrop-blur-md">
      <div className="wrap flex h-14 items-center justify-between gap-4">
        <Link href="/" aria-label="GDG on Campus VinUniversity, home" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={`mono rounded-full px-3 py-1.5 text-[0.75rem] uppercase tracking-wider transition-colors ${
                isActive(item.href) ? "bg-ink text-white" : "hover:bg-soft-yellow"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/join" className="btn btn-blue ml-3 !py-2 !text-[0.85rem]">
            Join us <span aria-hidden="true">→</span>
          </Link>
        </nav>

        <button
          type="button"
          className="flex h-9 w-9 items-center justify-center rounded-lg border-2 border-ink bg-white md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3.5 w-5" aria-hidden="true">
            <span
              className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform ${open ? "top-1.5 rotate-45" : "top-0"}`}
            />
            <span className={`absolute left-0 top-1.5 h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span
              className={`absolute left-0 h-0.5 w-5 bg-ink transition-transform ${open ? "top-1.5 -rotate-45" : "top-3"}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t-2 border-ink bg-paper md:hidden">
          <ul className="wrap flex flex-col py-3">
            {[...NAV, { href: "/join", label: "Join us" }].map((item, i) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="flex items-baseline gap-4 border-b border-rule py-3"
                >
                  <span className="mono text-xs text-muted">0{i + 1}</span>
                  <span className="display text-2xl">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
