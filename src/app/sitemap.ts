import type {MetadataRoute} from 'next';
import {locales} from '@/lib/i18n';
import {languageAlternates, pageKeys, pageUrl} from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  // pageKeys includes the dedicated accounting and translation pages in RU/KY/EN.
  return pageKeys.flatMap(page => locales.map(locale => ({
    url: pageUrl(locale, page),
    alternates: {languages: languageAlternates(page)},
  })));
}
