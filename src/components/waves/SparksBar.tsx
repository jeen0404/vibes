"use client";

import { User } from "@/lib/types";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import SparkViewer from "../sparks/SparkViewer";
import clsx from "clsx";
import { Plus } from "lucide-react";
import Link from "next/link";

interface SparksBarProps {
    users: User[];
}

export default function SparksBar({ users }: SparksBarProps) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    return (
        <>
            <div className="w-full overflow-x-auto scrollbar-hide py-4 pl-4 flex gap-4 border-b border-white/5 bg-black/50 backdrop-blur-sm">

                {/* Create Spark Button */}
                <Link href="/create/spark">
                    <div className="flex flex-col items-center gap-1 cursor-pointer group">
                        <div className="relative w-16 h-16 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition-colors">
                            <Plus className="w-6 h-6 text-neon-blue" />
                            <div className="absolute bottom-0 right-0 bg-neon-blue text-black rounded-full p-0.5 border border-black">
                                <Plus className="w-3 h-3" />
                            </div>
                        </div>
                        <span className="text-xs text-gray-400 font-medium">You</span>
                    </div>
                </Link>

                {/* Users with Sparks */}
                {users.map((user, i) => (
                    <motion.div
                        key={user.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="flex flex-col items-center gap-1 cursor-pointer group min-w-[64px]"
                        onClick={() => setSelectedUser(user)}
                    >
                        <div className="relative w-16 h-16 rounded-full p-[3px]">
                            {/* Gradient Ring */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-yellow-400 via-neon-pink to-purple-600 animate-spin-slow" />

                            {/* Avatar Container */}
                            <div className="relative w-full h-full rounded-full border-2 border-black overflow-hidden bg-gray-800">
                                <Image
                                    src={user.avatarUrl || `https://api.dicebear.com/9.x/avataaars/svg?seed=${user.username}`}
                                    alt={user.username}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>
                        </div>
                        <span className="text-xs text-white/90 font-medium truncate w-16 text-center">
                            {user.username}
                        </span>
                    </motion.div>
                ))}
            </div>

            {/* Viewer Modal */}
            <AnimatePresence>
                {selectedUser && selectedUser.sparks && (
                    <SparkViewer
                        sparks={selectedUser.sparks}
                        user={selectedUser}
                        onClose={() => setSelectedUser(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
