import type {MetadataRoute} from 'next';
import {siteUrl} from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  // Public module pages are covered by allow: '/'; keep API endpoints out of crawling.
  return {rules: {userAgent: '*', allow: '/', disallow: '/api/'}, sitemap: `${siteUrl}/sitemap.xml`};
}
