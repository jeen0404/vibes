-- Enable Storage Extension (if not enabled)
-- create extension if not exists "storage";

-- Create specific bucket for Waves
insert into storage.buckets (id, name, public)
values ('waves', 'waves', true);

-- Policy: Public access to view files
create policy "Public Access"
  on storage.objects for select
  using ( bucket_id = 'waves' );

-- Policy: Authenticated users can upload files
create policy "Authenticated users can upload"
  on storage.objects for insert
  with check (
    bucket_id = 'waves' 
    and auth.role() = 'authenticated'
  );
