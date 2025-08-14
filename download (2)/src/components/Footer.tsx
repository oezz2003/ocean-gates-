import Link from 'next/link';
import { Ship, Phone, Mail, MapPin } from 'lucide-react';
import type { Dictionary } from '@/lib/i18n/get-dictionary';
import { Locale } from '@/lib/i18n/i18n-config';

export default function Footer({ lang, dictionary }: { lang: Locale, dictionary: Dictionary['footer'] }) {
  const quickLinks = [
    { href: `/${lang}`, label: dictionary.links.home },
    { href: `/${lang}/services`, label: dictionary.links.services },
    { href: `/${lang}/about`, label: dictionary.links.about },
    { href: `/${lang}/contact`, label: dictionary.links.contact },
  ];

  return (
    <footer className="bg-card text-card-foreground" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6 py-12">
        <div className="space-y-4">
          <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-2xl text-primary">
            <Ship className="h-8 w-8" />
            <span className="font-headline">{dictionary.brand}</span>
          </Link>
          <p className="text-muted-foreground">
            {dictionary.tagline}
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold font-headline">{dictionary.quickLinks}</h3>
          <ul className="space-y-2">
            {quickLinks.map(link => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary transition-colors">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold font-headline">{dictionary.contactUs}</h3>
          <ul className="space-y-2 text-muted-foreground">
            <li className="flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /> {dictionary.address}</li>
            <li className="flex items-center gap-2"><Mail className="h-5 w-5 text-primary" /> {dictionary.email}</li>
            <li className="flex items-center gap-2"><Phone className="h-5 w-5 text-primary" /> {dictionary.phone}</li>
          </ul>
        </div>
      </div>
      <div className="bg-background">
        <div className="container mx-auto px-4 md:px-6 py-4 text-center text-muted-foreground">
          {dictionary.copyright.replace('{year}', new Date().getFullYear().toString())}
        </div>
      </div>
    </footer>
  );
}
