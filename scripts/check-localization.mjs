import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const i18nPath = path.join(root, 'src/lib/i18n.ts');
const i18n = fs.readFileSync(i18nPath, 'utf8');

function between(start, end) {
  const a = i18n.indexOf(start);
  const b = i18n.indexOf(end, a + start.length);
  if (a < 0 || b < 0) throw new Error(`Could not locate ${start}..${end}`);
  return i18n.slice(a, b);
}

const ru = between('const ru = {', 'const en: Copy = {');
const en = between('const en: Copy = {', 'const kg: Copy = {');
const kg = between('const kg: Copy = {', 'export const dictionaries');

const errors = [];
const forbiddenRu = ['Document Intelligence','Confidence Score','Business rules','Batch processing','Structured data','Book a demo','Try ADRE','Review needed','High confidence','Public API','Completion webhook'];
const forbiddenKg = ['Document Intelligence','Confidence Score','Business rules','Batch processing','Structured data','Book a demo','Try ADRE','Review needed','High confidence','Public API','Completion webhook','Рабочая электронная почта','Записаться на демо','Попробовать бесплатно'];

for (const phrase of forbiddenRu) if (ru.toLowerCase().includes(phrase.toLowerCase())) errors.push(`ru: untranslated phrase: ${phrase}`);
for (const phrase of forbiddenKg) if (kg.toLowerCase().includes(phrase.toLowerCase())) errors.push(`kg: untranslated phrase: ${phrase}`);

const requiredKeys = ['comparison','confidence','validation','batch','exports','documents','customization'];
for (const [name, block] of [['ru',ru],['en',en],['kg',kg]]) {
  for (const key of requiredKeys) {
    if (!block.includes(`${key}:`)) errors.push(`${name}: missing localized section ${key}`);
  }
}

const jsxFiles = [
  'src/components/HeroDemo.tsx',
  'src/components/IndustryTabs.tsx',
  'src/components/DemoForm.tsx',
  'src/app/[locale]/page.tsx',
  ...fs.readdirSync(path.join(root, 'src/app/[locale]'), {withFileTypes:true})
    .filter(d => d.isDirectory())
    .map(d => `src/app/[locale]/${d.name}/page.tsx`)
].filter(f => fs.existsSync(path.join(root, f)));

const forbiddenJsx = [
  'aria-label="Tamga product demonstration"',
  '<span>Document</span>', '<span>Classify</span>', '<span>Extract</span>', '<span>Structured data</span>',
  '<option>Accounting</option>', '<option>Banking / MFO</option>', '<option>Logistics</option>',
  '<option>Legal</option>', '<option>Retail</option>', '<option>Government / NGO</option>', '<option>Other</option>',
  'eyebrow="Demo"', 'eyebrow="Company"', 'eyebrow="Legal"', 'eyebrow="Developers"',
  'eyebrow="Docs"', 'eyebrow="Platform"', 'eyebrow="Pricing"', 'eyebrow="Security"'
];

for (const rel of jsxFiles) {
  const text = fs.readFileSync(path.join(root, rel), 'utf8');
  for (const phrase of forbiddenJsx) {
    if (text.includes(phrase)) errors.push(`${rel}: hardcoded untranslated UI: ${phrase}`);
  }
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('Localization audit passed: RU/KG/EN sections are present and no known untranslated marketing phrases were found.');
