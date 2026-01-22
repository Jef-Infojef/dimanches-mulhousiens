import { createBrowserClient } from '@supabase/ssr'
import { createClient } from '@supabase/supabase-js'

/*
  SQL pour la gestion des profils et rôles :

  -- Table des profils
  create table profiles (
    id uuid references auth.users on delete cascade primary key,
    email text,
    full_name text,
    role text default 'exposant' check (role in ('admin', 'exposant')),
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
  );

  -- Trigger pour créer un profil à l'inscription
  create function public.handle_new_user()
  returns trigger as $$
  begin
    insert into public.profiles (id, email, role)
    values (new.id, new.email, 'exposant');
    return new;
  end;
  $$ language plpgsql security definer;

  create trigger on_auth_user_created
    after insert on auth.users
    for each row execute procedure public.handle_new_user();
*/

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder'

// Client pour les composants Client
export const createBrowserSupabaseClient = () => 
  createBrowserClient(supabaseUrl, supabaseAnonKey)

// Client standard (legacy support)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)
