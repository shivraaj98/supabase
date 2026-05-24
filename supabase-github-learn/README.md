# Supabase + GitHub Learning Project

This project helps you learn:
- Supabase client setup and database connection
- GitHub OAuth sign-in with Supabase
- Using VS Code for development and Git workflows

## What is included
- `package.json` and Vite setup
- Simple frontend app in `src/`
- Supabase connection example
- GitHub login button via Supabase Auth
- VS Code tasks in `.vscode/tasks.json`

## Setup
1. Open this folder in VS Code.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a Supabase project at https://app.supabase.com.
4. Create a table called `profiles` with these columns:
   - `id` (uuid, primary key, default `uuid_generate_v4()`)
   - `email` (text)
   - `username` (text)
   - `created_at` (timestamp with time zone, default `now()`)

## Learn Supabase connection
This app shows:
- how to initialize `@supabase/supabase-js`
- how to read environment variables from `.env`
- how to use Supabase Auth with GitHub
- how to query the `profiles` table and show sample rows

If you want to test the database connection manually, insert a row into `profiles` from the Supabase SQL editor:
```sql
insert into profiles (email, username)
values ('student@example.com', 'student1');
```

## Supabase environment
Create a `.env` file in the project root with:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

## GitHub provider setup
1. In Supabase dashboard, open `Authentication > Settings > External OAuth Providers`.
2. Enable `GitHub` and enter your GitHub App credentials.
3. Add `http://localhost:5173` as an allowed redirect URL.

## Run the app
```bash
npm run dev
```

Then open the local URL from the terminal.

## Git / GitHub learning
- Initialize git: `git init`
- Add files: `git add .`
- Commit: `git commit -m "Initial Supabase + GitHub learning project"`
- Create a GitHub repo and push your branch.

## VS Code support
- Use the `Run Task...` menu to run `npm install` or `npm run dev`.
- Open `.vscode/tasks.json` for task examples.
- Use the Source Control view to track Git changes.
