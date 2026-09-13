import type {MetadataRoute} from 'next';
import {locales} from '@/lib/i18n';
import {languageAlternates, pageKeys, pageUrl} from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  return pageKeys.flatMap(page => locales.map(locale => ({
    url: pageUrl(locale, page),
    alternates: {languages: languageAlternates(page)},
  })));
}
