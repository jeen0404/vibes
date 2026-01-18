"use client";

import { useEffect, useRef, useState } from "react";
import PulsePlayer from "./PulsePlayer";
import { Post } from "@/lib/types";
import { useInView } from "react-intersection-observer";

export default function PulseFeed({ initialPosts = [] }: { initialPosts?: Post[] }) {
    const [posts, setPosts] = useState<Post[]>(initialPosts);

    return (
        <div className="w-full h-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth pb-20 md:pb-0">
            {posts.map((post) => (
                <FeedItem key={post.id} post={post} />
            ))}
            {posts.length === 0 && (
                <div className="flex items-center justify-center h-full text-gray-500">
                    <p>No waves in the ether yet.</p>
                </div>
            )}
        </div>
    );
}

function FeedItem({ post }: { post: Post }) {
    const { ref, inView } = useInView({ threshold: 0.6 });

    return (
        <div ref={ref} className="w-full h-full md:p-8 flex items-center justify-center snap-start">
            <PulsePlayer post={post} isActive={inView} />
        </div>
    );
}
