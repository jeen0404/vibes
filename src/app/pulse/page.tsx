import PulseGrid from "@/components/waves/PulseGrid";
import { createClient } from "@/lib/supabase/server";
import { Post } from "@/lib/types";

// Standardize generic Pulse page as a Grid view of all content
export default async function PulsePage() {
    const supabase = await createClient();
    const { data: waves } = await supabase
        .from("waves")
        .select("*")
        .order("created_at", { ascending: false });

    // Map DB Waves to UI Posts
    const posts: Post[] = (waves || []).map((w) => ({
        id: w.id,
        type: (w.media_type === 'video' ? 'static' : 'static'),
        mediaUrls: [w.media_url],
        caption: w.caption || "",
        avgVibeRating: w.vibe_rating || 0,
        totalVibeCount: 0,
        commentCount: 0,
        createdAt: w.created_at || new Date().toISOString()
    }));

    return (
        <div className="bg-black min-h-screen pt-20 pb-20 px-4">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple mb-8 text-center font-display tracking-wider">
                Global Pulse
            </h1>

            <PulseGrid posts={posts} />

            {posts.length === 0 && (
                <div className="text-center text-gray-500 mt-12">
                    No signals detected.
                </div>
            )}
        </div>
    );
}
