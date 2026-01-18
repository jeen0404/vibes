export interface Spark {
    id: string;
    mediaUrl: string;
    type: 'image' | 'video';
    expiresAt: string;
    isSeen: boolean;
}

export interface User {
    id: string;
    username: string; // The "Handle"
    displayName: string;
    bio: string;
    avatarUrl: string;
    frequencyScore: number; // 0-100 "Vibe" score
    followersCount: number;
    followingCount: number;
    hasActiveSpark?: boolean; // Does the user have a live story?
    sparks?: Spark[]; // The stories themselves
}

export interface Post {
    id: string;
    type: 'static' | 'carousel';
    mediaUrls: string[];
    caption: string;
    avgVibeRating: number; // 0.0 to 10.0
    totalVibeCount: number; // Number of ratings
    commentCount: number;
    createdAt: string;
    location?: string;
}
