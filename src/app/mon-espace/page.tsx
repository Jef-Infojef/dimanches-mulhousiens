"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Info, MapPin, Hammer, CheckCircle2, Clock, Globe, Instagram, Facebook, Save, Edit2 } from "lucide-react";
import Link from "next/link";
import { User } from "@supabase/supabase-js";

interface Profile {
  full_name: string | null;
  role: string;
  bio?: string;
  website?: string;
  instagram?: string;
  facebook?: string;
}

interface Candidature {
  status: string;
  activity: string;
}

export default function MonEspacePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [candidature, setCandidature] = useState<Candidature | null>(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // État du formulaire
  const [formData, setFormData] = useState({
    full_name: "",
    bio: "",
    website: "",
    instagram: "",
    facebook: ""
  });

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
        
        if (profile) {
          setProfile(profile);
          setFormData({
            full_name: profile.full_name || "",
            bio: profile.bio || "",
            website: profile.website || "",
            instagram: profile.instagram || "",
            facebook: profile.facebook || ""
          });
        }

        const { data: candidatures } = await supabase
          .from('candidatures')
          .select('*')
          .eq('email', user.email)
          .order('created_at', { ascending: false })
          .limit(1);
        
        if (candidatures && candidatures.length > 0) {
          setCandidature(candidatures[0]);
        }
      }
      setLoading(false);
    }
    loadData();
  }, [supabase]);

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: formData.full_name,
          bio: formData.bio,
          website: formData.website,
          instagram: formData.instagram,
          facebook: formData.facebook
        })
        .eq('id', user.id);

      if (error) throw error;
      setProfile({ ...profile!, ...formData });
      setIsEditing(false);
    } catch (err: any) {
      alert("Erreur lors de la sauvegarde : " + err.message);
    } finally {
      setSaving(false);
    }
  };

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
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">Bienvenue, {profile?.full_name || user?.email}</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Espace dédié aux exposants des Dimanches Mulhousiens.</p>
        </div>
        {candidature?.status === 'accepte' && !isEditing && (
          <Button onClick={() => setIsEditing(true)} variant="outline" className="rounded-full gap-2">
            <Edit2 className="h-4 w-4" /> Modifier mon profil public
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Formulaire d'édition (si activé) */}
          {isEditing ? (
            <Card className="border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle>Modifier votre profil public</CardTitle>
                <CardDescription>Ces informations seront visibles par les visiteurs du catalogue.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom complet / Enseigne</label>
                    <Input 
                      value={formData.full_name} 
                      onChange={(e) => setFormData({...formData, full_name: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Site Web</label>
                    <Input 
                      placeholder="https://..."
                      value={formData.website} 
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Biographie / Présentation</label>
                  <Textarea 
                    rows={4}
                    placeholder="Décrivez votre univers artistique..."
                    value={formData.bio} 
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Lien Instagram</label>
                    <Input 
                      placeholder="https://instagram.com/..."
                      value={formData.instagram} 
                      onChange={(e) => setFormData({...formData, instagram: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Lien Facebook</label>
                    <Input 
                      placeholder="https://facebook.com/..."
                      value={formData.facebook} 
                      onChange={(e) => setFormData({...formData, facebook: e.target.value})}
                    />
                  </div>
                </div>
                <div className="flex gap-3 pt-4">
                  <Button onClick={handleSave} disabled={saving} className="rounded-full gap-2">
                    {saving ? <Clock className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                    Enregistrer les modifications
                  </Button>
                  <Button onClick={() => setIsEditing(false)} variant="ghost" className="rounded-full">
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Votre Dossier</CardTitle>
                <CardDescription>Suivi de votre participation pour l&apos;édition 2026.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className={`flex items-center justify-between p-4 rounded-xl ${candidature?.status === 'accepte' ? 'bg-green-50 dark:bg-green-900/20' : candidature?.status === 'refuse' ? 'bg-red-50 dark:bg-red-900/20' : 'bg-zinc-50 dark:bg-zinc-900'}`}>
                  <div className="flex items-center gap-3">
                    {candidature?.status === 'accepte' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : candidature?.status === 'refuse' ? (
                      <Info className="h-5 w-5 text-red-500" />
                    ) : (
                      <Clock className="h-5 w-5 text-blue-500" />
                    )}
                    <div>
                      <p className="font-semibold text-sm">
                        {candidature?.status === 'accepte' ? 'Candidature Acceptée' : 
                         candidature?.status === 'refuse' ? 'Dossier Refusé' : 
                         candidature ? 'Dossier en cours d\'examen' : 'Aucun dossier trouvé'}
                      </p>
                      <p className="text-xs text-zinc-500">
                        {candidature?.status === 'accepte' ? 'Bienvenue parmi nous ! Préparez votre stand.' : 
                         candidature?.status === 'refuse' ? 'Votre dossier n\'a pas été retenu pour cette édition.' : 
                         candidature ? 'Nous étudions votre profil avec attention.' : 'Vous n\'avez pas encore déposé de dossier.'}
                      </p>
                    </div>
                  </div>
                  <Badge className={candidature?.status === 'accepte' ? 'bg-green-500' : candidature?.status === 'refuse' ? 'bg-red-500' : 'bg-blue-500'}>
                    {candidature?.status === 'accepte' ? 'Validé' : 
                     candidature?.status === 'refuse' ? 'Refusé' : 
                     candidature ? 'En attente' : 'Inexistant'}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-xl flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-bold text-sm">Dates Validées</p>
                      <p className="text-xs text-zinc-500">Sera défini prochainement.</p>
                    </div>
                  </div>
                  <div className="p-4 border rounded-xl flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-bold text-sm">Emplacement</p>
                      <p className="text-xs text-zinc-500">Sera attribué 15 jours avant.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Profil Public Preview */}
          {!isEditing && candidature?.status === 'accepte' && (
            <Card className="bg-zinc-50 dark:bg-zinc-900 border-none">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" /> Aperçu de votre fiche publique
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="h-24 w-24 rounded-2xl bg-primary/10 flex items-center justify-center text-primary text-3xl font-black">
                    {profile?.full_name?.[0] || "?"}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{profile?.full_name || "Nom non renseigné"}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4">
                      {profile?.bio || "Aucune description renseignée pour le catalogue."}
                    </p>
                    <div className="flex gap-4">
                      {profile?.website && <a href={profile.website} target="_blank" rel="noreferrer"><Globe className="h-5 w-5 text-zinc-400 hover:text-primary transition-colors" /></a>}
                      {profile?.instagram && <a href={profile.instagram} target="_blank" rel="noreferrer"><Instagram className="h-5 w-5 text-zinc-400 hover:text-primary transition-colors" /></a>}
                      {profile?.facebook && <a href={profile.facebook} target="_blank" rel="noreferrer"><Facebook className="h-5 w-5 text-zinc-400 hover:text-primary transition-colors" /></a>}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

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
                <span>Lieu : Place de la Réunion, Mulhouse</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
