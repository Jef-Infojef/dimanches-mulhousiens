-- Migration: Ajout de la table messages
CREATE TABLE IF NOT EXISTS public.messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'non_lu'
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Autoriser tout le monde à envoyer un message
DROP POLICY IF EXISTS "Public can insert messages" ON public.messages;
CREATE POLICY "Public can insert messages" ON public.messages FOR INSERT WITH CHECK (true);

-- Seuls les admins peuvent voir les messages
DROP POLICY IF EXISTS "Admins can view messages" ON public.messages;
CREATE POLICY "Admins can view messages" ON public.messages FOR SELECT USING (
  exists (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);
