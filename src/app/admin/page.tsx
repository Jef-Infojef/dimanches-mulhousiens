"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Phone, Globe, ExternalLink } from "lucide-react";

export const dynamic = "force-dynamic";

interface Candidature {
  id: string;
  created_at: string;
  name: string;
  email: string;
  activity: string;
  description: string;
  phone: string;
  website: string;
  status: string;
}

export default function AdminPage() {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const fetchCandidatures = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('candidatures')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Erreur lors de la récupération:", error);
    } else {
      setCandidatures(data || []);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let isMounted = true;
    if (authenticated) {
      const load = async () => {
        if (isMounted) await fetchCandidatures();
      };
      load();
    }
    return () => { isMounted = false; };
  }, [authenticated, fetchCandidatures]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Système de protection ultra-basique pour l'exemple
    // À remplacer par une vraie auth Supabase plus tard
    if (password === "Mulhouse2026") {
      setAuthenticated(true);
    } else {
      alert("Mot de passe incorrect");
    }
  };

  if (!authenticated) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Accès Administration</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                className="w-full p-2 border rounded"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="w-full bg-primary text-white p-2 rounded hover:opacity-90 transition-opacity">
                Se connecter
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Candidatures Exposants</h1>
        <Badge variant="outline" className="text-lg px-4 py-1">
          {candidatures.length} dossier(s)
        </Badge>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid gap-6">
          {candidatures.map((c) => (
            <Card key={c.id} className="overflow-hidden border-l-4 border-l-primary">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold">{c.name}</h3>
                      <Badge>{c.activity}</Badge>
                    </div>
                    <p className="text-zinc-600 dark:text-zinc-400 mb-4 italic text-sm">
                      Reçu le {new Date(c.created_at).toLocaleDateString('fr-FR')}
                    </p>
                    <p className="text-zinc-800 dark:text-zinc-200 line-clamp-3">
                      {c.description}
                    </p>
                  </div>
                  <div className="flex flex-col gap-3 min-w-[240px]">
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="h-4 w-4 text-primary" />
                      <a href={`mailto:${c.email}`} className="hover:underline">{c.email}</a>
                    </div>
                    {c.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-primary" />
                        <span>{c.phone}</span>
                      </div>
                    )}
                    {c.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-primary" />
                        <a href={c.website} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                          Voir le site <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {candidatures.length === 0 && (
            <div className="text-center py-20 text-zinc-500">
              Aucune candidature reçue pour le moment.
            </div>
          )}
        </div>
      )}
    </div>
  );
}