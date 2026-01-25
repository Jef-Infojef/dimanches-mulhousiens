const { createClient } = require('@supabase/supabase-js');
// require('dotenv').config({ path: '.env.local' });

const supabaseUrl = 'https://xxoaitqwrjwmyulkndgi.supabase.co';
// Utilisation de la clé service_role pour bypasser les restrictions
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4b2FpdHF3cmp3bXl1bGtuZGdpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2OTExMDczNiwiZXhwIjoyMDg0Njg2NzM2fQ.pp700OuYztAAroFndbylm2NKM1ZWLVJ-qBj0YJrIx8c';

const email = process.argv[2];
const password = process.argv[3] || 'DefaultPassword123!';

if (!email) {
  console.log('Usage: node scripts/add-admin.js <email> <password>');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createAdmin() {
  console.log(`Création/Promotion de l'admin : ${email}...`);

  // 1. Création ou récupération de l'utilisateur Auth
  const { data: userData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true
  });

  let userId;
  if (authError) {
    if (authError.message.includes('already registered')) {
      console.log('L\'utilisateur existe déjà dans Auth, récupération de l\'ID...');
      const { data: users } = await supabase.auth.admin.listUsers();
      userId = users.users.find(u => u.email === email)?.id;
    } else {
      return console.error('Erreur Auth:', authError.message);
    }
  } else {
    userId = userData.user.id;
    console.log('Utilisateur créé avec succès.');
  }

  // 2. Promotion dans la table profiles
  const { error: profileError } = await supabase
    .from('profiles')
    .upsert({ id: userId, email, role: 'admin' });

  if (profileError) {
    console.error('Erreur Profil:', profileError.message);
  } else {
    console.log(`SUCCÈS : ${email} est maintenant ADMIN.`);
  }
}

createAdmin();
