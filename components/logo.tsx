/**
 * Bracket mark drawn in the four Google colours.
 * Placeholder until the official GDG logo files are added to /public.
 */
export function LogoMark({ className = "h-6 w-auto" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 32" className={className} aria-hidden="true" fill="none">
      <g strokeWidth="8" strokeLinecap="round">
        <path d="M24 6 L8 16" stroke="#EA4335" />
        <path d="M8 16 L24 26" stroke="#4285F4" />
        <path d="M40 26 L56 16" stroke="#FBBC04" />
        <path d="M40 6 L56 16" stroke="#34A853" />
      </g>
    </svg>
  );
}

export function Logo() {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark className="h-5 w-auto shrink-0" />
      <span className="leading-none">
        <span className="display block text-[1.05rem] tracking-tight">GDG on Campus</span>
        <span className="mono block pt-0.5 text-[0.62rem] uppercase tracking-[0.14em] text-muted">
          VinUniversity
        </span>
      </span>
    </span>
  );
}
