"use client";

import { motion } from "framer-motion";
import { Upload, Camera, Music, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function CreatePage() {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white relative">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            <div className="w-full max-w-md text-center">
                <h1 className="text-3xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple tracking-tighter">
                    TRANSMIT
                </h1>
                <p className="text-gray-400 mb-12">Select your frequency source.</p>

                <div className="grid grid-cols-2 gap-4">
                    <Link href="/create/camera">
                        <motion.div
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            className="aspect-square bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer"
                        >
                            <div className="p-4 bg-neon-pink/20 rounded-full text-neon-pink">
                                <Camera className="w-8 h-8" />
                            </div>
                            <span className="font-bold">Camera</span>
                        </motion.div>
                    </Link>

                    <Link href="/create/upload">
                        <motion.div
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            className="aspect-square bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer"
                        >
                            <div className="p-4 bg-neon-blue/20 rounded-full text-neon-blue">
                                <Upload className="w-8 h-8" />
                            </div>
                            <span className="font-bold">Upload</span>
                        </motion.div>
                    </Link>

                    <Link href="/create/spark">
                        <motion.div
                            whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" }}
                            whileTap={{ scale: 0.98 }}
                            className="aspect-square bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer"
                        >
                            <div className="p-4 bg-yellow-400/20 rounded-full text-yellow-400">
                                <ImageIcon className="w-8 h-8" />
                            </div>
                            <span className="font-bold">Spark</span>
                        </motion.div>
                    </Link>

                    <div
                        className="aspect-square bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 opacity-50 cursor-not-allowed"
                    >
                        <div className="p-4 bg-gray-700/50 rounded-full text-gray-500">
                            <Music className="w-8 h-8" />
                        </div>
                        <span className="font-bold text-gray-500">Audio (Soon)</span>
                    </div>
                </div>

                <Link href="/waves">
                    <button className="mt-12 text-gray-500 font-mono uppercase tracking-widest text-xs hover:text-white transition-colors">
                        Cancel Transmission
                    </button>
                </Link>
            </div>
        </div>
    );
}
