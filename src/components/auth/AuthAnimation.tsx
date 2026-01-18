"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function AuthAnimation({ onComplete }: { onComplete: () => void }) {
    const [phase, setPhase] = useState<'flow' | 'morph_pulse' | 'morph_dot' | 'spark' | 'done'>('flow');

    useEffect(() => {
        // Sequence Timeline
        // 0s: Start Flowing Wave
        // 2.0s: Convert to Pulse
        const pulseTimer = setTimeout(() => setPhase('morph_pulse'), 2000);

        // 4.0s: Contract to Dot
        const dotTimer = setTimeout(() => setPhase('morph_dot'), 4000);

        // 4.5s: Explode Spark
        const sparkTimer = setTimeout(() => setPhase('spark'), 4500);

        // 6.0s: Finish
        const doneTimer = setTimeout(() => {
            setPhase('done');
            onComplete();
        }, 6000);

        return () => {
            clearTimeout(pulseTimer);
            clearTimeout(dotTimer);
            clearTimeout(sparkTimer);
            clearTimeout(doneTimer);
        };
    }, [onComplete]);

    if (phase === 'done') return null;

    // --- Path Definitions ---

    // Wave A (Positive Phase)
    const waveA = "M 0 75 Q 37.5 25, 75 75 T 150 75 T 225 75 T 300 75";
    // Wave B (Inverted Phase for Oscillation)
    const waveB = "M 0 75 Q 37.5 125, 75 75 T 150 75 T 225 75 T 300 75";

    // Pulse (Heartbeat)
    const pulsePath = "M 0 75 L 100 75 L 115 10 L 130 140 L 145 75 L 300 75";

    // Dot (Collapsed Center)
    const dotPath = "M 150 75 L 150 75 L 150 75 L 150 75 L 150 75 L 150 75";

    return (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center overflow-hidden">

            <div className="relative w-[300px] h-[150px] flex items-center justify-center">

                {/* SVG Line Animation */}
                {phase !== 'spark' && (
                    <svg width="300" height="150" viewBox="0 0 300 150" className="overflow-visible">

                        {/* THE LINE */}
                        <motion.path
                            fill="transparent"
                            strokeWidth="4"
                            strokeLinecap="round"
                            strokeLinejoin="round"

                            // Initial State
                            initial={{ d: waveA, stroke: "#00f3ff" }}

                            animate={{
                                d: phase === 'flow' ? [waveA, waveB, waveA] : // Oscillate Wave
                                    phase === 'morph_pulse' ? pulsePath : // Become Pulse
                                        dotPath, // Compress

                                stroke: phase === 'flow' ? "#00f3ff" :
                                    phase === 'morph_pulse' ? "#ff0099" :
                                        "#ffffff",

                                filter: phase === 'morph_pulse' ? ["drop-shadow(0 0 0px #ff0099)", "drop-shadow(0 0 15px #ff0099)", "drop-shadow(0 0 0px #ff0099)"] : "none",

                                // "Pulse" Beat Effect simulation via Scale/StrokeWidth on the path itself? 
                                // Hard on a path. Instead we use the parent container or filter pulse above.
                                strokeWidth: phase === 'morph_pulse' ? [4, 8, 4] : 4,
                            }}

                            transition={{
                                // Wave Oscillation Loop
                                d: phase === 'flow' ? {
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: "easeInOut"
                                } : {
                                    duration: 0.8,
                                    type: "spring",
                                    bounce: 0.3 // Add a little snapped bounce to the morph
                                },

                                stroke: { duration: 0.5 },

                                // Pulse Beat Loop
                                filter: phase === 'morph_pulse' ? {
                                    repeat: Infinity,
                                    duration: 0.8, // Fast heartbeat
                                    ease: "easeInOut"
                                } : { duration: 0.2 },

                                strokeWidth: phase === 'morph_pulse' ? {
                                    repeat: Infinity,
                                    duration: 0.8,
                                    ease: "easeInOut"
                                } : { duration: 0.2 }
                            }}
                        />
                    </svg>
                )}

                {/* Spark Explosion (Only during 'spark') */}
                {phase === 'spark' && (
                    <motion.div className="relative flex items-center justify-center w-full h-full">
                        {/* Flash */}
                        <motion.div
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: [1, 20], opacity: [1, 0] }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="absolute w-4 h-4 bg-white rounded-full z-0"
                        />

                        {/* Particles */}
                        {[...Array(16)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-1 bg-gradient-to-r from-yellow-300 to-orange-500 rounded-full"
                                initial={{ x: 0, y: 0, scale: 0 }}
                                animate={{
                                    x: Math.cos(i * 22.5 * (Math.PI / 180)) * 140,
                                    y: Math.sin(i * 22.5 * (Math.PI / 180)) * 140,
                                    scale: [0, 1.5, 0]
                                }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            />
                        ))}

                        {/* Text */}
                        <motion.h2
                            initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            transition={{ delay: 0.1, duration: 0.4 }}
                            className="absolute mt-32 text-white font-black tracking-[0.5em] text-xl"
                        >
                            VIBE
                        </motion.h2>
                    </motion.div>
                )}

                {/* Status Text (Updates with phases) */}
                {phase !== 'spark' && (
                    <motion.div
                        className="absolute mt-40 text-xs font-mono tracking-widest uppercase"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: 1,
                            color: phase === 'morph_pulse' ? '#ff0099' : '#00f3ff',
                            textShadow: phase === 'morph_pulse' ? "0 0 10px #ff0099" : "none"
                        }}
                    >
                        {phase === 'flow' && "Calibrating..."}
                        {phase === 'morph_pulse' && "Vital Signs..."}
                        {phase === 'morph_dot' && "Ignition..."}
                    </motion.div>
                )}

            </div>
        </div>
    );
}
