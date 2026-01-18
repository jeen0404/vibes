"use client";

import { useEffect, useRef, useState } from "react";
import { Post } from "@/lib/types";
import { motion, useAnimation } from "framer-motion";
import { Zap, MessageCircle, Share2, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

export default function PulsePlayer({ post, isActive }: { post: Post, isActive: boolean }) {

    // Animation hooks
    const controls = useAnimation();
    const [ref, inView] = useInView({ threshold: 0.5 });

    useEffect(() => {
        if (isActive) {
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, [isActive, controls]);

    return (
        <div className="relative w-full h-[calc(100vh-80px)] md:h-[calc(100vh-40px)] bg-black md:rounded-xl overflow-hidden snap-center shrink-0 border-b md:border border-white/10 shadow-2xl">

            {/* Image Layer */}
            <div className="relative w-full h-full flex items-center justify-center bg-neutral-900">
                <Image
                    src={post.mediaUrls[0] || "https://images.pexels.com/photos/2098428/pexels-photo-2098428.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}
                    alt="Pulse"
                    fill
                    className="object-cover"
                />
            </div>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90 pointer-events-none" />

            {/* UI Layer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 pb-8 md:pb-6 text-white z-20">
                <div className="flex items-end justify-between">

                    {/* Content Info */}
                    <div className="flex-1 mr-4">

                        {/* User */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden bg-gray-800">
                                {/* Placeholder Avatar */}
                                <img src={`https://api.dicebear.com/9.x/avataaars/svg?seed=${post.id}`} alt="User" className="w-full h-full" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm shadow-black drop-shadow-md">@neon_shadow</h3>
                                <p className="text-xs text-gray-400">2h ago • Mumbai</p>
                            </div>
                        </div>

                        {/* Caption */}
                        <p className="text-sm font-light leading-relaxed mb-4 text-gray-200 drop-shadow-md">
                            {post.caption} <span className="text-neon-blue">#vibe #frequency</span>
                        </p>
                    </div>

                    {/* Actions Sidebar */}
                    <div className="flex flex-col items-center gap-6">
                        <div className="flex flex-col items-center gap-1 cursor-pointer group">
                            <div className="bg-white/10 p-3 rounded-full hover:bg-white/20 transition-colors backdrop-blur-md border border-white/5">
                                <Zap className="w-6 h-6 text-neon-blue fill-neon-blue" />
                            </div>
                            <span className="text-xs font-bold">{post.totalVibeCount}</span>
                        </div>

                        <div className="flex flex-col items-center gap-1 cursor-pointer group">
                            <div className="p-3">
                                <MessageCircle className="w-7 h-7" />
                            </div>
                            <span className="text-xs font-bold">{post.commentCount}</span>
                        </div>

                        <div className="flex flex-col items-center gap-1 cursor-pointer group">
                            <div className="p-3">
                                <Share2 className="w-7 h-7" />
                            </div>
                            <span className="text-xs font-bold">Share</span>
                        </div>

                        <div className="p-3 mt-2">
                            <MoreHorizontal className="w-6 h-6 text-gray-400" />
                        </div>
                    </div>

                </div>
            </div>

        </div>
    );
}
