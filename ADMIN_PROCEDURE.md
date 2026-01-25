# Procédure de Gestion des Administrateurs

Ce document explique comment créer ou promouvoir un compte administrateur.

## 1. Script de ligne de commande (Plus rapide)
Ouvrez un terminal dans le dossier du projet et lancez :
```bash
node scripts/add-admin.js <email> <mot_de_passe>
```

## 2. SQL (Via Supabase Dashboard)
Si le script ne peut pas être utilisé, exécutez ce SQL dans l'éditeur Supabase :

```sql
-- Remplacez 'email@exemple.com' par l'adresse souhaitée
UPDATE auth.users SET email_confirmed_at = now() WHERE email = 'email@exemple.com';
INSERT INTO public.profiles (id, email, role)
SELECT id, email, 'admin' FROM auth.users WHERE email = 'email@exemple.com'
ON CONFLICT (id) DO UPDATE SET role = 'admin';
```

## Identifiants actuels
- **Serveur** : http://localhost:3002
- **Admin** : http://localhost:3002/admin
