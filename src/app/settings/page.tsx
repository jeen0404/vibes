"use client";

import { motion } from "framer-motion";
import { User, Shield, Bell, Zap, LogOut, ChevronRight, HelpCircle } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
    const router = useRouter();

    const handleLogout = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/login");
    };

    const sections = [
        {
            title: "Account",
            items: [
                { icon: User, label: "Edit Profile", href: "/profile/edit" },
                { icon: Shield, label: "Privacy & Security", href: "/settings/privacy" },
            ]
        },
        {
            title: "Experience",
            items: [
                { icon: Bell, label: "Notifications", href: "/settings/notifications" },
                { icon: Zap, label: "Haptics & Sound", href: "/settings/haptics" },
            ]
        },
        {
            title: "Support",
            items: [
                { icon: HelpCircle, label: "Help Center", href: "/settings/help" },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-black pb-24 text-white">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-center">
                <h1 className="font-bold text-lg tracking-wide">Settings</h1>
            </div>

            <div className="p-6 space-y-8">
                {sections.map((section, idx) => (
                    <motion.div
                        key={section.title}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                    >
                        <h2 className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-4 ml-2">
                            {section.title}
                        </h2>
                        <div className="bg-white/5 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
                            {section.items.map((item, i) => (
                                <Link href={item.href} key={item.label}>
                                    <div className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0 cursor-pointer group">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-full bg-white/5 group-hover:bg-neon-blue/20 transition-colors">
                                                <item.icon className="w-5 h-5 text-gray-300 group-hover:text-neon-blue transition-colors" />
                                            </div>
                                            <span className="font-medium">{item.label}</span>
                                        </div>
                                        <ChevronRight className="w-5 h-5 text-gray-600" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                ))}

                <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    onClick={handleLogout}
                    className="w-full p-4 mt-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 font-bold flex items-center justify-center gap-2 hover:bg-red-500/20 transition-all active:scale-[0.98]"
                >
                    <LogOut className="w-5 h-5" />
                    Log Out
                </motion.button>

                <div className="text-center pt-8">
                    <p className="text-xs text-gray-600 font-mono">Vibe v1.0.0 (Alpha)</p>
                    <p className="text-xs text-gray-700 mt-1">Made with ⚡️ by Antimeta</p>
                </div>
            </div>
        </div>
    );
}
