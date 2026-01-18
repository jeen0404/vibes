"use client";

import { motion } from "framer-motion";

export default function SonarScan() {
    return (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            {/* Core */}
            <div className="w-4 h-4 bg-neon-blue rounded-full shadow-[0_0_20px_#00f3ff] z-10" />

            {/* Ripples */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute border border-neon-blue/30 rounded-full box-content"
                    initial={{ width: 0, height: 0, opacity: 0.8 }}
                    animate={{
                        width: ["0vw", "100vw"],
                        height: ["0vw", "100vw"],
                        opacity: [0.8, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        delay: i * 1.3,
                        ease: "linear"
                    }}
                    style={{ borderWidth: "1px" }}
                />
            ))}

            {/* Scanning Line (Radar Sweep) */}
            <motion.div
                className="absolute w-[50vh] h-[50vh] bg-gradient-to-r from-transparent to-neon-blue/20 origin-bottom-left"
                style={{ borderRadius: "0 100% 0 0" }}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
}
