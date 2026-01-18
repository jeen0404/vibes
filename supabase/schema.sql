-- PROFILES
create table public.profiles (
  id uuid references auth.users not null primary key,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  frequency_score int default 500,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Profiles
alter table public.profiles enable row level security;
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- TRIGGER for new user creation
-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name)
  values (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

-- Trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- WAVES (Posts)
create table public.waves (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) not null,
  caption text,
  media_url text not null, -- Image or Video URL
  media_type text default 'image', -- 'image' or 'video'
  vibe_rating float default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Waves
alter table public.waves enable row level security;
create policy "Waves are viewable by everyone." on public.waves for select using (true);
create policy "Users can create waves." on public.waves for insert with check (auth.uid() = user_id);


-- ECHO (Messages)
create table public.echo_messages (
  id uuid default gen_random_uuid() primary key,
  sender_id uuid references public.profiles(id) not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Echo (Simplified: Everyone can read everything in global chat)
alter table public.echo_messages enable row level security;
create policy "Messages are viewable by everyone." on public.echo_messages for select using (true);
create policy "Users can send messages." on public.echo_messages for insert with check (auth.uid() = sender_id);


-- NOTIFICATIONS
create table public.notifications (
  id uuid default gen_random_uuid() primary key,
  recipient_id uuid references public.profiles(id) not null,
  sender_id uuid references public.profiles(id) not null,
  type text not null, -- 'like', 'follow', 'reply'
  message text,
  is_read boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- RLS for Notifications
alter table public.notifications enable row level security;
create policy "Users can view their own notifications." on public.notifications for select using (auth.uid() = recipient_id);
create policy "System/Users can create notifications." on public.notifications for insert with check (auth.uid() = sender_id);
