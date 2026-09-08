import {notFound} from 'next/navigation';
import {getCopy,isLocale} from '@/lib/i18n';

export default async function DemoPage({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  const c=getCopy(locale).pages.demo;
  return <main><section className="section"><div className="container narrow">
    <div className="eyebrow">{c.eyebrow}</div><h1 className="display smallDisplay">{c.title}</h1><p className="lead">{c.lead}</p>
    <form className="demoForm">
      <label>{c.fields.name}<input name="name"/></label>
      <label>{c.fields.company}<input name="company"/></label>
      <label>{c.fields.phone}<input name="phone"/></label>
      <label>{c.fields.email}<input name="email" type="email"/></label>
      <label>{c.fields.industry}<select name="industry">{c.options.map(([value,label])=><option key={value} value={value}>{label}</option>)}</select></label>
      <label>{c.fields.volume}<input name="volume"/></label>
      <label className="fullField">{c.fields.workflow}<textarea name="workflow" rows={5}/></label>
      <button className="btn primary" type="button">{c.submit}</button>
    </form><p className="small">{c.note}</p>
  </div></section></main>;
}
