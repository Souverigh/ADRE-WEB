import Link from 'next/link';
import {getCopy, type Locale} from '@/lib/i18n';
import {modulesCopy} from '@/lib/modules';
import styles from './ProductModules.module.css';

export function ModulePage({locale, moduleId}: {locale: Locale; moduleId: 'accounting' | 'translation'}) {
  const copy = modulesCopy[locale];
  const module = copy.items.find(item => item.id === moduleId)!;
  const common = getCopy(locale);
  return <main><section className="section"><div className="container narrow">
    <div className="eyebrow">ADRE</div>
    <h1 className="display smallDisplay">{module.title}</h1>
    <p className="lead">{module.description}</p>
    <ul className={styles.highlights}>{module.highlights.map(text => <li key={text}>{text}</li>)}</ul>
    <div className={styles.content}>
      <h2 className="h2">{copy.documentsLabel}</h2>
      <p>{module.documents}</p>
    </div>
    <div className={styles.content}>
      <h2 className="h2">{copy.details}</h2>
      <dl>{module.features.map(([title, body]) => <div key={title}><dt>{title}</dt><dd>{body}</dd></div>)}</dl>
    </div>
    <div className="btnrow">
      <Link className="btn primary" href={`/${locale}/demo`}>{common.hero.secondary}</Link>
      <Link className="btn" href={`/${locale}#modules`}>{common.common.back}</Link>
    </div>
  </div></section></main>;
}
