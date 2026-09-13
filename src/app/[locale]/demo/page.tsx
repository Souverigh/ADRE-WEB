import {pageMetadata} from '@/lib/seo';
import {notFound} from 'next/navigation';
import {getCopy,isLocale} from '@/lib/i18n';
import {DemoForm} from '@/components/DemoForm';

export default async function DemoPage({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  const c=getCopy(locale).pages.demo;
  return <main><section className="section"><div className="container narrow">
    <div className="eyebrow">{c.eyebrow}</div><h1 className="display smallDisplay">{c.title}</h1><p className="lead">{c.lead}</p>
    <DemoForm fields={c.fields} options={c.options} submit={c.submit} sending={c.sending} success={c.success} error={c.error}/><p className="small">{c.note}</p>
  </div></section></main>;
}

export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {
  return pageMetadata((await params).locale, 'demo');
}
