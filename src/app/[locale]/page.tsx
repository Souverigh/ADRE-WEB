import Link from 'next/link';
import {notFound} from 'next/navigation';
import {HeroDemo} from '@/components/HeroDemo';
import {IndustryTabs} from '@/components/IndustryTabs';
import {PricingCards} from '@/components/PricingCards';
import {getCopy,isLocale} from '@/lib/i18n';
import styles from './home.module.css';

export default async function Home({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  const c=getCopy(locale);
  const app=process.env.NEXT_PUBLIC_APP_URL||'https://tamga-souverigh.vercel.app';

  return <main>
    <section className={`hero ${styles.hero}`}>
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">{c.hero.eyebrow}</div>
          <h1 className="display">{c.hero.title}</h1>
          <p className="lead">{c.hero.body}</p>
          <div className="btnrow">
            <a className="btn primary" href={app}>{c.hero.primary}</a>
            <Link className="btn" href={`/${locale}/demo`}>{c.hero.secondary} →</Link>
          </div>
          <div className={styles.proofChips}>{c.hero.proof.map(x=><span key={x}>{x}</span>)}</div>
        </div>
        <HeroDemo copy={c.demo}/>
      </div>
    </section>

    <section className="strip">
      <div className="container stripgrid">{c.proof.items.map(([t,b])=><div className="stripitem" key={t}><strong>{t}</strong><span>{b}</span></div>)}</div>
    </section>

    <section className="section">
      <div className="container">
        <div className="eyebrow">{c.comparison.eyebrow}</div>
        <h2 className="h2">{c.comparison.title}</h2>
        <p className="lead">{c.comparison.body}</p>
        <div className={styles.compareGrid}>
          <article className={styles.ocrCard}>
            <div className={styles.cardTop}><h3>{c.comparison.leftTitle}</h3><span>{c.comparison.leftBadge}</span></div>
            <div className={styles.ocrText}>{c.comparison.leftText}</div>
            <p>{c.comparison.leftNote}</p>
          </article>
          <article className={styles.tamgaCard}>
            <div className={styles.cardTop}><h3>{c.comparison.rightTitle}</h3><span>{c.comparison.rightBadge}</span></div>
            <div className={styles.fieldList}>
              {c.comparison.fields.map(([label,value,confidence])=><div className={styles.fieldRow} key={label}>
                <span>{label}</span><strong>{value}</strong>
                <em className={Number(confidence.replace('%',''))<80?styles.warn:styles.good}>{confidence}</em>
              </div>)}
            </div>
            <div className={styles.legend}><span className={styles.goodDot}>{c.comparison.ready}</span><span className={styles.warnDot}>{c.comparison.review}</span></div>
          </article>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="eyebrow">{c.how.eyebrow}</div>
        <h2 className="h2">{c.how.title}</h2>
        <div className={styles.stepsGrid}>{c.how.steps.map(([n,t,b])=><article className="step" key={n}><div className="num">{n}</div><h3>{t}</h3><p>{b}</p></article>)}</div>
      </div>
    </section>

    <section className={`section ${styles.softSection}`}>
      <div className="container">
        <div className={styles.split}>
          <div>
            <div className="eyebrow">{c.confidence.eyebrow}</div>
            <h2 className="h2">{c.confidence.title}</h2>
            <p className="lead">{c.confidence.body}</p>
            <p className="small">{c.confidence.note}</p>
          </div>
          <div className={styles.confidencePanel}>
            {c.confidence.fields.map(([label,value,confidence,status])=><div className={styles.confidenceRow} key={label}>
              <div><span>{label}</span><strong>{value}</strong></div>
              <div className={styles.confidenceMeta}><b>{confidence}</b><em className={Number(confidence.replace('%',''))<80?styles.reviewBadge:styles.readyBadge}>{status}</em></div>
            </div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="eyebrow">{c.validation.eyebrow}</div>
        <h2 className="h2">{c.validation.title}</h2>
        <p className="lead">{c.validation.body}</p>
        <div className={styles.featureGrid}>{c.validation.items.map(([t,b])=><article key={t}><div className={styles.iconMark}>✓</div><h3>{t}</h3><p>{b}</p></article>)}</div>
      </div>
    </section>

    <section className={`section ${styles.darkSection}`}>
      <div className="container">
        <div className={styles.split}>
          <div>
            <div className="eyebrow">{c.batch.eyebrow}</div>
            <h2 className="h2">{c.batch.title}</h2>
            <p className="lead">{c.batch.body}</p>
            <div className={styles.stats}>{c.batch.stats.map(([n,label])=><div key={label}><strong>{n}</strong><span>{label}</span></div>)}</div>
          </div>
          <div className={styles.batchCard}>
            <h3>{c.batch.summaryTitle}</h3>
            {c.batch.summary.map((x,i)=><div className={styles.batchLine} key={x}><span>{x}</span><b>{Math.max(48,92-i*9)}%</b></div>)}
          </div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="eyebrow">{c.exports.eyebrow}</div>
        <h2 className="h2">{c.exports.title}</h2>
        <p className="lead">{c.exports.body}</p>
        <div className={styles.formatRow}>{c.exports.formats.map(x=><span key={x}>{x}</span>)}</div>
        <div className={styles.featureGrid}>{c.exports.items.map(([t,b])=><article key={t}><h3>{t}</h3><p>{b}</p></article>)}</div>
      </div>
    </section>

    <section className={`section ${styles.softSection}`}>
      <div className="container">
        <div className="eyebrow">{c.documents.eyebrow}</div>
        <h2 className="h2">{c.documents.title}</h2>
        <p className="lead">{c.documents.body}</p>
        <div className={styles.documentGrid}>{c.documents.groups.map(([t,b])=><article key={t}><h3>{t}</h3><p>{b}</p></article>)}</div>
      </div>
    </section>

    <section className="section" id="solutions">
      <div className="container">
        <div className="eyebrow">{c.industries.eyebrow}</div>
        <h2 className="h2">{c.industries.title}</h2>
        <p className="lead">{c.industries.body}</p>
        <IndustryTabs copy={c.industries}/>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="eyebrow">{c.customization.eyebrow}</div>
        <h2 className="h2">{c.customization.title}</h2>
        <p className="lead">{c.customization.body}</p>
        <div className={styles.customGrid}>{c.customization.items.map(([t,b])=><article key={t}><h3>{t}</h3><p>{b}</p></article>)}</div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="eyebrow">{c.why.eyebrow}</div>
        <h2 className="h2">{c.why.title}</h2>
        <div className="editorial">{c.why.items.map(([t,b])=><article key={t}><h3>{t}</h3><p>{b}</p></article>)}</div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="eyebrow">{c.api.eyebrow}</div>
        <h2 className="h2">{c.api.title}</h2>
        <p className="lead">{c.api.body}</p>
        <div className="codebox">
          <div><span className="blue">POST</span> /api/v1/recognize</div>
          <div>Authorization: Bearer YOUR_API_KEY</div><br/>
          <div>{'{'}</div>
          <div>&nbsp;&nbsp;"document_type": "invoice",</div>
          <div>&nbsp;&nbsp;"fields": {'{'}</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;"supplier": "OsOO Alpha",</div>
          <div>&nbsp;&nbsp;&nbsp;&nbsp;"total": 84520</div>
          <div>&nbsp;&nbsp;{'}'}</div>
          <div>{'}'}</div>
        </div>
        <div className="btnrow"><Link className="btn" href={`/${locale}/developers`}>{c.api.docs} →</Link></div>
      </div>
    </section>

    <section className="section">
      <div className="container security-grid">
        <div>
          <div className="eyebrow">{c.security.eyebrow}</div>
          <h2 className="h2">{c.security.title}</h2>
          <p className="lead">{c.security.body}</p>
          <div className="btnrow"><Link className="btn" href={`/${locale}/security`}>{c.security.cta} →</Link></div>
        </div>
        <div className="security-list">{c.security.bullets.map(x=><div key={x}><span className="check">✓</span><span>{x}</span></div>)}</div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div className="eyebrow">{c.pricing.eyebrow}</div>
        <h2 className="h2">{c.pricing.title}</h2>
        <PricingCards plans={c.pricing.plans}/>
        <p className="small" style={{marginTop:20}}>{c.pricing.note}</p>
        <div className="btnrow"><Link className="btn" href={`/${locale}/pricing`}>{c.common.learnMore} →</Link><Link className="btn primary" href={`/${locale}/demo`}>{c.pricing.cta}</Link></div>
      </div>
    </section>

    <section className="section pilot">
      <div className="container">
        <div className="eyebrow">{c.pilot.eyebrow}</div>
        <h2 className="h2">{c.pilot.title}</h2>
        <p className="lead">{c.pilot.body}</p>
        <div className="btnrow"><Link className="btn" href={`/${locale}/demo`}>{c.pilot.cta}</Link></div>
      </div>
    </section>

    <section className="final">
      <div className="container">
        <h2 className="h2">{c.final.title}</h2>
        <p className="lead">{c.final.body}</p>
        <div className="btnrow"><a className="btn primary" href={app}>{c.final.primary}</a><Link className="btn" href={`/${locale}/demo`}>{c.final.secondary}</Link></div>
      </div>
    </section>
  </main>;
}
