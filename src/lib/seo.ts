import type {Metadata} from 'next';
import {notFound} from 'next/navigation';
import {isLocale, type Locale} from './i18n';
import texts from './seo-texts.json';

// Match the primary production host; the apex currently redirects to www.
export const siteUrl = 'https://www.adre-cloud.com';
export const pageKeys = Object.keys(texts) as (keyof typeof texts)[];
export const languageCodes = {ru: 'ru', kg: 'ky', en: 'en'} as const;
const ogLocales = {ru: 'ru_RU', kg: 'ky_KG', en: 'en_US'} as const;

export function pageUrl(locale: Locale, page: keyof typeof texts) {
  return `${siteUrl}/${locale}${page === 'home' ? '' : `/${page}`}`;
}

export function languageAlternates(page: keyof typeof texts) {
  return {ru: pageUrl('ru', page), ky: pageUrl('kg', page), en: pageUrl('en', page), 'x-default': pageUrl('ru', page)};
}

export function pageMetadata(locale: string, page: keyof typeof texts): Metadata {
  if (!isLocale(locale)) notFound();
  const {title, description} = texts[page][locale];
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    alternates: {canonical: pageUrl(locale, page), languages: languageAlternates(page)},
    icons: {icon: '/favicon.svg', apple: '/adre-icon.png'},
    openGraph: {
      title, description, url: pageUrl(locale, page), siteName: 'ADRE', type: 'website',
      locale: ogLocales[locale],
      alternateLocale: Object.entries(ogLocales).filter(([key]) => key !== locale).map(([, value]) => value),
      images: [{url: '/adre-logo.png', alt: 'ADRE'}],
    },
    twitter: {card: 'summary', title, description, images: ['/adre-logo.png']},
  };
}
