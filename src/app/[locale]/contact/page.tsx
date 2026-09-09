import {notFound} from 'next/navigation';
import {getCopy,isLocale} from '@/lib/i18n';
import Link from 'next/link';
import styles from './contact.module.css';

export default async function Page({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  const c=getCopy(locale);
  const p=c.pages.contact;
  return <main><section className="section"><div className="container narrow">
    <div className="eyebrow">{p.eyebrow}</div>
    <h1 className="display smallDisplay">{p.title}</h1>
    <p className="lead">{p.lead}</p>
    <div className={styles.owner}>
      <span>{p.ownerLabel}</span>
      <strong>Абышев Ержан</strong>
    </div>
    <address className={styles.channels}>
      <a className={styles.channel} href="mailto:info@adre-cloud.app">
        <span className={styles.label}>{p.emailLabel}</span>
        <strong>info@adre-cloud.app</strong>
        <span className={styles.note}>{p.emailNote}</span>
      </a>
      <a className={styles.channel} href="tel:+13129099055">
        <span className={styles.label}>{p.phoneLabel}</span>
        <strong>+1 312 909 9055</strong>
        <span className={styles.note}>{p.phoneNote}</span>
      </a>
    </address>
    <section className={styles.request}>
      <h2 className="h3">{p.requestTitle}</h2>
      <p>{p.requestBody}</p>
      <div className="btnrow">
        <Link className="btn primary" href={`/${locale}/demo`}>{p.formLabel}</Link>
        <Link className="btn" href={`/${locale}`}>← {c.common.back}</Link>
      </div>
    </section>
  </div></section></main>;
}
