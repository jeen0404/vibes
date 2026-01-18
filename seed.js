require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing Supabase credentials in .env.local");
    process.exit(1);
}

// Global client for auth ops
const supabase = createClient(supabaseUrl, supabaseKey);

const USERS = [
    { email: "neon@vibe.com", password: "password123", username: "neon_shadow", displayName: "Shadow", bio: "Hunting frequencies.", avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400" },
    { email: "luna@vibe.com", password: "password123", username: "luna_moth", displayName: "Luna", bio: "Chasing lights.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
    { email: "cyber@vibe.com", password: "password123", username: "cyber_monk", displayName: "Zenith", bio: "Digital mindfulness.", avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=400" },
];

const WAVES = [
    "Midnight frequencies in Tokyo. 🌃",
    "Morning flow. 🌿",
    "System reboot. ⚡",
    "Static in the air. 📺",
    "Can you feel it? 📡",
    "Lost in the echo. 🗣️",
    "Neon dreams. 🟣",
    "Analog soul. 📼"
];

const IMAGES = [
    "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80",
    "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80"
];

async function seed() {
    console.log("🌱 Seeding Vibe...");

    for (const u of USERS) {
        console.log(`Processing user: ${u.username}...`);

        let session = null;
        let userId = null;

        // 1. Sign Up
        const { data: authData, error: authError } = await supabase.auth.signUp({
            email: u.email,
            password: u.password,
            options: {
                data: {
                    username: u.username,
                    full_name: u.displayName,
                    avatar_url: u.avatar
                }
            }
        });

        if (authError) {
            // If user exists, sign in
            const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
                email: u.email,
                password: u.password
            });

            if (signInData.session) {
                session = signInData.session;
                userId = signInData.user.id;
                console.log(`   Logged in existing user: ${userId}`);
            } else {
                console.error(`   Failed to login: ${signInError?.message}`);
            }
        } else if (authData.session) {
            session = authData.session;
            userId = authData.user.id;
            console.log(`   Created new user: ${userId}`);
        } else {
            console.log("   User created but no session (confirm email?).");
        }

        // 2. Insert Content if we have a session
        if (session && userId) {
            // Create an authenticated client for this user
            const userClient = createClient(supabaseUrl, supabaseKey, {
                global: { headers: { Authorization: `Bearer ${session.access_token}` } }
            });

            // Update profile (in case it existed but details changed)
            await userClient.from('profiles').upsert({
                id: userId,
                username: u.username,
                display_name: u.displayName,
                bio: u.bio,
                avatar_url: u.avatar
            });

            await createContent(userClient, userId);
        }
    }

    console.log("✅ Seeding complete.");
}

async function createContent(userClient, userId) {
    // Create defined number of waves per user
    const count = 3;

    for (let i = 0; i < count; i++) {
        const caption = WAVES[Math.floor(Math.random() * WAVES.length)];
        const image = IMAGES[Math.floor(Math.random() * IMAGES.length)];

        const { error: waveError } = await userClient.from('waves').insert({
            user_id: userId,
            caption: caption,
            media_url: image,
            media_type: 'image',
            vibe_rating: Math.floor(Math.random() * 500)
        });

        if (waveError) console.error("   Wave Error:", waveError.message);
    }
    console.log(`   Created ${count} waves.`);
}

seed();
