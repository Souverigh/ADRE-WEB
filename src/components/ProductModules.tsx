import Link from 'next/link';
import {getCopy, type Locale} from '@/lib/i18n';
import {modulesCopy} from '@/lib/modules';
import styles from './ProductModules.module.css';

export function ProductModules({locale}: {locale: Locale}) {
  const copy = modulesCopy[locale];
  return <section className={`section ${styles.section}`} id="modules" aria-labelledby="modules-title">
    <div className="container">
      <div className="eyebrow">{copy.eyebrow}</div>
      <h2 className="h2" id="modules-title">{copy.title}</h2>
      <p className="lead">{copy.body}</p>
      <div className={styles.grid}>
        {copy.items.map(module => <article className={styles.card} id={module.id} key={module.id}>
          <h3>{module.title}</h3>
          <p className={styles.description}>{module.description}</p>
          <ul className={styles.highlights}>{module.highlights.map(text => <li key={text}>{text}</li>)}</ul>
          <details className={styles.details}>
            <summary>{copy.details}<span aria-hidden="true" className={styles.toggle}>+</span></summary>
            <div className={styles.content}>
              <h4>{copy.documentsLabel}</h4>
              <p>{module.documents}</p>
              <dl>{module.features.map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl>
            </div>
          </details>
          <div className="btnrow"><Link className="btn" href={`/${locale}/${module.id}`}>{getCopy(locale).common.learnMore}</Link></div>
        </article>)}
      </div>
    </div>
  </section>;
}
