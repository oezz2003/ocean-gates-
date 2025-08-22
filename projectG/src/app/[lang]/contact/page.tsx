import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { Phone, Mail, MapPin } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Locale } from "@/lib/i18n/i18n-config";
import AnimatedSection from "@/components/AnimatedSection";

export default async function ContactPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const t = dictionary.contact;

  return (
    <div className="bg-background" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <AnimatedSection as="div" direction="up" className="py-20 bg-card">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-headline">{t.hero.title}</h1>
          <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">
            {t.hero.subtitle}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-16 items-start">
          <AnimatedSection as="div" direction={lang === 'ar' ? 'left' : 'right'} className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold font-headline mb-6">{t.info.title}</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1"><MapPin className="h-6 w-6 text-primary" /></div>
                  <div>
                    <h3 className="font-semibold text-lg">{t.info.office.title}</h3>
                    <p className="text-muted-foreground" dangerouslySetInnerHTML={{ __html: t.info.office.address }} />
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1"><Mail className="h-6 w-6 text-primary" /></div>
                  <div>
                    <h3 className="font-semibold text-lg">{t.info.email.title}</h3>
                    <p className="text-muted-foreground">{t.info.email.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1"><Phone className="h-6 w-6 text-primary" /></div>
                  <div>
                    <h3 className="font-semibold text-lg">{t.info.phone.title}</h3>
                    <p className="text-muted-foreground">{t.info.phone.number}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-3xl font-bold font-headline mb-6">{t.location.title}</h2>
              <div className="aspect-video w-full rounded-lg overflow-hidden shadow-xl border border-border">
                <Image
                  src="/contact.jpg"
                  alt={t.location.imageAlt}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  data-ai-hint="dubai map"
                />
              </div>
            </div>
          </AnimatedSection>
          <AnimatedSection as="div" direction={lang === 'ar' ? 'right' : 'left'} className="bg-card p-8 rounded-lg shadow-lg">
            <h2 className="text-3xl font-bold font-headline mb-6">{t.form.title}</h2>
            <ContactForm dictionary={t.form} />
          </AnimatedSection>
        </div>
      </AnimatedSection>
    </div>
  );
}
