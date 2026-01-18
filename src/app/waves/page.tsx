import PulseFeed from "@/components/waves/PulseFeed";
import Link from "next/link";
import { Heart, MessageCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Post } from "@/lib/types";

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

            <div className="pt-2">
                <PulseFeed initialPosts={posts} />
            </div>
        </div>
    );
}
