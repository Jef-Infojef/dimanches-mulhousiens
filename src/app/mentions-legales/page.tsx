import { Shield, Lock, Scale, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function MentionsLegales() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Mentions <span className="text-primary italic">Légales</span></h1>
        <p className="text-zinc-500 max-w-2xl mx-auto">
          Informations obligatoires concernant l&apos;éditeur du site, l&apos;hébergement et la protection de vos données.
        </p>
      </div>
      
      <div className="grid gap-8">
        {/* Éditeur et Hébergement */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="border-none shadow-sm bg-zinc-50 dark:bg-zinc-900">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <FileText className="h-6 w-6" />
                <h2 className="text-xl font-bold">1. Édition du site</h2>
              </div>
              <div className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                <p><strong>Propriétaire :</strong> Association Les Dimanches Mulhousiens</p>
                <p><strong>Adresse :</strong> Place de la Réunion, 68100 Mulhouse</p>
                <p><strong>Contact :</strong> contact@dimanches-mulhousiens.fr</p>
                <p><strong>Responsable de publication :</strong> Le Président de l&apos;association</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm bg-zinc-50 dark:bg-zinc-900">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-4 text-primary">
                <Shield className="h-6 w-6" />
                <h2 className="text-xl font-bold">2. Hébergement</h2>
              </div>
              <div className="space-y-2 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                <p><strong>Hébergeur :</strong> Vercel Inc.</p>
                <p><strong>Adresse :</strong> 340 S Lemon Ave #4133 Walnut, CA 91789, USA</p>
                <p><strong>Base de données :</strong> Supabase Inc. (AWS Frankfurt, Allemagne)</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Propriété intellectuelle */}
        <Card className="border-none shadow-sm bg-zinc-50 dark:bg-zinc-900">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <Scale className="h-6 w-6" />
              <h2 className="text-xl font-bold">3. Propriété intellectuelle et contrefaçons</h2>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              L&apos;Association Les Dimanches Mulhousiens est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site internet, notamment les textes, images, graphismes, logos, vidéos, icônes et sons. Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable.
            </p>
          </CardContent>
        </Card>

        {/* RGPD */}
        <Card className="border-none shadow-sm border-l-4 border-l-primary bg-zinc-50 dark:bg-zinc-900">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3 mb-4 text-primary">
              <Lock className="h-6 w-6" />
              <h2 className="text-xl font-bold">4. Gestion des données personnelles (RGPD)</h2>
            </div>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
              <p>
                Le client est informé des réglementations concernant la communication marketing, la loi du 21 Juin 2014 pour la confiance dans l’Économie Numérique, la Loi Informatique et Liberté du 06 Août 2004 ainsi que du Règlement Général sur la Protection des Données (RGPD : n° 2016-679).
              </p>
              <div>
                <h3 className="font-bold text-zinc-900 dark:text-zinc-100 mb-1">Finalité des données collectées :</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Traiter les candidatures des exposants (nom, email, activité, téléphone).</li>
                  <li>Répondre aux demandes de contact (nom, email, sujet, message).</li>
                  <li>Envoyer la newsletter (uniquement si l&apos;utilisateur s&apos;y est inscrit).</li>
                </ul>
              </div>
              <p>
                Vos données ne sont jamais vendues ou cédées à des tiers. Elles sont conservées pour une durée maximale de 3 ans après le dernier contact.
              </p>
              <p>
                Conformément à la réglementation européenne en vigueur, vous disposez d’un droit d’accès, de rectification et de suppression des données vous concernant en nous contactant via le formulaire de contact du site.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-xs text-zinc-400 italic">
        Dernière mise à jour : 23 janvier 2026
      </div>
    </div>
  );
}