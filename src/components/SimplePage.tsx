import Link from 'next/link';
export function SimplePage({eyebrow,title,lead,sections,locale,back}:{eyebrow:string;title:string;lead:string;sections?:readonly (readonly [string,string])[];locale:string;back:string}) {
  return <main><section className="section"><div className="container narrow">
    <div className="eyebrow">{eyebrow}</div><h1 className="display smallDisplay">{title}</h1><p className="lead">{lead}</p>
    {sections && <div className="simpleGrid">{sections.map(([t,b])=><article key={t}><h3>{t}</h3><p>{b}</p></article>)}</div>}
    <div className="btnrow"><Link className="btn" href={`/${locale}`}>← {back}</Link></div>
  </div></section></main>;
}
