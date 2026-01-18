"use client";

import Link from "next/link";
import { Post } from "@/lib/types";
import { motion } from "framer-motion";
import { Copy, Zap } from "lucide-react";

export default function PulseGrid({ posts }: { posts: Post[] }) {
    return (
        <div className="grid grid-cols-3 gap-1 md:gap-4 w-full">
            {posts.map((post, index) => (
                <Link href={`/waves/p/${post.id}`} key={post.id}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.02, zIndex: 10 }}
                        className="aspect-square relative group cursor-pointer bg-white/5 rounded-md overflow-hidden border border-white/5 hover:border-white/20 transition-all"
                    >
                        {/* Image Placeholder */}
                        <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-800">
                            <div className="bg-gradient-to-br from-neutral-800 to-neutral-900 w-full h-full" />
                        </div>

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="text-white font-bold flex gap-1 items-center">
                                <Zap className="w-5 h-5 text-neon-blue fill-neon-blue" />
                                <span>{post.totalVibeCount}</span>
                            </div>
                        </div>

                        {/* Type Indicator */}
                        {post.type === 'carousel' && (
                            <div className="absolute top-2 right-2 text-white/80">
                                <Copy className="w-4 h-4" />
                            </div>
                        )}

                    </motion.div>
                </Link>
            ))}
        </div>
    );
}
