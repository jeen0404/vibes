"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Search, X, User, Music, Hash, TrendingUp, ChevronRight } from "lucide-react";
import { useState } from "react";
import { clsx } from "clsx";
import Image from "next/image";

interface RadarSearchOverlayProps {
    isOpen: boolean;
    onClose: () => void;
}

// Mock Data
const SUGGESTIONS = [
    { id: 1, type: "user", label: "neon_shadow", sub: "Visual Artist" },
    { id: 2, type: "music", label: "Midnight City", sub: "M83" },
    { id: 3, type: "tag", label: "#cyberpunk", sub: "12.4k vibes" },
    { id: 4, type: "user", label: "glitch_queen", sub: "DJ • Tokyo" },
    { id: 5, type: "music", label: "Starboy", sub: "The Weeknd" },
];

export default function RadarSearchOverlay({ isOpen, onClose }: RadarSearchOverlayProps) {
    const [activeTab, setActiveTab] = useState<"all" | "people" | "audio" | "tags">("all");
    const [query, setQuery] = useState("");

    const tabs = [
        { id: "all", label: "All" },
        { id: "people", label: "People", icon: User },
        { id: "audio", label: "Audio", icon: Music },
        { id: "tags", label: "Tags", icon: Hash },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: "100%" }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col"
                >
                    {/* Header */}
                    <div className="p-4 flex items-center gap-4 border-b border-white/10">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                autoFocus
                                placeholder="Search the frequency..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className="w-full bg-white/10 border border-white/10 rounded-full py-3 pl-12 pr-4 text-white placeholder:text-gray-500 focus:ring-1 focus:ring-neon-blue outline-none transition-all"
                            />
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/5 rounded-full hover:bg-white/10 text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 p-4 overflow-x-auto no-scrollbar">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={clsx(
                                    "px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2 transition-all whitespace-nowrap border",
                                    activeTab === tab.id
                                        ? "bg-neon-blue text-black border-neon-blue"
                                        : "bg-white/5 text-gray-400 border-white/5 hover:bg-white/10 hover:text-white"
                                )}
                            >
                                {tab.icon && <tab.icon className="w-4 h-4" />}
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto p-4">
                        {!query && (
                            <div className="mb-8">
                                <h3 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4 text-neon-pink" />
                                    Trending Nearby
                                </h3>
                                <div className="space-y-2">
                                    {SUGGESTIONS.map((item, i) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            key={item.id}
                                            className="flex items-center justify-between p-3 rounded-xl hover:bg-white/5 cursor-pointer group transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={clsx(
                                                    "w-10 h-10 rounded-full flex items-center justify-center text-black font-bold",
                                                    item.type === 'user' ? "bg-gradient-to-br from-neon-blue to-cyan-500" :
                                                        item.type === 'music' ? "bg-gradient-to-br from-neon-pink to-purple-500" :
                                                            "bg-gradient-to-br from-yellow-400 to-orange-500"
                                                )}>
                                                    {item.type === 'user' && <User className="w-5 h-5" />}
                                                    {item.type === 'music' && <Music className="w-5 h-5" />}
                                                    {item.type === 'tag' && <Hash className="w-5 h-5" />}
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">{item.label}</p>
                                                    <p className="text-gray-500 text-xs">{item.sub}</p>
                                                </div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors" />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {query && (
                            <div className="text-center py-12 text-gray-500">
                                <p>Searching the ether for "{query}"...</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
