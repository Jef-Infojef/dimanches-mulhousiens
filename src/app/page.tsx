"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Palette, Hammer, Users, ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const dates = [
  { day: "07", month: "Juin", year: "2026", theme: "Lancement & Nature" },
  { day: "05", month: "Juillet", year: "2026", theme: "Art Urbain & Design" },
  { day: "02", month: "Août", year: "2026", theme: "Matières & Textures" },
  { day: "06", month: "Septembre", year: "2026", theme: "Clôture & Héritage" },
];

const faqs = [
  {
    q: "Quels sont les tarifs pour un emplacement ?",
    a: "Le tarif est de 45€ par dimanche pour un emplacement de 3x3m. Des tarifs préférentiels sont disponibles si vous vous engagez sur les 4 dates."
  },
  {
    q: "Proposez-vous du matériel (table, électricité) ?",
    a: "Chaque exposant doit être autonome pour son stand. L'électricité peut être fournie sur demande spécifique lors de l'inscription (option payante)."
  },
  {
    q: "L'événement est-il maintenu en cas de pluie ?",
    a: "Oui, l'événement a lieu par tous les temps. En cas d'alerte météo majeure, une décision d'annulation peut être prise 48h avant."
  },
  {
    q: "Comment sont sélectionnés les exposants ?",
    a: "Nous privilégions le 'Fait-Main', l'originalité et la qualité artisanale. Un comité de sélection étudie chaque dossier pour garantir la diversité."
  }
];

export default function Home() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const supabase = createBrowserSupabaseClient();

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus('loading');
    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert([{ email: newsletterEmail }]);
      
      if (error) throw error;
      setNewsletterStatus('success');
      setNewsletterEmail("");
    } catch (err: any) {
      console.error(err);
      if (err.code === '23505') { // Code pour clé dupliquée (déjà inscrit)
        setNewsletterStatus('success');
      } else {
        setNewsletterStatus('error');
      }
    }
  };

  return (
    <div className="flex flex-col gap-20 pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl font-extrabold tracking-tight md:text-7xl mb-6">
              Les Dimanches <br />
              <span className="text-primary italic">Mulhousiens</span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 md:text-xl mb-10">
              L&apos;événement incontournable des créateurs et artisans. Un rendez-vous mensuel au cœur de la ville pour célébrer le savoir-faire local.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="rounded-full px-8 gap-2" asChild>
                <Link href="/adherer">
                  Devenir Exposant <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="rounded-full px-8" asChild>
                <Link href="#dates">Voir les dates</Link>
              </Button>
            </div>
          </motion.div>
        </div>
        
        {/* Background decorative elements */}
        <div className="absolute top-0 -z-10 h-full w-full bg-[radial-gradient(100%_50%_at_50%_0%,rgba(0,163,255,0.05)_0,rgba(0,163,255,0)_50%),radial-gradient(100%_50%_at_50%_100%,rgba(0,163,255,0.05)_0,rgba(0,163,255,0)_50%)]" />
      </section>

      {/* Stats / Features */}
      <section className="container mx-auto px-4" id="concept">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Palette, title: "Artistes Créateurs", desc: "Peintres, sculpteurs et designers présentent leurs œuvres uniques." },
            { icon: Hammer, title: "Artisans Passionnés", desc: "Le geste et la matière à l'honneur : bois, métal, céramique, textile." },
            { icon: Users, title: "Partage & Échange", desc: "Une rencontre conviviale entre passionnés de culture et d'art." },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="border-none bg-zinc-50 dark:bg-zinc-900 shadow-none">
                <CardContent className="pt-6">
                  <item.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Spirit Section - Bento Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4 md:text-4xl">L&apos;Esprit des Dimanches</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Une immersion dans l&apos;artisanat et la création mulhousienne.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-4 h-[800px] md:h-[600px]">
          <div className="md:col-span-2 md:row-span-2 relative overflow-hidden rounded-3xl bg-orange-100 dark:bg-orange-950/20 group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=800')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-2xl font-bold">Artisanat Local</h3>
              <p className="text-zinc-200">Le fruit d&apos;un travail passionné.</p>
            </div>
          </div>
          <div className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-3xl bg-blue-100 dark:bg-blue-950/20 group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1459749411177-042180ce673c?q=80&w=600')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-6 left-6 text-white">
              <h3 className="text-lg font-bold">Convivialité</h3>
            </div>
          </div>
          <div className="md:col-span-1 md:row-span-2 relative overflow-hidden rounded-3xl bg-zinc-100 dark:bg-zinc-800 group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=600')] bg-cover bg-center transition-transform duration-500 group-hover:scale-110 opacity-80" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-8 left-8 text-white">
              <h3 className="text-xl font-bold">Ateliers</h3>
              <p className="text-zinc-200 text-sm">Apprendre et créer.</p>
            </div>
          </div>
          <div className="md:col-span-1 md:row-span-1 relative overflow-hidden rounded-3xl bg-green-100 dark:bg-green-950/20 group">
             <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
               <p className="text-zinc-800 dark:text-zinc-200 font-medium italic">&quot;Une parenthèse artistique au coeur de Mulhouse&quot;</p>
             </div>
          </div>
        </div>
      </section>

      {/* Dates Section */}
      <section className="bg-zinc-900 py-24 text-white" id="dates">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold mb-4 md:text-4xl">Le Calendrier 2026</h2>
            <p className="text-zinc-400">Tous les premiers dimanches du mois, de 10h à 18h.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dates.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl bg-zinc-800 p-8 hover:bg-primary transition-all duration-300"
              >
                <div className="relative z-10">
                  <p className="text-zinc-400 group-hover:text-zinc-100 transition-colors">{item.month} {item.year}</p>
                  <h3 className="text-6xl font-black my-4">{item.day}</h3>
                  <p className="font-medium group-hover:text-white transition-colors uppercase tracking-wider text-xs">
                    {item.theme}
                  </p>
                </div>
                <Calendar className="absolute -right-4 -bottom-4 h-32 w-32 opacity-10 group-hover:opacity-20 transition-all duration-500" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-zinc-50 dark:bg-zinc-900/50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-16 text-center md:text-4xl">Ils ont aimé l&apos;édition précédente</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie Martin",
                role: "Céramiste",
                content: "Une organisation impeccable et un public curieux. Les Dimanches Mulhousiens m'ont permis de faire connaître mon atelier à une nouvelle clientèle.",
                avatar: "SM"
              },
              {
                name: "Lucas Bernard",
                role: "Visiteur",
                content: "C'est devenu notre rendez-vous du dimanche en famille. On y découvre toujours des pépites et l'ambiance est vraiment chaleureuse.",
                avatar: "LB"
              },
              {
                name: "Marc Durand",
                role: "Artiste Peintre",
                content: "Le cadre est magnifique et la sélection des artistes est de grande qualité. Une très belle vitrine pour l'art local.",
                avatar: "MD"
              }
            ].map((t, i) => (
              <Card key={i} className="bg-white dark:bg-zinc-900 border-none shadow-sm">
                <CardContent className="pt-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                      {t.avatar}
                    </div>
                    <div>
                      <h4 className="font-bold">{t.name}</h4>
                      <p className="text-sm text-zinc-500">{t.role}</p>
                    </div>
                  </div>
                  <p className="italic text-zinc-600 dark:text-zinc-400">&quot;{t.content}&quot;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container mx-auto px-4 max-w-3xl py-24">
        <h2 className="text-3xl font-bold mb-12 text-center md:text-4xl">Questions Fréquentes</h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`item-${i}`}>
              <AccordionTrigger className="text-left font-semibold">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-zinc-600 dark:text-zinc-400">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Newsletter Section */}
      <section className="bg-primary py-20 overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
            <div className="text-white flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">Restez informé</h2>
              <p className="text-primary-foreground/80 text-lg">
                Recevez les dernières actualités, les thèmes des prochains dimanches et les portraits de nos créateurs.
              </p>
            </div>
            <div className="flex-1 w-full max-w-md">
              {newsletterStatus === 'success' ? (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-3xl text-white flex items-center gap-4 animate-in fade-in zoom-in duration-300">
                  <CheckCircle2 className="h-8 w-8 text-white shrink-0" />
                  <div>
                    <p className="font-bold">Vous êtes inscrit !</p>
                    <p className="text-sm opacity-80">Merci de votre intérêt pour l&apos;événement.</p>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2 p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/20">
                  <input 
                    type="email" 
                    placeholder="votre@email.com" 
                    className="flex-1 bg-transparent border-none focus:outline-none px-4 text-white placeholder:text-white/50"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    disabled={newsletterStatus === 'loading'}
                  />
                  <Button 
                    type="submit"
                    className="bg-white text-primary hover:bg-zinc-100 rounded-full px-6"
                    disabled={newsletterStatus === 'loading'}
                  >
                    {newsletterStatus === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : "S'inscrire"}
                  </Button>
                </form>
              )}
              {newsletterStatus === 'error' && (
                <p className="text-white/80 text-xs mt-2 text-center">Une erreur est survenue. Réessayez plus tard.</p>
              )}
            </div>
          </div>
        </div>
        {/* Decorative circle */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-zinc-50 dark:bg-zinc-950/20">
        <div className="container mx-auto px-4">
          <p className="text-center text-zinc-500 font-medium uppercase tracking-widest text-xs mb-10">Ils soutiennent l&apos;artisanat local</p>
          <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="font-black text-2xl text-zinc-400">MULHOUSE</div>
            <div className="font-black text-2xl text-zinc-400">M2A</div>
            <div className="font-black text-2xl text-zinc-400">CMA GRAND EST</div>
            <div className="font-black text-2xl text-zinc-400">RÉGION GRAND EST</div>
          </div>
        </div>
      </section>

      {/* Call to Action for Exhibitors */}
      <section className="container mx-auto px-4 text-center" id="exposants">
        <div className="rounded-3xl bg-primary/5 border-2 border-primary/10 p-12 md:p-20">
          <h2 className="text-3xl font-bold mb-6 md:text-4xl">Vous êtes un créateur ?</h2>
          <p className="mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 mb-10">
            Rejoignez l&apos;aventure et donnez de la visibilité à votre travail. Nous recherchons des artistes et artisans passionnés pour enrichir cette édition 2026.
          </p>
          <Button size="lg" className="rounded-full px-12 text-lg" asChild>
            <Link href="/adherer">Candidater maintenant</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
