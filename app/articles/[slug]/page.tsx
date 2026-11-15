import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard, Frame } from "@/components/ui";
import { getArticle, getArticles } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.summary,
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      images: article.cover ? [article.cover.src] : [],
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const more = getArticles()
    .filter((a) => a.slug !== slug)
    .slice(0, 3);

  return (
    <article>
      <header className="border-b-2 border-ink">
        <div className="wrap rise max-w-4xl pb-10 pt-10 md:pt-14">
          <p className="mono text-xs uppercase tracking-widest text-muted">
            <Link href="/articles" className="underline underline-offset-4 hover:text-g-blue">
              ← /articles
            </Link>
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {article.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
            <span className="mono text-xs text-muted">{article.dateLabel}</span>
          </div>
          <h1 className="display mt-5 text-[clamp(2.3rem,6.5vw,4.75rem)]">{article.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-muted md:text-xl">{article.summary}</p>
        </div>
      </header>

      <div className="wrap mt-10 max-w-4xl">
        {article.cover && (
          <Frame
            img={article.cover}
            alt={`${article.title} cover`}
            sizes="(min-width: 1024px) 56rem, 100vw"
            priority
            className="card aspect-[16/10]"
          />
        )}
        <div className="prose mx-auto mt-10 max-w-[44rem]" dangerouslySetInnerHTML={{ __html: article.html }} />
      </div>

      <section className="wrap mt-20">
        <h2 className="display text-4xl md:text-5xl">Keep reading</h2>
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((a) => (
            <li key={a.slug}>
              <ArticleCard article={a} />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
