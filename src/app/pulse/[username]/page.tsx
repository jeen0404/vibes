import { User, Post } from "@/lib/types";
import ProfileHeader from "@/components/waves/ProfileHeader";
import PulseGrid from "@/components/waves/PulseGrid";

// Mock Data for Phase 2 Demo
const MOCK_USER: User = {
    id: "u1",
    username: "neon_shadow",
    displayName: "Shadow Walker",
    bio: "Hunting frequencies in the noise. 🌊 | Visual Artist | Mumbai 📍",
    avatarUrl: "", // Will use Dicebear fallback
    frequencyScore: 940, // High vibe
    followersCount: 12400,
    followingCount: 342,
    hasActiveSpark: true,
    sparks: [
        { id: "s1", mediaUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", type: "image", expiresAt: "", isSeen: false },
        { id: "s2", mediaUrl: "https://images.pexels.com/photos/1043323/pexels-photo-1043323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", type: "image", expiresAt: "", isSeen: false }
    ]
};

const MOCK_POSTS: Post[] = Array.from({ length: 9 }).map((_, i) => ({
    id: `p${i}`,
    type: i % 3 === 0 ? 'carousel' : 'static',
    mediaUrls: [],
    caption: "Vibing...",
    avgVibeRating: 8.5 + (i * 0.1),
    totalVibeCount: 156,
    commentCount: 5 + i,
    createdAt: new Date().toISOString(),
}));

export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
    const { username } = await params;

    // In a real app, fetch user by username here.
    // const user = await db.user.find(username)...
    const user = { ...MOCK_USER, username: username }; // Optimistic update for demo

    return (
        <div className="min-h-screen bg-background text-foreground pb-20">
            {/* Top Nav Placeholder */}
            <nav className="fixed top-0 w-full h-16 glass z-50 flex items-center justify-center border-b border-white/5">
                <span className="text-neon-blue font-bold tracking-widest text-lg">PULSE</span>
            </nav>

            <div className="max-w-4xl mx-auto pt-28 px-4">
                <ProfileHeader user={user} />

                <div className="w-full h-px bg-white/10 my-8" />

                <PulseGrid posts={MOCK_POSTS} />
            </div>
        </div>
    );
}
