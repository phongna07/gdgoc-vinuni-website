"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Img } from "@/lib/types";

export function Gallery({ images, title }: { images: Img[]; title: string }) {
  const [active, setActive] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const step = useCallback(
    (d: number) => setActive((i) => (i === null ? i : (i + d + images.length) % images.length)),
    [images.length],
  );

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (active !== null && !el.open) el.showModal();
    if (active === null && el.open) el.close();
  }, [active]);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, step]);

  if (images.length === 0) return null;
  const current = active !== null ? images[active] : null;

  return (
    <>
      <ul className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
        {images.map((img, i) => (
          <li key={img.src} className="break-inside-avoid">
            <button
              type="button"
              onClick={() => setActive(i)}
              className="card-link block w-full cursor-zoom-in overflow-hidden rounded-xl border-2 border-ink bg-white shadow-[3px_3px_0_0_var(--ink)]"
              aria-label={`Open photo ${i + 1} of ${images.length}`}
            >
              <Image
                src={img.src}
                alt={`${title}, photo ${i + 1}`}
                width={img.width}
                height={img.height}
                sizes="(min-width: 768px) 33vw, 50vw"
                className="h-auto w-full"
              />
            </button>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === e.currentTarget && setActive(null)}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-ink/95 p-0 text-white backdrop:bg-ink/80"
        aria-label={`${title} photos`}
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="mono flex items-center justify-between px-5 py-4 text-xs uppercase tracking-widest">
              <span>
                {String((active ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
              </span>
              <button type="button" onClick={() => setActive(null)} className="rounded-full border-2 border-white px-4 py-1.5 hover:bg-white hover:text-ink">
                Close ✕
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image
                key={current.src}
                src={current.src}
                alt={`${title}, photo ${(active ?? 0) + 1}`}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            {images.length > 1 && (
              <div className="flex items-center justify-center gap-4 py-5">
                <button type="button" onClick={() => step(-1)} className="btn btn-white" aria-label="Previous photo">
                  ←
                </button>
                <button type="button" onClick={() => step(1)} className="btn btn-yellow" aria-label="Next photo">
                  →
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
