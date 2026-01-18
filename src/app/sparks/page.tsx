"use client";

import SparkViewer from "@/components/sparks/SparkViewer";
import { User } from "@/lib/types";
import { useRouter } from "next/navigation";

// Mock User with Sparks
const MOCK_USER: User = {
    id: "u1",
    username: "neon_shadow",
    displayName: "Shadow Walker",
    bio: "Hunting frequencies",
    avatarUrl: "",
    frequencyScore: 940,
    followersCount: 12400,
    followingCount: 342,
    hasActiveSpark: true,
    sparks: [
        { id: "s1", mediaUrl: "https://images.pexels.com/photos/1389429/pexels-photo-1389429.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", type: "image", expiresAt: "", isSeen: false },
        { id: "s2", mediaUrl: "https://images.pexels.com/photos/1043323/pexels-photo-1043323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", type: "image", expiresAt: "", isSeen: false }
    ]
};

export default function SparksPage() {
    const router = useRouter();

    return (
        <div className="bg-black min-h-screen">
            <SparkViewer
                sparks={MOCK_USER.sparks!}
                user={MOCK_USER}
                onClose={() => router.push("/")}
            />
        </div>
    );
}
