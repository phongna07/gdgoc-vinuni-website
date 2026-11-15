import Link from "next/link";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[70vh] flex-col items-start justify-center py-20">
      <p className="mono text-xs uppercase tracking-widest text-muted">
        <span className="text-g-red">error</span> {"// "}route not found
      </p>
      <h1 className="display mt-5 text-[clamp(6rem,24vw,16rem)]">
        4<span className="text-g-blue">0</span>4
      </h1>
      <p className="mt-4 max-w-md text-xl text-muted">This block has not been built yet. Let&apos;s get you back to something that has.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link href="/" className="btn btn-blue">
          Back home <span aria-hidden="true">→</span>
        </Link>
        <Link href="/events" className="btn btn-white">
          See events
        </Link>
      </div>
    </section>
  );
}
