-- 1. Table des candidatures
CREATE TABLE IF NOT EXISTS candidatures (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  name text NOT NULL,
  email text NOT NULL,
  activity text NOT NULL,
  description text NOT NULL,
  phone text,
  website text,
  status text DEFAULT 'en_attente'
);

-- 2. Table des profils
CREATE TABLE IF NOT EXISTS profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email text,
  full_name text,
  role text DEFAULT 'exposant' CHECK (role IN ('admin', 'exposant')),
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- 3. Trigger automatique à l'inscription
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, email, role)
  VALUES (new.id, new.email, 'exposant');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- 4. Sécurité RLS
ALTER TABLE candidatures ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can insert candidatures" ON candidatures;
CREATE POLICY "Public can insert candidatures" ON candidatures FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "Admins can view all candidatures" ON candidatures;
CREATE POLICY "Admins can view all candidatures" ON candidatures FOR SELECT USING (
  exists (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
