import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArticleCard, Frame } from "@/components/ui";
import { getArticle, getArticles } from "@/lib/content";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    path: `/articles/${slug}`,
    title: article.title,
    description: article.summary,
    image: article.cover,
    type: "article",
  });
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
        <div className="wrap rise max-w-3xl pb-9 pt-8 md:pt-11">
          <p className="mono text-xs uppercase tracking-widest text-muted">
            <Link href="/articles" className="underline underline-offset-4 hover:text-g-blue">
              ← /articles
            </Link>
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            {article.tags.map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
            <span className="mono text-xs text-muted">{article.dateLabel}</span>
          </div>
          <h1 className="display mt-4 text-headline">{article.title}</h1>
          <p className="mt-5 leading-relaxed text-muted md:text-lg">{article.summary}</p>
        </div>
      </header>

      <div className="wrap mt-9 max-w-3xl">
        {article.cover && (
          <Frame
            img={article.cover}
            alt={`${article.title} cover`}
            sizes="(min-width: 1024px) 48rem, 100vw"
            priority
            className="card aspect-[16/10]"
          />
        )}
        <div className="prose mx-auto mt-8 max-w-[40rem]" dangerouslySetInnerHTML={{ __html: article.html }} />
      </div>

      <section className="wrap mt-16">
        <h2 className="display text-3xl md:text-4xl">Keep reading</h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
