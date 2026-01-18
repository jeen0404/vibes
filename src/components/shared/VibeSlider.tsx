"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap } from "lucide-react";
import clsx from "clsx";

interface VibeSliderProps {
    initialRating?: number;
    onRate?: (rating: number) => void;
}

export default function VibeSlider({ initialRating = 5, onRate }: VibeSliderProps) {
    const [rating, setRating] = useState(initialRating);
    const [isDragging, setIsDragging] = useState(false);

    // Calculate color based on rating (Red -> Yellow -> Neon Blue)
    const getColor = (r: number) => {
        if (r < 4) return "text-red-500";
        if (r < 7) return "text-yellow-400";
        return "text-neon-blue drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]";
    };

    return (
        <div className="relative flex flex-col items-center gap-2 w-full max-w-[200px]">

            {/* Dynamic Zap Icon */}
            <motion.div
                animate={{ scale: isDragging ? 1.2 : 1, rotate: rating * 10 }}
                className={clsx("transition-colors duration-300", getColor(rating))}
            >
                <Zap className={clsx("w-8 h-8 fill-current")} />
            </motion.div>

            {/* The Rating Value Display */}
            <div className="text-2xl font-black font-mono text-white tabular-nums">
                {rating.toFixed(1)}
            </div>

            {/* Slider Input */}
            <input
                type="range"
                min="0"
                max="10"
                step="0.1"
                value={rating}
                onChange={(e) => {
                    const val = parseFloat(e.target.value);
                    setRating(val);
                    if (onRate) onRate(val);
                }}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)}
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-neon-blue hover:accent-neon-purple transition-all"
            />

            <div className="flex justify-between w-full text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                <span>Low Vibe</span>
                <span>High Freq</span>
            </div>
        </div>
    );
}
