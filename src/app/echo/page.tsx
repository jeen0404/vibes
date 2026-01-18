"use client";

import { motion } from "framer-motion";
import { Send, Image as ImageIcon, Smile, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface Message {
    id: string;
    content: string;
    sender_id: string;
    created_at: string;
    sender_name?: string; // Optional for display
}

export default function EchoPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [userId, setUserId] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const supabase = createClient();

    // Scroll to bottom
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        const init = async () => {
            // 1. Get User
            const { data: { user } } = await supabase.auth.getUser();
            setUserId(user?.id || null);

            // 2. Fetch Initial Messages
            const { data, error } = await supabase
                .from("echo_messages")
                .select("*")
                .order("created_at", { ascending: true });

            if (data) setMessages(data);

            // 3. Subscribe to Realtime Changes
            const channel = supabase
                .channel("public:echo_messages")
                .on(
                    "postgres_changes",
                    { event: "INSERT", schema: "public", table: "echo_messages" },
                    (payload) => {
                        console.log("New msg:", payload);
                        setMessages((prev) => [...prev, payload.new as Message]);
                    }
                )
                .subscribe();

            return () => {
                supabase.removeChannel(channel);
            };
        };

        init();
    }, []);

    const sendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!newMessage.trim() || !userId) return;

        const content = newMessage.trim();
        setNewMessage(""); // Optimistic clear

        const { error } = await supabase
            .from("echo_messages")
            .insert({ content, sender_id: userId });

        if (error) {
            console.error("Error sending:", error);
        }
    };

    return (
        <div className="h-screen bg-black text-white flex overflow-hidden">
            {/* Sidebar (Threads) - Static for Global Echo */}
            <div className="hidden md:flex flex-col w-80 border-r border-white/10 bg-black z-20">
                <div className="p-6 border-b border-white/10">
                    <h1 className="text-2xl font-black tracking-tighter">ECHO</h1>
                </div>
                <div className="flex-1 p-2">
                    <div className="p-4 bg-white/10 rounded-xl cursor-pointer">
                        <h3 className="font-bold">Global Frequency</h3>
                        <p className="text-xs text-gray-400">Everyone is here.</p>
                    </div>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col bg-[#050505] relative">
                {/* Header */}
                <div className="h-20 border-b border-white/5 flex items-center justify-between px-6 bg-black/50 backdrop-blur-md z-10">
                    <div>
                        <h3 className="font-bold">Global Frequency</h3>
                        <span className="text-xs text-neon-blue flex items-center gap-1">
                            <span className="w-1.5 h-1.5 bg-neon-blue rounded-full animate-pulse" />
                            Live
                        </span>
                    </div>
                    <MoreHorizontal className="text-gray-400 cursor-pointer" />
                </div>

                {/* Messages */}
                <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-4 pb-24 md:pb-6">
                    {messages.map((msg) => (
                        <MessageItem key={msg.id} msg={msg} isOwn={msg.sender_id === userId} />
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/5 bg-black absolute bottom-0 w-full md:relative mb-[60px] md:mb-0">
                    <form onSubmit={sendMessage} className="bg-white/5 rounded-full p-2 flex items-center gap-2 border border-white/10">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Transmitting frequency..."
                            className="flex-1 bg-transparent border-none outline-none text-sm px-4 text-white placeholder-gray-500"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim()}
                            className="p-2 bg-neon-blue text-black rounded-full hover:bg-neon-blue/80 transition disabled:opacity-50"
                        >
                            <Send className="w-4 h-4 ml-0.5" />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function MessageItem({ msg, isOwn }: { msg: Message, isOwn: boolean }) {
    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[70%] px-4 py-3 rounded-2xl text-sm ${isOwn
                ? 'bg-neon-blue text-black rounded-br-none'
                : 'bg-white/10 text-white rounded-bl-none'
                }`}>
                {msg.content}
            </div>
        </div>
    );
}
