export interface Wave {
    id: string;
    videoUrl: string;
    previewUrl: string; // Thumbnail
    creator: {
        username: string;
        avatarUrl: string;
    };
    description: string;
    songName: string;
    artistName: string;
    avgVibeRating: number; // 0.0 to 10.0
    totalVibeCount: number;
    comments: number;
    hasHapticBass: boolean; // Does this video support Haptics?
}
