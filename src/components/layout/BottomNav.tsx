"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Zap, Activity, Globe, MessageCircle, User, Sparkles, Search, Plus, Radio } from "lucide-react";
import clsx from "clsx";

export default function BottomNav() {
    const pathname = usePathname();

    // Hide on the landing page if user considers '/' as just the marketing intro
    // But user asked for "main page like instagram". 
    // Usually, the "Home" of the app is the feed.
    // For this demo, let's show it on all pages EXCEPT the very initial landing page if desired,
    // OR we can just show it everywhere. 
    // Let's hide it on '/' (Landing) so the "Enter" experience remains impactful,
    // and then it appears on all other routes.
    if (pathname === "/" || pathname === "/login") return null;

    const navItems = [
        { name: "Waves", href: "/waves", icon: Zap },
        { name: "Explore", href: "/radar", icon: Search },
        { name: "Create", href: "/create", icon: Plus, isFab: true },
        { name: "Pulse", href: "/pulse", icon: Activity },
        { name: "Profile", href: "/profile/neon_shadow", icon: User },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-t border-white/10 pb-4 pt-2 md:hidden">
            <div className="flex items-center justify-around px-2">
                {navItems.map((item) => {
                    const isActive = pathname.startsWith(item.href);
                    // Special case for Profile to match dynamic username
                    const isProfileActive = item.name === "Profile" && pathname.includes("/profile/");
                    const active = isActive || isProfileActive;

                    if (item.isFab) {
                        return (
                            <Link href={item.href} key={item.name} className="flex flex-col items-center justify-start -mt-6">
                                <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-neon-blue to-neon-purple flex items-center justify-center shadow-[0_0_20px_rgba(0,243,255,0.4)] border-4 border-black">
                                    <Plus className="w-8 h-8 text-black" />
                                </div>
                            </Link>
                        )
                    }

                    return (
                        <Link href={item.href} key={item.name} className="flex flex-col items-center p-2 group">
                            <div className={clsx(
                                "flex items-center justify-center w-12 h-10 rounded-full transition-all duration-300",
                                active ? "bg-white/10" : "hover:bg-white/5"
                            )}>
                                <item.icon
                                    className={clsx(
                                        "w-6 h-6 transition-colors",
                                        active ? (
                                            item.name === "Pulse" ? "text-neon-pink fill-neon-pink" :
                                                item.name === "Waves" ? "text-neon-blue fill-neon-blue" :
                                                    "text-white fill-white"
                                        ) : "text-gray-500"
                                    )}
                                />
                            </div>
                            {/* Optional Label (Insta usually hides labels on bottom nav, keeping it clean) */}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
