import { createClient } from '@supabase/supabase-js';

/*
  SQL pour créer la table des candidatures dans Supabase :

  create table candidatures (
    id uuid default uuid_generate_v4() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    email text not null,
    activity text not null,
    description text not null,
    phone text,
    website text,
    status text default 'en_attente'
  );
*/

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);