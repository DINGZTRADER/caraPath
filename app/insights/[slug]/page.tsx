import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PublicHeader } from "../../public-header";
import styles from "../../public-resources.module.css";
import { findInsight, insightArticles } from "../../../lib/insights";

export function generateStaticParams() {
  return insightArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = findInsight(slug);
  if (!article) return {};
  const url = `https://www.theclarapath.org/insights/${article.slug}`;
  return {
    title: `${article.title} | The Clara Path`,
    description: article.description,
    alternates: { canonical: url },
    openGraph: { title: article.title, description: article.description, url, type: "article" }
  };
}

export default async function InsightArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = findInsight(slug);
  if (!article) notFound();

  return (
    <div className={styles.page}>
      <PublicHeader />
      <main id="top">
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>{article.eyebrow}</p>
            <h1>{article.title}</h1>
            <p className={styles.lede}>{article.description}</p>
            <p>Updated {article.updated}</p>
            <div className={styles.notice}><strong>Scope:</strong> General information for England. This guide does not determine eligibility, replace the relevant NHS or Local Authority process, or provide individual legal or clinical advice.</div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container} style={{ maxWidth: 900 }}>
            {article.sections.map((section) => (
              <article className={styles.card} key={section.heading} style={{ marginBottom: "1.25rem" }}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets ? <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
              </article>
            ))}

            <article className={styles.card}>
              <p className={styles.eyebrow}>Official sources</p>
              <h2>Check the current rule at source.</h2>
              <ul>
                {article.sources.map((source) => (
                  <li key={source.href}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>
                ))}
              </ul>
              <p>Official guidance can change. Re-check the linked source before relying on a process, deadline or eligibility rule.</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
