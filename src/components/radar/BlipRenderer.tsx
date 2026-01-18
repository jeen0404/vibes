"use client";

import { RadarBlip } from "@/lib/radar";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin } from "lucide-react";

export default function BlipRenderer({ blips }: { blips: RadarBlip[] }) {
    return (
        <div className="absolute inset-0 z-20">
            <AnimatePresence>
                {blips.map((blip) => (
                    <BlipItem key={blip.id} blip={blip} />
                ))}
            </AnimatePresence>
        </div>
    );
}

function BlipItem({ blip }: { blip: RadarBlip }) {
    // Random position logic for Demo purpose (since we don't have a real map canvas yet)
    // In a real app, this would project lat/lng to screen coordinates.
    // For now, we simulate "distance" by placing them further from center.

    // Using a seeded random-ish placement based on ID hash for stability
    const angle = blip.id.charCodeAt(1) * 10;
    const radiusPerc = Math.min(40, (blip.distance / 1000) * 10) + 10; // Scale distance to screen %

    return (
        <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
                marginTop: `${Math.sin(angle) * radiusPerc}vh`,
                marginLeft: `${Math.cos(angle) * radiusPerc}vw`
            }}
        >
            {/* Blip Dot */}
            <div className="w-3 h-3 bg-neon-purple rounded-full animate-ping absolute inset-0 opacity-75" />
            <div className="w-3 h-3 bg-neon-purple rounded-full relative z-10 border border-white/50" />

            {/* Hover info card */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 min-w-[150px] bg-black/80 backdrop-blur-md border border-neon-purple/30 p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-6 h-6 rounded-full overflow-hidden bg-gray-700">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={blip.user.avatarUrl} alt={blip.user.username} />
                    </div>
                    <span className="text-xs font-bold text-white">@{blip.user.username}</span>
                </div>
                <p className="text-[10px] text-gray-300 italic">"{blip.message}"</p>
                <div className="flex items-center gap-1 mt-1 text-[9px] text-neon-blue">
                    <MapPin className="w-2 h-2" />
                    <span>{blip.distance}m away</span>
                </div>
            </div>
        </motion.div>
    );
}
