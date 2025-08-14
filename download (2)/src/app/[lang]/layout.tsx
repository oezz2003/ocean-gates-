import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import { getDictionary } from '@/lib/i18n/get-dictionary';
import { Locale } from '@/lib/i18n/i18n-config';

export default async function LanguageLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {
  const dictionary = await getDictionary(lang);

  return (
    <div className={`font-body ${lang === 'ar' ? 'font-cairo' : 'font-poppins'}`}>
        <Header lang={lang} dictionary={dictionary.header} />
        <main>{children}</main>
        <Footer lang={lang} dictionary={dictionary.footer} />
        <WhatsAppButton />
    </div>
  );
}
