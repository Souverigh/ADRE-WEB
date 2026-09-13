import Image from 'next/image';
import Link from 'next/link';
import {notFound} from 'next/navigation';
import {getCopy,isLocale,locales} from '@/lib/i18n';
import {languageCodes} from '@/lib/seo';
import '../globals.css';

export function generateStaticParams() {
  return locales.map(locale => ({locale}));
}

export default async function LocaleLayout({children,params}:{children:React.ReactNode;params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if(!isLocale(locale)) notFound();
  const c=getCopy(locale);
  return <html lang={languageCodes[locale]}><body>
    <header className="siteHeader">
      <div className="container headerInner">
        <Link href={`/${locale}`} className="brand">
          <Image src="/adre-logo.png" alt="ADRE" width={140} height={42} priority style={{height:32,width:'auto'}}/>
        </Link>
        <nav className="mainNav">
          <Link href={`/${locale}/platform`}>{c.nav.platform}</Link>
          <Link href={`/${locale}#solutions`}>{c.nav.solutions}</Link>
          <Link href={`/${locale}/developers`}>{c.nav.developers}</Link>
          <Link href={`/${locale}/security`}>{c.nav.security}</Link>
          <Link href={`/${locale}/pricing`}>{c.nav.pricing}</Link>
        </nav>
        <div className="localeNav"><Link href="/ru">RU</Link><Link href="/kg">KG</Link><Link href="/en">EN</Link></div>
      </div>
    </header>
    {children}
    <footer className="siteFooter">
      <div className="container footerContent">
        <div className="footerTop">
          <div className="footerBrand">
            <Link href={`/${locale}`} className="footerLogo">
              <Image src="/adre-logo.png" alt="ADRE" width={140} height={42} style={{height:32,width:'auto'}}/>
            </Link>
            <p>{c.footer.tagline}</p>
          </div>
          <nav className="footerLinks">
            <Link href={`/${locale}/about`}>{c.footer.about}</Link>
            <Link href={`/${locale}/contact`}>{c.footer.contact}</Link>
          </nav>
        </div>
        <div className="footerBottom">
          <span className="footerCopyright">© ADRE</span>
          <nav className="footerLegal">
            <Link href={`/${locale}/privacy`}>{c.footer.privacy}</Link>
            <Link href={`/${locale}/terms`}>{c.footer.terms}</Link>
            <Link href={`/${locale}/data-processing`}>{c.footer.data}</Link>
          </nav>
        </div>
      </div>
    </footer>
  </body></html>;
}
