"use client";

import PulseFeed from "@/components/waves/PulseFeed";

// In a real app, we would only pass the specific post to the feed here, 
// or set the initial scroll index to that post.
// For this demo, we'll just render the feed.
export default function PulsePostPage() {
    return (
        <div className="bg-black min-h-screen">
            <PulseFeed />
        </div>
    );
}
