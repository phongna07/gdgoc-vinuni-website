"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export function TimelineScroller({ children }: { children: ReactNode }) {
  const scroller = useRef<HTMLDivElement>(null);
  const [canGoBack, setCanGoBack] = useState(false);
  const [canGoForward, setCanGoForward] = useState(true);

  useEffect(() => {
    const element = scroller.current;
    if (!element) return;

    const update = () => {
      setCanGoBack(element.scrollLeft > 1);
      setCanGoForward(element.scrollLeft + element.clientWidth < element.scrollWidth - 1);
    };
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    if (element.firstElementChild) observer.observe(element.firstElementChild);
    return () => {
      element.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  function scroll(direction: number) {
    const element = scroller.current;
    if (!element) return;
    element.scrollBy({
      left: direction * element.clientWidth * 0.8,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }

  return (
    <div>
      <div className="mb-5 flex items-center justify-end gap-3">
        <span className="mono mr-1 text-[0.65rem] uppercase tracking-wider text-muted">Explore the history</span>
        <button
          type="button"
          className="btn btn-white !h-11 !w-11 !justify-center !p-0 disabled:cursor-default disabled:opacity-30 disabled:!shadow-none disabled:!transform-none"
          aria-label="Scroll to earlier milestones"
          aria-controls="chapter-history"
          disabled={!canGoBack}
          onClick={() => scroll(-1)}
        >
          <span aria-hidden="true">←</span>
        </button>
        <button
          type="button"
          className="btn btn-yellow !h-11 !w-11 !justify-center !p-0 disabled:cursor-default disabled:opacity-30 disabled:!shadow-none disabled:!transform-none"
          aria-label="Scroll to later milestones"
          aria-controls="chapter-history"
          disabled={!canGoForward}
          onClick={() => scroll(1)}
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
      <div
        ref={scroller}
        id="chapter-history"
        role="region"
        aria-label="Chapter history"
        tabIndex={0}
        className="overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </div>
  );
}
