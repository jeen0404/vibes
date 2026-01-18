"use client";

import { useEffect, useState } from "react";
import SonarScan from "@/components/radar/SonarScan";
import BlipRenderer from "@/components/radar/BlipRenderer";
import RadarSearchOverlay from "@/components/radar/RadarSearchOverlay";
import { RadarBlip } from "@/lib/radar";
import { Navigation, Search } from "lucide-react";

// MOCK BLIPS
const MOCK_BLIPS: RadarBlip[] = [
    {
        id: "b1", lat: 0, lng: 0,
        user: { username: "local_hero", avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=hero" },
        message: "Anyone up for chai at Tapri?",
        distance: 250,
        timestamp: new Date().toISOString()
    },
    {
        id: "b2", lat: 0, lng: 0,
        user: { username: "gym_rat_99", avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=gym" },
        message: "Gym session starting now. 💪",
        distance: 800,
        timestamp: new Date().toISOString()
    },
    {
        id: "b3", lat: 0, lng: 0,
        user: { username: "poet_soul", avatarUrl: "https://api.dicebear.com/9.x/avataaars/svg?seed=poet" },
        message: "Sunset looks crazy from the terrace.",
        distance: 1200,
        timestamp: new Date().toISOString()
    },
];

export default function RadarPage() {
    const [scanning, setScanning] = useState(true);
    const [blips, setBlips] = useState<RadarBlip[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        // Simulate "Finding" blips after 2 seconds of scanning
        const timer = setTimeout(() => {
            setBlips(MOCK_BLIPS);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full h-screen bg-black overflow-hidden relative flex flex-col items-center justify-end pb-20">

            {/* Header */}
            <div className="absolute top-0 w-full p-6 z-30 flex justify-between items-start pointer-events-auto">
                <div>
                    <h1 className="text-3xl font-black text-white flex items-center gap-2 drop-shadow-lg">
                        RADAR <span className="text-sm font-normal text-neon-blue border border-neon-blue px-2 rounded-full animate-pulse">LIVE</span>
                    </h1>
                    <p className="text-sm text-gray-400">Scanning frequency: 60s</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <button
                        onClick={() => setIsSearchOpen(true)}
                        className="p-3 bg-white/10 backdrop-blur-md rounded-full text-white border border-white/20 hover:bg-white/20 transition active:scale-90"
                    >
                        <Search className="w-6 h-6" />
                    </button>
                    <div className="text-right pointer-events-none mt-2">
                        <div className="text-2xl font-bold text-white">Jaipur</div>
                        <div className="text-xs text-gray-500">26.9124° N, 75.7873° E</div>
                    </div>
                </div>
            </div>

            {/* Radar Visual */}
            <SonarScan />

            {/* Blips */}
            <BlipRenderer blips={blips} />

            {/* Controls */}
            <div className="z-30 mb-8 flex gap-4 pointer-events-auto">
                <button className="px-6 py-3 bg-white/10 backdrop-blur-md rounded-full text-white font-bold border border-white/20 hover:bg-white/20 transition flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    Broadcast Signal
                </button>
            </div>

            {/* Search Overlay */}
            <RadarSearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

        </div>
    );
}
