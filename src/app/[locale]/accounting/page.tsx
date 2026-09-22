import {notFound} from 'next/navigation';
import {ModulePage} from '@/components/ModulePage';
import {isLocale} from '@/lib/i18n';
import {pageMetadata} from '@/lib/seo';

export default async function Page({params}: {params: Promise<{locale: string}>}) {
  const {locale} = await params;
  if (!isLocale(locale)) notFound();
  return <ModulePage locale={locale} moduleId="accounting"/>;
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>}) {
  return pageMetadata((await params).locale, 'accounting');
}
