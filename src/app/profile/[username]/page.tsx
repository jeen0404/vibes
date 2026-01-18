import { User, Post } from "@/lib/types";
import ProfileHeader from "@/components/waves/ProfileHeader";
import PulseGrid from "@/components/waves/PulseGrid";
import Link from "next/link";
import { Settings, ChevronLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;
    const supabase = await createClient();

    // 1. Fetch User Profile
    const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("username", username)
        .single();

    if (profileError || !profile) {
        console.error("Profile not found:", profileError);
        return notFound();
    }

    // 2. Fetch User's Waves (Posts)
    const { data: waves, error: wavesError } = await supabase
        .from("waves")
        .select("*")
        .eq("user_id", profile.id)
        .order("created_at", { ascending: false });

    // 3. Map to UI Types
    const user: User = {
        id: profile.id,
        username: profile.username,
        displayName: profile.display_name || profile.username,
        bio: profile.bio || "Just vibes.",
        avatarUrl: profile.avatar_url || "",
        frequencyScore: profile.frequency_score || 500,
        followersCount: 0, // Mock for now
        followingCount: 0, // Mock for now
        hasActiveSpark: false, // Mock for now
        sparks: [], // Mock for now
    };

    const posts: Post[] = (waves || []).map((wave) => ({
        id: wave.id,
        type: wave.media_type === 'video' ? 'static' : 'static', // Simplify for now
        mediaUrls: [wave.media_url],
        caption: wave.caption || "",
        avgVibeRating: wave.vibe_rating || 0,
        totalVibeCount: 0,
        commentCount: 0,
        createdAt: wave.created_at,
    }));

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">

            {/* Top Nav */}
            <nav className="fixed top-0 w-full h-16 glass z-50 flex items-center justify-between px-6 border-b border-white/5">
                <Link href="/waves" className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors">
                    <ChevronLeft className="w-6 h-6" />
                </Link>

                <span className="text-white font-bold tracking-tight text-lg">@{user.username}</span>

                <Link href="/settings" className="p-2 -mr-2 text-gray-400 hover:text-white transition-colors">
                    <Settings className="w-6 h-6" />
                </Link>
            </nav>

            <div className="max-w-4xl mx-auto pt-28 px-4">
                <ProfileHeader user={user} />

                <div className="w-full h-px bg-white/10 my-8" />

                <PulseGrid posts={posts} />

                {posts.length === 0 && (
                    <div className="text-center py-12 text-gray-500">
                        <p>No waves transmitted yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
