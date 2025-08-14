
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Ship, Home, Briefcase, Info, Mail } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { Locale } from '@/lib/i18n/i18n-config';
import type { Dictionary } from '@/lib/i18n/get-dictionary';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Header({ lang, dictionary }: { lang: Locale; dictionary: Dictionary['header'] }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: `/${lang}`, label: dictionary.home, Icon: Home },
    { href: `/${lang}/services`, label: dictionary.services, Icon: Briefcase },
    { href: `/${lang}/about`, label: dictionary.about, Icon: Info },
    { href: `/${lang}/contact`, label: dictionary.contact, Icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); 
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomePage = pathname === `/${lang}`;
  const headerIsSticky = !isHomePage || isScrolled;

  return (
    <>
      <header dir={lang === 'ar' ? 'rtl' : 'ltr'} className={cn(
        "hidden md:flex w-full top-0 z-40 transition-all duration-300 py-2 fixed",
        headerIsSticky ? "bg-card/80 backdrop-blur-sm shadow-md" : "bg-transparent"
      )}>
        <div className="container mx-auto">
          <div className="flex h-16 w-full items-center justify-between px-4 md:px-6">
            <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-xl text-primary">
              <Ship className="h-7 w-7" />
              <span className="font-headline">{dictionary.brand}</span>
            </Link>
            <nav className="flex items-center gap-6 text-lg font-medium">
              {navLinks.map(({ href, label }) => (
                <Link key={href} href={href} className={cn(
                  "transition-colors",
                  "text-foreground/80 hover:text-primary",
                  { "text-primary font-semibold": pathname === href }
                )}>
                  <span>{label}</span>
                </Link>
              ))}
            </nav>
            <LanguageSwitcher lang={lang} />
          </div>
        </div>
      </header>

      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-2 bg-card/80 backdrop-blur-sm">
        <nav className="flex justify-around items-center h-16 w-full">
          {navLinks.slice(0, 4).map(({ href, label, Icon }) => (
            <Link key={href} href={href} className={cn("flex flex-col items-center gap-1 text-xs transition-colors hover:text-primary", pathname === href ? "text-primary" : "text-muted-foreground")}>
              <Icon className="h-6 w-6" />
              <span>{label}</span>
            </Link>
          ))}
          <Sheet>
            <SheetTrigger asChild>
                <button className="flex flex-col items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary">
                    <Menu className="h-6 w-6" />
                    <span>More</span>
                </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="bg-card h-auto rounded-t-2xl">
              <SheetHeader className="sr-only">
                <SheetTitle>More Options</SheetTitle>
                <SheetDescription>
                  Access additional options like the language switcher.
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col gap-6 p-6">
                <div className="flex justify-between items-center">
                    <Link href={`/${lang}`} className="flex items-center gap-2 font-bold text-xl text-primary">
                      <Ship className="h-7 w-7" />
                      <span className="font-headline">{dictionary.brand}</span>
                    </Link>
                    <LanguageSwitcher lang={lang} />
                </div>
                <p className='text-muted-foreground'>Switch language or access other settings.</p>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </>
  );
}
