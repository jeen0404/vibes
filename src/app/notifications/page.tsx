import { motion } from "framer-motion";
import { User, Activity, Zap, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import NotificationsList from "@/components/notifications/NotificationsList";

export const dynamic = "force-dynamic";

export default async function NotificationsPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const { data: notifications } = await supabase
        .from("notifications")
        .select(`
            id,
            type,
            message,
            created_at,
            sender:sender_id (
                username,
                avatar_url
            )
        `)
        .eq("recipient_id", user.id)
        .order("created_at", { ascending: false });

    return (
        <div className="min-h-screen bg-black pb-24 text-white">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10 px-6 py-4 flex items-center justify-center">
                <h1 className="font-bold text-lg tracking-wide">Activity</h1>
            </div>

            <NotificationsList initialNotifications={notifications || []} />
        </div>
    );
}
