
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ShieldCheck, Globe, Warehouse, Truck, ArrowRight, Clock, Award, Users, Map, StepForward, PackageCheck, Anchor } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Locale } from "@/lib/i18n/i18n-config";
import AnimatedSection from "@/components/AnimatedSection";
import Link from "next/link";
import ScrollVelocity from "@/components/ScrollVelocity";


const serviceIcons: { [key: string]: React.ElementType } = {
  "CustomsClearance": ShieldCheck,
  "InternationalShipping": Globe,
  "Warehousing": Warehouse,
  "Transportation": Truck,
};

const whyChooseUsIcons: { [key:string]: React.ElementType } = {
    "ProvenExpertise": Award,
    "GlobalNetwork": Globe,
    "CustomerCentricApproach": Users,
    "TimeEfficiency": Clock,
};

const processIcons: { [key:string]: React.ElementType } = {
    "Consultation": StepForward,
    "Execution": Anchor,
    "Tracking": PackageCheck,
    "Delivery": PackageCheck,
};

export default async function Home({ params: { lang } }: { params: { lang: Locale } }) {
  const dictionary = await getDictionary(lang);
  const t = dictionary.home;

  const scrollTexts = {
    en: ["Global Reach", "Seamless Logistics", "Trusted Partner"],
    ar: ["تغطية عالمية", "خدمات لوجستية سلسة", "شريك موثوق"],
  };

  return (
    <div className="flex flex-col min-h-screen">
      <section id="hero" className="relative h-screen flex items-center justify-center text-center text-white" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Image src="/hero-banner.jpg" alt={t.hero.imageAlt} fill className="object-cover z-0" data-ai-hint="logistics truck" />        <div className="absolute inset-0 bg-black/60 z-10"></div>
        <div className="relative z-20 container mx-auto px-4 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl font-bold font-headline mb-4">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto text-foreground/80 mb-8">
            {t.hero.subtitle}
          </p>
          <Button asChild size="lg">
            <Link href={`/${lang}/services`}>{t.hero.button} <ArrowRight className={lang === 'ar' ? 'mr-2' : 'ml-2'} /></Link>
          </Button>
        </div>
      </section>
      
      <AnimatedSection id="services" className="py-20 bg-background" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline">{t.services.title}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              {t.services.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.services.list.map((service) => {
              const Icon = serviceIcons[service.icon];
              return (
                <Card key={service.title} className="text-center hover:shadow-primary/20 hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-2">
                  <CardHeader>
                    <div className="mx-auto bg-card p-4 rounded-full w-fit">
                      {Icon && <Icon className="w-10 h-10 text-primary" />}
                    </div>
                    <CardTitle className="font-headline text-2xl mt-4">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <section className="py-10 bg-background">
        <ScrollVelocity
          texts={scrollTexts[lang]}
          scrollerClassName="text-muted-foreground"
        />
      </section>

      <AnimatedSection id="why-choose-us" className="py-20 bg-card" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline">{t.whyChooseUs.title}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                {t.whyChooseUs.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.whyChooseUs.features.map((feature) => {
              const Icon = whyChooseUsIcons[feature.icon];
              return (
                <div key={feature.title} className="text-center p-6 bg-background rounded-lg space-y-3 flex flex-col items-center">
                  {Icon && <Icon className="w-10 h-10 text-primary mb-4" />}
                  <h3 className="text-2xl font-semibold font-headline">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="how-it-works" className="py-20 bg-background" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline">{t.howItWorks.title}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">{t.howItWorks.subtitle}</p>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border hidden md:block" />
            {t.howItWorks.steps.map((step, index) => {
                const Icon = processIcons[step.icon];
                return (
                    <div key={step.title} className="relative flex flex-col items-center text-center p-6 bg-card rounded-lg space-y-3 z-10">
                         <div className="absolute -top-5 flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground font-bold text-lg">{index + 1}</div>
                        {Icon && <Icon className="w-12 h-12 text-primary mt-8" />}
                        <h3 className="text-xl font-semibold font-headline pt-4">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
                    </div>
                );
            })}
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection id="global-network" className="py-20 bg-card" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection as="div" direction={lang === 'ar' ? 'left' : 'right'}>
          <Image src="/global-network.jpg" alt={t.globalNetwork.imageAlt} width={600} height={450} className="rounded-lg shadow-xl" data-ai-hint="world map logistics" />
          </AnimatedSection>
          <AnimatedSection as="div" direction={lang === 'ar' ? 'right' : 'left'} className="space-y-6">
            <div className="flex items-center gap-4">
                <Map className="w-10 h-10 text-primary" />
                <h2 className="text-4xl font-bold font-headline">{t.globalNetwork.title}</h2>
            </div>
            <p className="text-muted-foreground text-lg">
              {t.globalNetwork.p1}
            </p>
            <p className="text-muted-foreground text-lg">
              {t.globalNetwork.p2}
            </p>
          </AnimatedSection>
        </div>
      </AnimatedSection>

      <AnimatedSection id="stats" className="py-20 bg-primary/10" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                {t.stats.map((stat) => (
                    <div key={stat.label}>
                        <h3 className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</h3>
                        <p className="text-muted-foreground mt-2 text-lg">{stat.label}</p>
                    </div>
                ))}
            </div>
        </div>
      </AnimatedSection>


      <AnimatedSection id="vision-mission" className="py-20 bg-background" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
          <AnimatedSection as="div" direction={lang === 'ar' ? 'left' : 'right'} className="space-y-6">
            <h2 className="text-4xl font-bold font-headline">{t.visionMission.title}</h2>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary font-headline">{t.visionMission.vision.title}</h3>
              <p className="text-muted-foreground">
                {t.visionMission.vision.text}
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-primary font-headline">{t.visionMission.mission.title}</h3>
              <p className="text-muted-foreground">
                {t.visionMission.mission.text}
              </p>
            </div>
          </AnimatedSection>
          <AnimatedSection as="div" direction={lang === 'ar' ? 'right' : 'left'}>
          <Image src="/vision-mission.jpg" alt={t.visionMission.imageAlt} width={600} height={500} className="rounded-lg shadow-xl" data-ai-hint="shipping containers" />          </AnimatedSection>
        </div>
      </AnimatedSection>

      <AnimatedSection id="cta" className="py-20 bg-card" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-headline mb-4">{t.cta.title}</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              {t.cta.subtitle}
            </p>
            <Button asChild size="lg">
                <Link href={`/${lang}/contact`}>{t.cta.button}</Link>
            </Button>
        </div>
      </AnimatedSection>

      <AnimatedSection id="testimonials" className="py-20 bg-background" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold font-headline">{t.testimonials.title}</h2>
            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
              {t.testimonials.subtitle}
            </p>
          </div>
          <Carousel opts={{ loop: true, direction: lang === 'ar' ? "rtl" : "ltr" }} className="w-full max-w-4xl mx-auto">
            <CarouselContent>
              {t.testimonials.list.map((testimonial, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Card className="bg-card">
                      <CardContent className="flex flex-col items-center text-center p-8 space-y-4">
                        <p className="text-lg italic text-foreground/90">"{testimonial.quote}"</p>
                        <div className="flex items-center gap-4 pt-4">
                           <Avatar>
                            <AvatarImage src={testimonial.image} alt={testimonial.name} data-ai-hint={testimonial.dataAiHint} />
                            <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </AnimatedSection>
    </div>
  );
}

    

    

