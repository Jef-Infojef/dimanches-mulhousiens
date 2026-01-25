-- Migration: Ajout de la table subscriptions (Newsletter)
CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  email text NOT NULL UNIQUE,
  status text DEFAULT 'actif'
);

ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Autoriser tout le monde à s'inscrire
DROP POLICY IF EXISTS "Public can subscribe" ON public.subscriptions;
CREATE POLICY "Public can subscribe" ON public.subscriptions FOR INSERT WITH CHECK (true);

-- Seuls les admins peuvent voir les abonnés
DROP POLICY IF EXISTS "Admins can view subscriptions" ON public.subscriptions;
CREATE POLICY "Admins can view subscriptions" ON public.subscriptions FOR SELECT USING (
  exists (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
