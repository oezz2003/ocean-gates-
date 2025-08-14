import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ShieldCheck, Globe, Warehouse, Truck } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Locale } from "@/lib/i18n/i18n-config";
import AnimatedSection from "@/components/AnimatedSection";


const serviceIcons: { [key: string]: React.ElementType } = {
  CustomsClearance: ShieldCheck,
  InternationalShipping: Globe,
  Warehousing: Warehouse,
  LandTransport: Truck,
};

export default async function ServicesPage({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const t = dictionary.services;
  
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

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-6 space-y-20">
          {t.list.map((service, index) => {
            const Icon = serviceIcons[service.icon];
            const isReversed = index % 2 !== 0;
            const textDirection = isReversed ? (lang === 'ar' ? 'right' : 'left') : (lang === 'ar' ? 'left' : 'right');
            const imageDirection = isReversed ? (lang === 'ar' ? 'left' : 'right') : (lang === 'ar' ? 'right' : 'left');

            return (
            <AnimatedSection as="div" key={service.title} className={`grid md:grid-cols-2 gap-12 items-center ${isReversed ? 'md:grid-flow-col-dense' : ''}`}>
              <AnimatedSection as="div" direction={textDirection} className={`space-y-4 ${isReversed ? (lang === 'ar' ? 'md:col-start-1' : 'md:col-start-2') : ''} ${(index % 2 === 0 && lang === 'ar') ? 'md:col-start-2' : ''}`}>
                <div className="flex items-center gap-4">
                  {Icon && <Icon className="w-12 h-12 text-primary" />}
                  <h2 className="text-3xl font-bold font-headline">{service.title}</h2>
                </div>
                <p className="text-muted-foreground text-lg">{service.description}</p>
              </AnimatedSection>
              <AnimatedSection as="div" direction={imageDirection} className={`${isReversed ? (lang === 'ar' ? 'md:col-start-2' : 'md:col-start-1') : ''} ${(index % 2 === 0 && lang === 'ar') ? 'md:col-start-1' : ''}`}>
                <Image
                  src={service.image}
                  alt={service.title}
                  width={500}
                  height={350}
                  className="rounded-lg shadow-xl w-full h-auto"
                  data-ai-hint={service.dataAiHint}
                />
              </AnimatedSection>
            </AnimatedSection>
            )
          })}
        </div>
      </section>

      <AnimatedSection className="py-20 bg-card">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline">{t.faq.title}</h2>
            <p className="text-muted-foreground mt-2">{t.faq.subtitle}</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {t.faq.list.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
