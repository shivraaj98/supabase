import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables in .env');
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const userInfo = document.getElementById('user-info') as HTMLElement;
const profileList = document.getElementById('profile-list') as HTMLElement;
const loginBtn = document.getElementById('login-btn') as HTMLButtonElement;
const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;

async function loadProfiles() {
  const { data, error } = await supabase
    .from('profiles')
    .select('id, email, username')
    .limit(5);

  if (error) {
    profileList.innerHTML = `<p class="error">DB error: ${error.message}</p>`;
    return;
  }

  if (!data?.length) {
    profileList.innerHTML = '<p>No profiles found yet. Add a row to the `profiles` table in Supabase.</p>';
    return;
  }

  profileList.innerHTML = `
    <h2>Sample profiles</h2>
    <ul>${data
      .map((profile) => `<li>${profile.username || profile.email} (${profile.id})</li>`)
      .join('')}</ul>
  `;
}

async function updateUserState() {
  const { data } = await supabase.auth.getSession();
  const session = data.session;

  if (session?.user) {
    userInfo.innerHTML = `
      <p><strong>Signed in as:</strong> ${session.user.email || 'unknown'}</p>
      <p><strong>User ID:</strong> ${session.user.id}</p>
    `;
    loginBtn.classList.add('hidden');
    logoutBtn.classList.remove('hidden');
  } else {
    userInfo.innerHTML = '<p>You are not signed in yet.</p>';
    loginBtn.classList.remove('hidden');
    logoutBtn.classList.add('hidden');
  }

  await loadProfiles();
}

loginBtn.addEventListener('click', async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
    options: {
      redirectTo: window.location.origin,
    },
  });

  if (error) {
    userInfo.innerHTML = `<p class="error">Login error: ${error.message}</p>`;
  }
});

logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut();
  await updateUserState();
});

window.addEventListener('DOMContentLoaded', async () => {
  await updateUserState();
});
