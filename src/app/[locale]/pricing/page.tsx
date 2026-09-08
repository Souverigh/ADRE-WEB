import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getCopy,isLocale} from '@/lib/i18n';
import {PricingCards} from '@/components/PricingCards';

export default async function Page({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  const c=getCopy(locale);
  const p=c.pages.pricing;
  return <main><section className="section"><div className="container">
    <div className="eyebrow">{p.eyebrow}</div>
    <h1 className="display smallDisplay">{p.title}</h1>
    <p className="lead">{p.lead}</p>
    <PricingCards plans={c.pricing.plans}/>
    <p className="small" style={{marginTop:20}}>{c.pricing.note}</p>
    <div className="btnrow">
      <Link className="btn" href={`/${locale}`}>← {c.common.back}</Link>
      <Link className="btn primary" href={`/${locale}/demo`}>{c.pricing.cta}</Link>
    </div>
  </div></section></main>;
}
