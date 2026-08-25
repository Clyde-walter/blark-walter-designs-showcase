#!/usr/bin/env node
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.argv[2];

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
  process.exit(1);
}
if (!email) {
  console.error('Usage: node scripts/grant-admin.mjs you@example.com');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

console.log(`Looking up user for email: ${email}`);
try {
  const list = await supabase.auth.admin.listUsers({ query: email });
  const users = list.data?.users ?? [];
  const user = users.find((u) => u.email === email);
  if (!user) {
    console.error('User not found. Ensure the user exists in Supabase auth.users.');
    process.exit(2);
  }
  console.log(`Found user id=${user.id}. Granting admin role...`);
  const { error } = await supabase.from('user_roles').insert({ user_id: user.id, role: 'admin' });
  if (error) {
    if ((error as any).code === '23505') {
      console.log('User already has that role.');
      process.exit(0);
    }
    console.error('Failed to insert role:', error.message ?? error);
    process.exit(3);
  }
  console.log('Success: role granted.');
  process.exit(0);
} catch (e) {
  console.error('Unexpected error:', e);
  process.exit(4);
}
