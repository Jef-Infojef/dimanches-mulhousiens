"use client";

import { useCallback, useEffect, useState } from "react";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Mail, Phone, Globe, ExternalLink, RefreshCw, MessageSquare, Users, CheckCircle2, Info, Clock } from "lucide-react";

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

interface Message {
  id: string;
  created_at: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'candidatures' | 'messages'>('candidatures');
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createBrowserSupabaseClient();

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      if (activeTab === 'candidatures') {
        const { data, error: err } = await supabase
          .from('candidatures')
          .select('*')
          .order('created_at', { ascending: false });
        if (err) throw err;
        setCandidatures(data || []);
      } else {
        const { data, error: err } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false });
        if (err) throw err;
        setMessages(data || []);
      }
    } catch (err: any) {
      console.error("Erreur:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [activeTab, supabase]);

  const updateCandidatureStatus = async (id: string, newStatus: string) => {
    try {
      const { error: err } = await supabase
        .from('candidatures')
        .update({ status: newStatus })
        .eq('id', id);
      if (err) throw err;
      setCandidatures(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    } catch (err: any) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black tracking-tight">Administration</h1>
          <p className="text-muted-foreground">Gestion de l&apos;événement Dimanches Mulhousiens</p>
        </div>
        
        <div className="flex bg-zinc-100 dark:bg-zinc-900 p-1 rounded-xl w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('candidatures')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'candidatures' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <Users className="h-4 w-4" /> Candidatures
          </button>
          <button 
            onClick={() => setActiveTab('messages')}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'messages' ? 'bg-white dark:bg-zinc-800 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
            }`}
          >
            <MessageSquare className="h-4 w-4" /> Messages
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl mb-8 flex items-center gap-3">
          <Info className="h-5 w-5" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-32">
          <Loader2 className="h-10 w-10 animate-spin text-primary opacity-20" />
        </div>
      ) : activeTab === 'candidatures' ? (
        <div className="grid gap-6">
          {candidatures.map((c) => (
            <Card key={c.id} className={`overflow-hidden border-none shadow-sm transition-all hover:shadow-md ${
              c.status === 'accepte' ? 'bg-green-50/30' : 
              c.status === 'refuse' ? 'bg-red-50/30' : 'bg-white dark:bg-zinc-900'
            }`}>
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center flex-wrap gap-3 mb-4">
                      <h3 className="text-2xl font-bold">{c.name}</h3>
                      <Badge variant="outline" className="rounded-full">{c.activity}</Badge>
                      <Badge className={`rounded-full ${
                        c.status === 'accepte' ? 'bg-green-500' : 
                        c.status === 'refuse' ? 'bg-red-500' : 'bg-blue-500'
                      }`}>
                        {c.status === 'accepte' ? 'Accepté' : c.status === 'refuse' ? 'Refusé' : 'En attente'}
                      </Badge>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 text-lg leading-relaxed mb-6">
                      {c.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => updateCandidatureStatus(c.id, 'accepte')} className="text-xs px-4 py-2 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors font-bold">ACCEPTER</button>
                      <button onClick={() => updateCandidatureStatus(c.id, 'refuse')} className="text-xs px-4 py-2 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors font-bold">REFUSER</button>
                      <button onClick={() => updateCandidatureStatus(c.id, 'en_attente')} className="text-xs px-4 py-2 rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200 transition-colors font-bold">ATTENTE</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 min-w-[280px] p-6 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm"><Mail className="h-4 w-4 text-primary" /></div>
                      <a href={`mailto:${c.email}`} className="hover:underline font-bold">{c.email}</a>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm"><Phone className="h-4 w-4 text-primary" /></div>
                      <span className="font-bold">{c.phone}</span>
                    </div>
                    {c.website && (
                      <div className="flex items-center gap-3 text-sm">
                        <div className="p-2 bg-white dark:bg-zinc-800 rounded-lg shadow-sm"><Globe className="h-4 w-4 text-primary" /></div>
                        <a href={c.website} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1 font-bold">
                          Site web <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {candidatures.length === 0 && <div className="text-center py-20 opacity-30">Aucune candidature.</div>}
        </div>
      ) : (
        <div className="grid gap-6">
          {messages.map((m) => (
            <Card key={m.id} className="border-none shadow-sm bg-white dark:bg-zinc-900">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row justify-between gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 bg-primary/10 rounded-lg"><MessageSquare className="h-5 w-5 text-primary" /></div>
                      <h3 className="text-xl font-bold">{m.subject}</h3>
                    </div>
                    <p className="text-zinc-700 dark:text-zinc-300 mb-6 leading-relaxed">
                      {m.message}
                    </p>
                    <p className="text-xs text-zinc-400">
                      Envoyé par <span className="font-bold text-zinc-600 dark:text-zinc-200">{m.name}</span> le {new Date(m.created_at).toLocaleString('fr-FR')}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4 min-w-[280px]">
                    <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl">
                      <p className="text-xs text-zinc-500 mb-1">Email de contact</p>
                      <a href={`mailto:${m.email}`} className="font-bold text-primary hover:underline">{m.email}</a>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {messages.length === 0 && <div className="text-center py-20 opacity-30">Aucun message.</div>}
        </div>
      )}
    </div>
  );
}