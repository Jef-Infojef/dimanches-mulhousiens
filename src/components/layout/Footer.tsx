import Link from "next/link";
import { Mail, MapPin, Instagram, Facebook, ArrowRight } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold tracking-tighter italic text-primary">
              Les Dimanches Mulhousiens
            </h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              Le rendez-vous mensuel de la création et de l&apos;artisanat au cœur de Mulhouse. Célébrons ensemble le savoir-faire local.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-white dark:bg-zinc-900 rounded-full border hover:text-primary transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="p-2 bg-white dark:bg-zinc-900 rounded-full border hover:text-primary transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Section */}
          <div>
            <h4 className="font-bold mb-6">Navigation</h4>
            <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/#concept" className="hover:text-primary transition-colors">Le Concept</Link></li>
              <li><Link href="/#dates" className="hover:text-primary transition-colors">Calendrier 2026</Link></li>
              <li><Link href="/annuaire" className="hover:text-primary transition-colors">Annuaire des Créateurs</Link></li>
              <li><Link href="/adherer" className="hover:text-primary transition-colors">Devenir Exposant</Link></li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h4 className="font-bold mb-6">Informations</h4>
            <ul className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
              <li><Link href="/mentions-legales" className="hover:text-primary transition-colors">Mentions Légales</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/login" className="hover:text-primary transition-colors">Espace Exposant</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="space-y-6">
            <h4 className="font-bold">Contact Rapide</h4>
            <div className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <MapPin className="h-5 w-5 text-primary shrink-0" />
              <span>Place de la Réunion, 68100 Mulhouse</span>
            </div>
            <div className="flex items-start gap-3 text-sm text-zinc-600 dark:text-zinc-400">
              <Mail className="h-5 w-5 text-primary shrink-0" />
              <span>contact@dimanches-mulhousiens.fr</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
          <p>© {currentYear} Les Dimanches Mulhousiens. Tous droits réservés.</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-zinc-900 dark:hover:text-white transition-colors">RGPD</Link>
            <Link href="/mentions-legales" className="hover:text-zinc-900 dark:hover:text-white transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
