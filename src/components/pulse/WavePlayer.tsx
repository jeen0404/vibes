"use client";

import { useEffect, useRef, useState } from "react";
import { Wave } from "@/lib/waves";
import { motion, useAnimation } from "framer-motion";
import { Play, Pause, MessageCircle, Share2, Music2, Volume2, VolumeX, Activity } from "lucide-react";
import VibeSlider from "../shared/VibeSlider";
import { useInView } from "react-intersection-observer";

export default function WavePlayer({ wave, isActive }: { wave: Wave, isActive: boolean }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);

    // Haptic Logic
    const triggerHaptics = () => {
        if (wave.hasHapticBass && navigator.vibrate) {
            // Simple "bass drop" pattern simulations
            // In real app, this would be synced to timecodes
            navigator.vibrate([20, 10, 20]);
        }
    };

    useEffect(() => {
        if (isActive) {
            videoRef.current?.play().then(() => {
                setIsPlaying(true);
            }).catch(() => {
                // Auto-play policy might block unmuted
                setIsPlaying(false);
            });
        } else {
            videoRef.current?.pause();
            setIsPlaying(false);
        }
    }, [isActive]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
                setIsPlaying(false);
            } else {
                videoRef.current.play();
                setIsPlaying(true);
                triggerHaptics();
            }
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <div className="relative w-full h-[calc(100vh-80px)] md:h-[600px] md:w-[350px] bg-black rounded-xl overflow-hidden snap-center shrink-0 border border-white/10 shadow-2xl">
            {/* Video Layer */}
            <video
                ref={videoRef}
                src={wave.videoUrl}
                poster={wave.previewUrl}
                className="w-full h-full object-cover cursor-pointer"
                loop
                playsInline
                muted={isMuted} // Default muted for autoplay policy
                onClick={togglePlay}
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/80 pointer-events-none" />

            {/* Controls / UI */}
            <div className="absolute bottom-4 left-4 right-4 text-white z-20">
                <div className="flex items-end justify-between">
                    <div className="flex-1 mr-4">
                        {/* Creator Info */}
                        <div className="flex items-center gap-2 mb-3 cursor-pointer hover:underline">
                            <div className="w-10 h-10 rounded-full bg-gray-700 border border-white/20 overflow-hidden">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={wave.creator.avatarUrl} alt={wave.creator.username} className="w-full h-full object-cover" />
                            </div>
                            <div>
                                <h3 className="font-bold text-sm flex items-center gap-1 shadow-black drop-shadow-md">
                                    @{wave.creator.username}
                                </h3>
                            </div>
                        </div>

                        {/* Description */}
                        <p className="text-sm font-light mb-4 line-clamp-2 drop-shadow-md">
                            {wave.description}
                        </p>

                        {/* Audio Track */}
                        <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full w-fit backdrop-blur-sm">
                            <Music2 className="w-3 h-3 animate-spin-slow" />
                            <span className="text-xs truncate max-w-[150px]">{wave.artistName} - {wave.songName}</span>
                        </div>
                    </div>

                    {/* Sidebar Actions */}
                    <div className="flex flex-col items-center gap-6 pb-2">
                        <ActionButton
                            icon={<Activity className="w-8 h-8 stroke-1" />}
                            activeIcon={<Activity className="w-8 h-8 fill-neon-pink text-neon-pink stroke-none" />}
                            count={wave.totalVibeCount}
                            isActive={false} // Toggle state would go here
                            color="hover:text-neon-pink"
                        />

                        <ActionButton icon={<MessageCircle className="w-7 h-7" />} count={wave.comments} />
                        <ActionButton icon={<Share2 className="w-7 h-7" />} count={0} label="Share" />
                        <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={toggleMute}
                            className="bg-white/10 p-2 rounded-full backdrop-blur-sm"
                        >
                            {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Play/Pause Center Indicator */}
            {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-black/40 p-4 rounded-full backdrop-blur-sm">
                        <Play className="w-8 h-8 text-white fill-white" />
                    </div>
                </div>
            )}
        </div>
    );
}

function ActionButton({ icon, activeIcon, count, label, color = "hover:text-neon-blue", isActive }: { icon: React.ReactNode, activeIcon?: React.ReactNode, count: number, label?: string, color?: string, isActive?: boolean }) {
    return (
        <div className="flex flex-col items-center gap-1 cursor-pointer group">
            <div className={`transition-colors drop-shadow-lg ${isActive ? 'text-neon-blue' : 'text-white'} ${color}`}>
                {isActive && activeIcon ? activeIcon : icon}
            </div>
            {(count > 0 || label) && (
                <span className="text-xs font-medium drop-shadow-md">
                    {label || (count > 1000 ? `${(count / 1000).toFixed(1)}k` : count)}
                </span>
            )}
        </div>
    );
}
