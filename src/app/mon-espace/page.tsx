"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Info, MapPin, Hammer, CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

interface Profile {
  full_name: string | null;
  role: string;
}

export default function MonEspacePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    async function loadData() {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        setProfile(profile);
      }
      setLoading(false);
    }
    loadData();
  }, [supabase]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <Clock className="h-8 w-8 animate-spin mx-auto text-primary" />
        <p className="mt-4 text-zinc-500">Chargement de votre espace...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Bienvenue, {profile?.full_name ?? user?.email}</h1>
        <p className="text-zinc-600 dark:text-zinc-400">Espace dédié aux exposants des Dimanches Mulhousiens.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Statut Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Votre Dossier</CardTitle>
            <CardDescription>Suivi de votre participation pour l&apos;édition 2026.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <p className="font-semibold text-sm">Compte Exposant Actif</p>
                  <p className="text-xs text-zinc-500">Vous pouvez maintenant gérer vos informations.</p>
                </div>
              </div>
              <Badge variant="outline">Inscrit</Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 border rounded-xl flex items-start gap-3">
                <Calendar className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-bold text-sm">Dates Validées</p>
                  <p className="text-xs text-zinc-500">Aucune date sélectionnée pour le moment.</p>
                </div>
              </div>
              <div className="p-4 border rounded-xl flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <p className="font-bold text-sm">Emplacement</p>
                  <p className="text-xs text-zinc-500">Sera attribué 15 jours avant l&apos;événement.</p>
                </div>
              </div>
            </div>

            <div className="p-4 border border-primary/20 bg-primary/5 rounded-xl flex items-start gap-3">
              <Hammer className="h-5 w-5 text-primary mt-1" />
              <div>
                <p className="font-bold text-sm">Rappel Exposant</p>
                <p className="text-xs text-zinc-600 dark:text-zinc-400">
                  N&apos;oubliez pas de mettre à jour votre description pour le catalogue avant le 1er mai.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action / Info Sidebar */}
        <div className="space-y-6">
          <Card className="bg-primary text-white border-none shadow-xl">
            <CardHeader>
              <CardTitle className="text-lg">Informations Pratiques</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2 text-sm opacity-90">
                <Clock className="h-4 w-4 shrink-0" />
                <span>Installation : 08h00 - 09h30</span>
              </div>
              <div className="flex gap-2 text-sm opacity-90">
                <Info className="h-4 w-4 shrink-0" />
                <span>Déballage : Place de la Réunion</span>
              </div>
              <Button variant="secondary" className="w-full rounded-full text-xs font-bold" asChild>
                <Link href="/mon-espace/guide.pdf">Télécharger le guide (PDF)</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Besoin d&apos;aide ?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                Une question sur votre emplacement ou le règlement ?
              </p>
              <Button variant="outline" className="w-full rounded-full" asChild>
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}