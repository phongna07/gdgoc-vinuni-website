import type { Metadata } from "next";
import Link from "next/link";
import { ArticleCard, Frame, PageHeader } from "@/components/ui";
import { getArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "Articles",
  description: "Stories, explainers and guides from GDG on Campus VinUniversity.",
};

export default function ArticlesPage() {
  const [first, ...rest] = getArticles();

  return (
    <>
      <PageHeader path="/articles" title="Articles">
        Stories about the people in the club, explainers on what we are learning, and guides for joining us.
      </PageHeader>

      <section className="wrap mt-12">
        {first && (
          <Link
            href={`/articles/${first.slug}`}
            className="card card-link group grid overflow-hidden md:grid-cols-2"
          >
            <Frame
              img={first.cover}
              alt=""
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
              className="aspect-[4/3] border-b-2 border-ink md:aspect-auto md:min-h-[24rem] md:border-b-0 md:border-r-2"
            />
            <div className="flex flex-col justify-center p-6 md:p-10">
              <p className="mono flex flex-wrap gap-3 text-xs text-muted">
                <span className="rounded bg-g-yellow px-1.5 font-bold uppercase text-ink">Latest</span>
                <span>{first.dateLabel}</span>
              </p>
              <h2 className="display mt-4 text-4xl !leading-[1] md:text-5xl">{first.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{first.summary}</p>
              <p className="mono mt-6 text-xs uppercase tracking-wider">
                Read{" "}
                <span aria-hidden="true" className="inline-block transition-transform group-hover:translate-x-1">
                  →
                </span>
              </p>
            </div>
          </Link>
        )}

        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a, i) => (
            <li key={a.slug}>
              <ArticleCard article={a} index={rest.length - i} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
