import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';

const base = process.argv[2] || 'http://localhost:3100';
const canonicalHost = 'https://www.adre-cloud.com';
const texts = JSON.parse(readFileSync(new URL('../src/lib/seo-texts.json', import.meta.url), 'utf8'));
assert.doesNotMatch(JSON.stringify(texts), /\?{3}|\uFFFD/, 'SEO copy must retain Unicode text');
const locales = {ru: 'ru', kg: 'ky', en: 'en'};
async function get(path) {
  return fetch(`${base}${path}`, {redirect: 'manual', signal: AbortSignal.timeout(30000)});
}
const robots = await get('/robots.txt');
assert.equal(robots.status, 200, 'robots.txt must not redirect or return 404');
assert.match(robots.headers.get('content-type'), /text\/plain/);
const rules = await robots.text();
assert.match(rules, /Allow: \//);
assert.ok(rules.includes(`Sitemap: ${canonicalHost}/sitemap.xml`));
assert.doesNotMatch(rules, /Disallow:\s*\/\s*(?:\n|$)/);
const sitemap = await get('/sitemap.xml');
assert.equal(sitemap.status, 200);
assert.match(sitemap.headers.get('content-type'), /xml/);
const xml = await sitemap.text();
assert.equal([...xml.matchAll(/<loc>/g)].length, 33);
const titles = new Set();
for (const [page, copy] of Object.entries(texts)) {
  const suffix = page === 'home' ? '' : `/${page}`;
  for (const [locale, language] of Object.entries(locales)) {
    const path = `/${locale}${suffix}`;
    const response = await get(path);
    assert.equal(response.status, 200, path);
    assert.doesNotMatch(response.headers.get('x-robots-tag') || '', /noindex/i);
    const html = await response.text();
    const head = html.split('</head>')[0];
    assert.ok(head.includes(`<title>${copy[locale].title}</title>`), `${path}: title in initial head`);
    assert.ok(head.includes(`name="description" content="${copy[locale].description}"`), `${path}: description`);
    assert.ok(head.includes(`rel="canonical" href="${canonicalHost}${path}"`), `${path}: canonical`);
    assert.ok(html.includes(`<html lang="${language}"`), `${path}: HTML language`);
    assert.doesNotMatch(html, /<meta[^>]*content="[^"]*noindex/i);
    assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `${path}: one rendered H1`);
    assert.ok(xml.includes(`<loc>${canonicalHost}${path}</loc>`));
    for (const [other, code] of Object.entries(locales)) {
      assert.ok(head.includes(`hrefLang="${code}" href="${canonicalHost}/${other}${suffix}"`), `${path}: ${code} alternate`);
    }
    assert.ok(head.includes(`hrefLang="x-default" href="${canonicalHost}/ru${suffix}"`));
    titles.add(copy[locale].title);
  }
}
assert.equal(titles.size, 33, 'Page titles must be unique');
assert.equal([...xml.matchAll(/hreflang="ky"/g)].length, 33);
assert.doesNotMatch(xml, /hreflang="kg"/);
const entry = await get('/');
assert.equal(entry.status, 308);
assert.equal(entry.headers.get('location'), '/ru');
for (const path of ['/zz', '/ru/does-not-exist']) {
  assert.equal((await get(path)).status, 404, path);
}
console.log('SEO audit passed: 33 pages, initial HTML metadata, languages, canonicals, sitemap, robots, redirect and 404s.');
