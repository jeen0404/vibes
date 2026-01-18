"use client";

import { motion } from "framer-motion";
import { User, Activity, Zap, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";

export default function NotificationsList({ initialNotifications }: { initialNotifications: any[] }) {
    // In future: Add realtime subscription here

    if (initialNotifications.length === 0) {
        return (
            <div className="p-12 text-center text-gray-600 text-sm">
                No ripples yet.
            </div>
        );
    }

    return (
        <div className="divide-y divide-white/5">
            {initialNotifications.map((notif, i) => {
                const sender = notif.sender || {};
                const icon = getIcon(notif.type);

                return (
                    <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="p-4 flex items-center gap-4 hover:bg-white/5 transition-colors cursor-pointer"
                    >
                        {/* Icon */}
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gray-800 overflow-hidden border border-white/10">
                                <Image
                                    src={sender.avatar_url || `https://api.dicebear.com/9.x/avataaars/svg?seed=${sender.username}`}
                                    alt={sender.username}
                                    width={48}
                                    height={48}
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-black rounded-full p-1 border border-black">
                                <icon.icon className={`w-3 h-3 ${icon.color} fill-current`} />
                            </div>
                        </div>

                        {/* Text */}
                        <div className="flex-1 text-sm">
                            <p>
                                <span className="font-bold text-white pr-1">{sender.username}</span>
                                <span className="text-gray-400">{notif.message || icon.text}</span>
                            </p>
                        </div>

                        <span className="text-xs text-gray-600 tabular-nums">
                            {formatDistanceToNow(new Date(notif.created_at), { addSuffix: true })}
                        </span>
                    </motion.div>
                );
            })}
        </div>
    );
}

function getIcon(type: string) {
    switch (type) {
        case 'like': return { icon: Zap, color: "text-neon-blue", text: "vibed with you" };
        case 'comment': return { icon: MessageCircle, color: "text-white", text: "commented" };
        case 'follow': return { icon: User, color: "text-neon-purple", text: "tuned in" };
        default: return { icon: Activity, color: "text-gray-400", text: "activity" };
    }
}
