"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Spark, User } from "@/lib/types";

interface SparkViewerProps {
    sparks: Spark[];
    user: User;
    onClose: () => void;
}

export default function SparkViewer({ sparks, user, onClose }: SparkViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(0);

    const currentSpark = sparks[currentIndex];

    // Auto-advance logic
    useEffect(() => {
        const duration = 5000; // 5 seconds per spark
        const interval = 50; // Update every 50ms
        const step = 100 / (duration / interval);

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    if (currentIndex < sparks.length - 1) {
                        setCurrentIndex(prevIndex => prevIndex + 1);
                        return 0;
                    } else {
                        onClose(); // Close at end
                        return 100;
                    }
                }
                return prev + step;
            });
        }, interval);

        return () => clearInterval(timer);
    }, [currentIndex, sparks.length, onClose]);

    const handleNext = () => {
        if (currentIndex < sparks.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setProgress(0);
        } else {
            onClose();
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            setProgress(0);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 z-50 bg-black flex items-center justify-center p-0 md:p-8"
        >
            {/* Close Button */}
            <button onClick={onClose} className="absolute top-4 right-4 z-50 text-white p-2 bg-black/20 rounded-full backdrop-blur-md">
                <X className="w-6 h-6" />
            </button>

            {/* Main Spark Container */}
            <div className="relative w-full h-full md:max-w-[400px] md:max-h-[800px] bg-neutral-900 rounded-none md:rounded-2xl overflow-hidden flex flex-col">

                {/* Progress Bar */}
                <div className="absolute top-2 left-2 right-2 z-20 flex gap-1">
                    {sparks.map((_, idx) => (
                        <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white transition-all duration-100 ease-linear"
                                style={{
                                    width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* User Info */}
                <div className="absolute top-6 left-4 z-20 flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/20">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={user.avatarUrl || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.username}`} alt={user.username} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white font-bold text-sm drop-shadow-md">@{user.username}</span>
                    <span className="text-gray-300 text-xs drop-shadow-md">2h</span>
                </div>

                {/* Content */}
                <div className="flex-1 relative bg-black" onClick={handleNext}>
                    {currentSpark.type === 'image' ? (
                        <div className="relative w-full h-full">
                            <Image
                                src={currentSpark.mediaUrl}
                                alt="Spark"
                                fill
                                className="object-cover"
                            />
                        </div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-white">Video Spark Placeholder</div>
                    )}
                </div>

                {/* Navigation Hotspots (Mobile) */}
                <div className="absolute inset-y-0 left-0 w-1/4 z-10" onClick={(e) => { e.stopPropagation(); handlePrev(); }} />
                <div className="absolute inset-y-0 right-0 w-1/4 z-10" onClick={(e) => { e.stopPropagation(); handleNext(); }} />

                {/* Footer Reply */}
                <div className="absolute bottom-0 w-full p-4 bg-gradient-to-t from-black/80 to-transparent z-20 flex items-center justify-between gap-4">
                    <input
                        type="text"
                        placeholder="Reply..."
                        className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-3 text-white placeholder-gray-400 backdrop-blur-md outline-none focus:border-neon-pink transition-colors text-sm"
                    />
                    <button className="bg-white/10 p-3 rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 active:scale-95 transition-all">
                        <Sparkles className="w-6 h-6 text-orange-400 fill-orange-400" />
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
