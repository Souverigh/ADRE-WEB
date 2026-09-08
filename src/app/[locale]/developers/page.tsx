import {notFound} from 'next/navigation';
import {getCopy,isLocale} from '@/lib/i18n';
import {DevDocs} from '@/components/DevDocs';

export default async function Page({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  const c=getCopy(locale);
  return <DevDocs copy={c.devdocs} />;
}
