"use client";

import Image from "next/image";
import { User } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SparkViewer from "../sparks/SparkViewer";
import clsx from "clsx";

export default function ProfileHeader({ user }: { user: User }) {
    const [showSparks, setShowSparks] = useState(false);
    const hasSparks = user.hasActiveSpark && user.sparks && user.sparks.length > 0;

    return (
        <>
            <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-6 mb-8 relative">

                {/* Avatar with Frequency Aura & Spark Ring */}
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="relative group cursor-pointer"
                    onClick={() => hasSparks && setShowSparks(true)}
                >
                    {/* Ambient Aura */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple blur-md opacity-30 group-hover:opacity-60 transition-opacity duration-500" />

                    {/* Spark Ring (Instagram Style) */}
                    {hasSparks && (
                        <div className="absolute -inset-[3px] rounded-full bg-gradient-to-tr from-yellow-400 via-neon-pink to-purple-600 animate-spin-slow z-0" />
                    )}

                    <div className={clsx(
                        "relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 bg-black z-10",
                        hasSparks ? "border-transparent" : "border-white/10"
                    )}>
                        <div className="w-full h-full rounded-full overflow-hidden bg-gray-800 relative">
                            <Image
                                src={user.avatarUrl || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.username}`}
                                alt={user.username}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* "Live" Indicator if needed, or Spark indicator */}
                    {hasSparks && (
                        <div className="absolute bottom-0 right-0 z-20 text-xs bg-neon-pink text-black font-bold px-2 py-0.5 rounded-full border border-black transform translate-y-1">
                            SPARKS
                        </div>
                    )}
                </motion.div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left z-10">
                    <div className="flex flex-col md:flex-row items-center gap-2 mb-2">
                        <h1 className="text-2xl font-bold text-white tracking-tight">@{user.username}</h1>
                    </div>

                    <p className="text-gray-300 text-sm mb-4 max-w-md mx-auto md:mx-0 font-light leading-relaxed">
                        {user.bio}
                    </p>

                    {/* Stats */}
                    <div className="flex items-center justify-center md:justify-start gap-6 text-sm">
                        <div className="flex flex-col items-center md:items-start">
                            <span className="font-bold text-white">{user.frequencyScore}Hz</span>
                            <span className="text-gray-500 text-xs uppercase tracking-wider">Frequency</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col items-center md:items-start">
                            <span className="font-bold text-white">{user.followersCount}</span>
                            <span className="text-gray-500 text-xs uppercase tracking-wider">Listeners</span>
                        </div>
                        <div className="w-px h-8 bg-white/10" />
                        <div className="flex flex-col items-center md:items-start">
                            <span className="font-bold text-white">{user.followingCount}</span>
                            <span className="text-gray-500 text-xs uppercase tracking-wider">Tuning In</span>
                        </div>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {showSparks && hasSparks && (
                    <SparkViewer
                        sparks={user.sparks!}
                        user={user}
                        onClose={() => setShowSparks(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
