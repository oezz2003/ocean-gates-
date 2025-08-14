import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Shield, Star, Globe } from "lucide-react";
import { getDictionary } from "@/lib/i18n/get-dictionary";
import { Locale } from "@/lib/i18n/i18n-config";
import AnimatedSection from "@/components/AnimatedSection";

const valueIcons: { [key: string]: React.ReactNode } = {
    Excellence: <Star className="h-8 w-8 text-primary" />,
    Integrity: <Shield className="h-8 w-8 text-primary" />,
    ClientCentric: <Users className="h-8 w-8 text-primary" />,
    Innovation: <Trophy className="h-8 w-8 text-primary" />,
};

export default async function AboutPage({ params: { lang } }: { params: { lang: Locale } }) {
    const dictionary = await getDictionary(lang);
    const t = dictionary.about;

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
                <div className="container mx-auto px-4 md:px-6 grid md:grid-cols-2 gap-12 items-center">
                    <AnimatedSection as="div" direction={lang === 'ar' ? 'left' : 'right'}>
                    <Image src="/about-story.jpg" alt={t.story.imageAlt} width={600} height={500} className="rounded-lg shadow-xl" data-ai-hint="team meeting" />
                    </AnimatedSection>
                    <AnimatedSection as="div" direction={lang === 'ar' ? 'right' : 'left'} className="space-y-6">
                        <Badge variant="secondary" className="text-lg py-1 px-3 bg-primary/10 text-primary">{t.story.badge}</Badge>
                        <h2 className="text-3xl md:text-4xl font-bold font-headline">{t.story.title}</h2>
                        <p className="text-muted-foreground text-lg">
                            {t.story.p1}
                        </p>
                        <p className="text-muted-foreground text-lg">
                            {t.story.p2}
                        </p>
                    </AnimatedSection>
                </div>
            </AnimatedSection>
            
            <AnimatedSection className="py-20 bg-card">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-4xl font-bold font-headline">{t.values.title}</h2>
                        <p className="text-muted-foreground mt-2">{t.values.subtitle}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {t.values.list.map(value => (
                            <div key={value.title} className="text-center p-6 bg-background rounded-lg space-y-3">
                                {valueIcons[value.icon]}
                                <h3 className="text-2xl font-semibold font-headline">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </AnimatedSection>

            <AnimatedSection className="py-20">
                <div className="container mx-auto px-4 md:px-6 text-center">
                    <h2 className="text-4xl font-bold font-headline mb-4">{t.certifications.title}</h2>
                    <p className="text-muted-foreground mb-8">{t.certifications.subtitle}</p>
                    <div className="flex justify-center items-center gap-8 md:gap-16 flex-wrap">
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <Trophy className="h-10 w-10 text-primary" />
                            <span className="text-lg">{t.certifications.list[0]}</span>
                        </div>
                        <div className="flex items-center gap-3 text-muted-foreground">
                            <Shield className="h-10 w-10 text-primary" />
                            <span className="text-lg">{t.certifications.list[1]}</span>
                        </div>
                         <div className="flex items-center gap-3 text-muted-foreground">
                            <Globe className="h-10 w-10 text-primary" />
                            <span className="text-lg">{t.certifications.list[2]}</span>
                        </div>
                    </div>
                </div>
            </AnimatedSection>
        </div>
    );
}
