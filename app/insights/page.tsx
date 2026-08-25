import type { Metadata } from "next";
import { PublicHeader } from "../public-header";
import styles from "../public-resources.module.css";
import { insightArticles } from "../../lib/insights";

export const metadata: Metadata = {
  title: "Care Act & NHS CHC Insights | The Clara Path",
  description: "Plain-English, official-source guides for family carers navigating NHS Continuing Healthcare, Care Act assessments and Local Authority decisions.",
  alternates: { canonical: "https://www.theclarapath.org/insights" }
};

export default function InsightsPage() {
  return (
    <div className={styles.page}>
      <PublicHeader />
      <main id="top">
        <section className={styles.hero}>
          <div className={styles.container}>
            <p className={styles.eyebrow}>Plain-English insights</p>
            <h1>Understand the process before the next difficult conversation.</h1>
            <p className={styles.lede}>Short, practical explainers grounded in current NHS, GOV.UK and Care Act sources. These articles are educational and do not replace individual legal, clinical or welfare-rights advice.</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {insightArticles.map((article) => (
                <article className={styles.card} key={article.slug}>
                  <p className={styles.eyebrow}>{article.eyebrow}</p>
                  <h2>{article.title}</h2>
                  <p>{article.description}</p>
                  <a href={`/insights/${article.slug}`}>Read guide →</a>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
