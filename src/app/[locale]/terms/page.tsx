import {pageMetadata} from '@/lib/seo';
import {notFound} from 'next/navigation';
import {getCopy,isLocale} from '@/lib/i18n';
import Link from 'next/link';

export default async function Page({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  const c=getCopy(locale);
  const p=c.pages.terms;
  return <main className="legalPolicy"><article className="section"><div className="container narrow">
    <div className="eyebrow">{p.eyebrow}</div>
    <h1 className="display smallDisplay">{p.title}</h1>
    <p className="lead">{p.lead}</p>
    {p.sections.map(([title,body])=><section className="docsSection" key={title}>
      <h2 className="h3">{title}</h2>
      <p>{body}</p>
    </section>)}
    <p className="small"><a href="https://reestr.dpa.gov.kg/ru/npa/59">{c.pages.privacy.sourceLabel}</a></p>
    <div className="btnrow">
      <Link className="btn" href={`/${locale}/privacy`}>{c.footer.privacy}</Link>
      <Link className="btn" href={`/${locale}`}>← {c.common.back}</Link>
    </div>
  </div></article></main>;
}

export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {
  return pageMetadata((await params).locale, 'terms');
}
