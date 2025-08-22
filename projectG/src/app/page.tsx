// This component now correctly redirects to the language-specific home page.
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';
import { i18n } from '@/lib/i18n/i18n-config';

function getLocale() {
  const acceptLanguage = headers().get('accept-language');
  if (acceptLanguage) {
    const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0].trim());
    for (const lang of languages) {
      if (i18n.locales.includes(lang as any)) {
        return lang;
      }
      const genericLang = lang.split('-')[0];
      if (i18n.locales.includes(genericLang as any)) {
        return genericLang;
      }
    }
  }
  return i18n.defaultLocale;
}

export default function HomeRedirect() {
  const locale = getLocale();
  redirect(`/${locale}`);
}
