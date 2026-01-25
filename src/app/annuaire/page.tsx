"use client";

import { useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Globe, Instagram, Facebook, ExternalLink, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Exposant {
  id: string;
  full_name: string;
  bio: string;
  website: string;
  instagram: string;
  facebook: string;
  role: string;
}

export default function AnnuairePage() {
  const [exposants, setExposants] = useState<Exposant[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const supabase = createBrowserSupabaseClient();

  useEffect(() => {
    async function fetchExposants() {
      // On récupère les profils qui ont le rôle 'exposant' et qui ont rempli leur nom
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'exposant')
        .not('full_name', 'is', null);

      if (!error && data) {
        setExposants(data);
      }
      setLoading(false);
    }
    fetchExposants();
  }, [supabase]);

  const filteredExposants = exposants.filter(e => 
    e.full_name.toLowerCase().includes(search.toLowerCase()) ||
    (e.bio && e.bio.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-4xl mx-auto mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
          L&apos;Annuaire des <span className="text-primary italic">Créateurs</span>
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-lg mb-10">
          Découvrez les artisans et artistes qui feront battre le cœur de Mulhouse lors de l&apos;édition 2026.
        </p>

        <div className="relative max-w-xl mx-auto">
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-zinc-400" />
          <Input 
            placeholder="Rechercher un artisan, une matière, un style..." 
            className="pl-12 h-12 rounded-full border-zinc-200 dark:border-zinc-800 shadow-lg"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredExposants.map((exposant, i) => (
              <motion.div
                key={exposant.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full border-none shadow-sm hover:shadow-xl transition-all duration-300 group overflow-hidden bg-white dark:bg-zinc-900">
                  <div className="h-32 bg-primary/5 group-hover:bg-primary/10 transition-colors flex items-center justify-center relative">
                    <div className="h-20 w-20 rounded-2xl bg-white dark:bg-zinc-800 shadow-md flex items-center justify-center text-3xl font-black text-primary border-2 border-primary/10">
                      {exposant.full_name[0]}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-3">{exposant.full_name}</h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-sm line-clamp-3 mb-6 min-h-[60px]">
                      {exposant.bio || "Artisan passionné participant aux Dimanches Mulhousiens."}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      <div className="flex gap-3">
                        {exposant.instagram && (
                          <a href={exposant.instagram} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#E1306C] transition-colors">
                            <Instagram className="h-5 w-5" />
                          </a>
                        )}
                        {exposant.facebook && (
                          <a href={exposant.facebook} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-[#1877F2] transition-colors">
                            <Facebook className="h-5 w-5" />
                          </a>
                        )}
                        {exposant.website && (
                          <a href={exposant.website} target="_blank" rel="noreferrer" className="text-zinc-400 hover:text-primary transition-colors">
                            <Globe className="h-5 w-5" />
                          </a>
                        )}
                      </div>
                      <Badge variant="ghost" className="text-[10px] uppercase tracking-widest font-bold">
                        Édition 2026
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {!loading && filteredExposants.length === 0 && (
        <div className="text-center py-20 bg-zinc-50 dark:bg-zinc-900/50 rounded-3xl border-2 border-dashed">
          <p className="text-zinc-500">Aucun créateur ne correspond à votre recherche.</p>
        </div>
      )}
    </div>
  );
}
