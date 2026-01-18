import PulseFeed from "@/components/waves/PulseFeed";
import SparksBar from "@/components/waves/SparksBar";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Post, User } from "@/lib/types";

// Mock Data for Sparks (until we have real data)
const MOCK_SPARK_USERS: User[] = [
    {
        id: "1", username: "neon_shadow", displayName: "Shadow", bio: "Hacker", frequencyScore: 900, followersCount: 100, followingCount: 50, avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop", hasActiveSpark: true,
        sparks: [{ id: "s1", userId: "1", type: "image", mediaUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=80", createdAt: new Date(), expiresAt: new Date(Date.now() + 86400000), isSeen: false }]
    },
    {
        id: "2", username: "luna_moth", displayName: "Luna", bio: "Artist", frequencyScore: 800, followersCount: 200, followingCount: 80, avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop", hasActiveSpark: true,
        sparks: [{ id: "s2", userId: "2", type: "image", mediaUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80", createdAt: new Date(), expiresAt: new Date(Date.now() + 86400000), isSeen: false }]
    },
    {
        id: "3", username: "cyber_monk", displayName: "Zenith", bio: "Coder", frequencyScore: 700, followersCount: 300, followingCount: 30, avatarUrl: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=200&h=200&fit=crop", hasActiveSpark: true,
        sparks: [{ id: "s3", userId: "3", type: "image", mediaUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80", createdAt: new Date(), expiresAt: new Date(Date.now() + 86400000), isSeen: false }]
    },
];

export default async function PulseFeedPage() {
    const supabase = await createClient();

    const { data: waves } = await supabase
        .from("waves")
        .select("*")
        .order("created_at", { ascending: false });

    const posts: Post[] = (waves || []).map((wave) => ({
        id: wave.id,
        type: wave.media_type === 'video' ? 'static' : 'static',
        mediaUrls: [wave.media_url],
        caption: wave.caption || "",
        avgVibeRating: wave.vibe_rating || 0,
        totalVibeCount: 0,
        commentCount: 0,
        createdAt: wave.created_at,
    }));

    return (
        <div className="bg-black min-h-screen pb-20">
            {/* Top Bar */}
            <div className="sticky top-0 z-40 bg-black/80 backdrop-blur-md border-b border-white/10 px-4 py-3 flex items-center justify-between">
                <h1 className="text-4xl tracking-normal bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple cursor-pointer font-display drop-shadow-[0_0_5px_rgba(0,243,255,0.5)]">
                    Vibes
                </h1>

                <div className="flex items-center gap-4">
                    <Link href="/notifications">
                        <Heart className="w-6 h-6 text-white hover:text-neon-pink transition-colors" />
                    </Link>
                    <Link href="/echo">
                        <MessageCircle className="w-6 h-6 text-white hover:text-neon-blue transition-colors" />
                    </Link>
                </div>
            </div>

            {/* Sparks Bar */}
            <SparksBar users={MOCK_SPARK_USERS} />

            <div className="pt-2">
                <PulseFeed initialPosts={posts} />
            </div>
        </div>
    );
}
