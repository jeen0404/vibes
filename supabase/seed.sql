-- SEED DATA FOR VIBE APP

-- 1. Create Users (We leverage Supabase Auth by inserting into auth.users if possible, but usually we just insert into profiles for testing if RLS allows, or we just mock profiles)
-- NOTE: In a real Supabase local dev, you'd use `supabase db reset` which runs seed.sql. 
-- For this "Production" Supabase, we can't easily insert into auth.users via SQL Editor.
-- So we will insert into public.profiles directly assuming we can (or user will sign up manually).

-- HOWEVER, providing a script that the USER can run in SQL Editor is best.
-- We will create some "Shadow Profiles" that represent other users on the platform.
-- Since our code joins on public.profiles, we can just insert there.
-- The `id` usually links to auth.users, but for "fake" users we can generate random UUIDs.

INSERT INTO public.profiles (id, username, display_name, bio, avatar_url, frequency_score)
VALUES 
  (gen_random_uuid(), 'neon_shadow', 'Shadow Walker', 'Hunting frequencies in the noise. 🌊 | Visual Artist | Mumbai', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop', 940),
  (gen_random_uuid(), 'luna_moth', 'Luna', 'Chasing lights. ✨', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', 880),
  (gen_random_uuid(), 'cyber_monk', 'Zenith', 'Digital mindfulness.', 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop', 720),
  (gen_random_uuid(), 'velvet_noise', 'Velvet', 'Lo-fi beats and chill vibes.', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop', 650),
  (gen_random_uuid(), 'pulse_runner', 'Runner', 'Always moving.', 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop', 810),
  (gen_random_uuid(), 'echo_location', 'Echo', 'Hearing colors.', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop', 590);

-- 2. Create Waves (Posts) linked to these profiles
-- We need to fetch IDs, but for a raw script we can use CTE or just subqueries if we knew usernames
WITH users AS (SELECT id, username FROM public.profiles)
INSERT INTO public.waves (user_id, caption, media_url, media_type, vibe_rating, created_at)
SELECT 
  id, 
  CASE 
    WHEN username = 'neon_shadow' THEN 'Midnight frequencies in Tokyo. 🌃'
    WHEN username = 'luna_moth' THEN 'Morning flow. 🌿'
    WHEN username = 'cyber_monk' THEN 'System reboot.'
    WHEN username = 'velvet_noise' THEN 'Static in the air.'
    WHEN username = 'pulse_runner' THEN 'Can you feel it?'
    ELSE 'Just hanging out.' 
  END,
  CASE 
    WHEN username = 'neon_shadow' THEN 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80'
    WHEN username = 'luna_moth' THEN 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80'
    WHEN username = 'cyber_monk' THEN 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80'
    WHEN username = 'velvet_noise' THEN 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80'
    WHEN username = 'pulse_runner' THEN 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80'
    ELSE 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80'
  END,
  'image',
  floor(random() * 1000)::int,
  NOW() - (random() * interval '7 days')
FROM users;

-- 3. Create Echo Messages (Global Chat)
WITH users AS (SELECT id, username FROM public.profiles)
INSERT INTO public.echo_messages (sender_id, content, created_at)
SELECT id, 'Hello world! 🌍', NOW() - interval '1 hour' FROM users LIMIT 1;
-- Add more
INSERT INTO public.echo_messages (sender_id, content, created_at)
SELECT id, 'The vibe is high today.', NOW() - interval '30 minutes' FROM users WHERE username = 'neon_shadow';

-- 4. Create Notifications (Mock)
-- This requires a real recipient ID (the currently logged in user). 
-- Since we don't know the logged in user's ID in this script, we can skip or ask user to run a specific command.
-- Or we can just insert notifications between the fake users for realism if they view each other.
