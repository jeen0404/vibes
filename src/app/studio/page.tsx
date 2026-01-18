"use client";

import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, TrendingUp, Users, DollarSign, BarChart3, Settings } from "lucide-react";

// Mock Analytics Data
const DATA = [
    { name: 'Mon', frequency: 4000 },
    { name: 'Tue', frequency: 3000 },
    { name: 'Wed', frequency: 6500 },
    { name: 'Thu', frequency: 8000 },
    { name: 'Fri', frequency: 5400 },
    { name: 'Sat', frequency: 9000 },
    { name: 'Sun', frequency: 12000 },
];

export default function StudioPage() {
    return (
        <div className="min-h-screen bg-black text-white p-6 pb-24 md:pl-64">
            {/* Sidebar Mockup (Desktop) */}
            <aside className="fixed left-0 top-0 h-full w-64 border-r border-white/10 hidden md:flex flex-col p-6 bg-black z-20">
                <h1 className="text-2xl font-black text-white tracking-tighter mb-10 flex items-center gap-2">
                    <Activity className="text-neon-blue" />
                    STUDIO
                </h1>
                <nav className="flex flex-col gap-4">
                    <NavItem icon={<BarChart3 />} label="Dashboard" active />
                    <NavItem icon={<Users />} label="Audience" />
                    <NavItem icon={<DollarSign />} label="Monetization" />
                    <NavItem icon={<Settings />} label="Settings" />
                </nav>
            </aside>

            {/* Mobile Header */}
            <header className="md:hidden mb-8 flex items-center gap-2">
                <Activity className="text-neon-blue w-6 h-6" />
                <span className="font-bold tracking-widest text-lg">STUDIO</span>
            </header>

            <main className="max-w-5xl mx-auto">
                <h2 className="text-2xl font-bold mb-6">Channel Overview</h2>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <StatCard icon={<Activity className="text-neon-pink" />} label="Avg Frequency" value="890 Hz" trend="+12%" />
                    <StatCard icon={<TrendingUp className="text-neon-blue" />} label="Total Views" value="245.8K" trend="+5.4%" />
                    <StatCard icon={<DollarSign className="text-green-400" />} label="Est. Revenue" value="$1,240" trend="+8.2%" />
                </div>

                {/* Chart Area */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full h-[400px] bg-white/5 rounded-2xl p-6 border border-white/10 mb-8"
                >
                    <h3 className="text-sm font-bold text-gray-400 mb-6 uppercase">Frequency Resonance (Last 7 Days)</h3>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={DATA}>
                            <defs>
                                <linearGradient id="colorFreq" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.8} />
                                    <stop offset="95%" stopColor="#00f3ff" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis dataKey="name" stroke="#555" tick={{ fill: '#888', fontSize: 12 }} />
                            <YAxis stroke="#555" tick={{ fill: '#888', fontSize: 12 }} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#111', border: '1px solid #333' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area type="monotone" dataKey="frequency" stroke="#00f3ff" fillOpacity={1} fill="url(#colorFreq)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </motion.div>

                {/* Monetization Status */}
                <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg">Partner Program Status</h3>
                        <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold rounded-full border border-green-500/30">ACTIVE</span>
                    </div>
                    <p className="text-gray-400 text-sm mb-4">You are eligible for ad revenue sharing and premium creator tools.</p>

                    <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
                        <div className="bg-neon-blue h-full w-[85%] rounded-full shadow-[0_0_10px_#00f3ff]" />
                    </div>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>Threshold Reached</span>
                        <span>Next Tier: Elite Creator</span>
                    </div>
                </div>

            </main>
        </div>
    );
}

function NavItem({ icon, label, active }: { icon: React.ReactNode, label: string, active?: boolean }) {
    return (
        <div className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors ${active ? 'bg-white/10 text-white font-bold' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}>
            {icon}
            {label}
        </div>
    );
}

function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="p-2 bg-white/5 rounded-full">{icon}</div>
                <span className="text-green-400 text-xs font-bold bg-green-500/10 px-2 py-1 rounded-full">{trend}</span>
            </div>
            <div>
                <span className="text-gray-400 text-xs uppercase tracking-wider block mb-1">{label}</span>
                <span className="text-3xl font-black">{value}</span>
            </div>
        </div>
    );
}
