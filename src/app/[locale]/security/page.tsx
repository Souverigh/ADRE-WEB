import {pageMetadata} from '@/lib/seo';
import {notFound} from 'next/navigation';
import {getCopy,isLocale} from '@/lib/i18n';
import {SimplePage} from '@/components/SimplePage';

export default async function Page({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  const c=getCopy(locale);
  const p=c.pages.security;
  return <SimplePage eyebrow={p.eyebrow} title={p.title} lead={p.lead}
    sections={'sections' in p ? p.sections as readonly (readonly [string,string])[] : undefined}
    locale={locale} back={c.common.back} />;
}

export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {
  return pageMetadata((await params).locale, 'security');
}
