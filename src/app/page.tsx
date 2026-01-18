"use client";

import { motion } from "framer-motion";
import { Zap, Radio, Globe, Activity, User as UserIcon, Sparkles } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-background text-foreground selection:bg-neon-purple/30">

      {/* Ambient Background Glow */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-neon-purple/20 rounded-full blur-[100px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-neon-blue/20 rounded-full blur-[100px] opacity-40 pointer-events-none" />

      {/* Main Content */}
      <main className="z-10 flex flex-col items-center text-center px-6 max-w-4xl">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative"
        >
          <div className="absolute inset-0 bg-neon-blue blur-[40px] opacity-20" />
          <h1 className="text-8xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-neon-blue via-white to-neon-purple drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">
            VIBE
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-xl md:text-2xl text-gray-400 font-light mb-12 tracking-widest uppercase"
        >
          Find Your Frequency
        </motion.p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-16">
          <Link href="/waves">
            <FeatureCard
              icon={<Zap className="w-6 h-6 text-neon-blue" />}
              title="Waves"
              description="Visual stories & moments. Catch the vibe."
              delay={0.6}
            />
          </Link>
          <Link href="/pulse">
            <FeatureCard
              icon={<Activity className="w-6 h-6 text-neon-pink" />}
              title="Pulse"
              description="Short-form energy bursts. Video feed."
              delay={0.7}
            />
          </Link>
          <Link href="/profile/neon_shadow">
            <FeatureCard
              icon={<UserIcon className="w-6 h-6 text-yellow-400" />}
              title="Profile"
              description="Your sonic identity. Avatar, bio, and stats."
              delay={0.75}
            />
          </Link>
          <Link href="/sparks">
            <FeatureCard
              icon={<Sparkles className="w-6 h-6 text-orange-400" />}
              title="Sparks"
              description="Ephemeral moments. 24h stories."
              delay={0.78}
            />
          </Link>
          <Link href="/echo">
            <FeatureCard
              icon={<Radio className="w-6 h-6 text-neon-purple" />}
              title="Echo"
              description="Direct, resonant messaging. No noise."
              delay={0.8}
            />
          </Link>
          <Link href="/radar">
            <FeatureCard
              icon={<Globe className="w-6 h-6 text-white" />}
              title="Regional Radar"
              description="Hyperlocal discovery. What's happening right now."
              delay={0.9}
            />
          </Link>
          <Link href="/studio" className="md:col-span-2">
            <FeatureCard
              icon={<Activity className="w-6 h-6 text-green-400" />}
              title="Creator Studio"
              description="Monetization & Analytics. Track your frequency."
              delay={1.0}
            />
          </Link>
        </div>

        {/* CTA */}
        <Link href="/login">
          <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(191,0,255,0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-white text-black font-bold text-lg rounded-full shadow-[0_0_0_4px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
          >
            Enter the Ecosystem
          </motion.div>
        </Link>
      </main>

      <footer className="absolute bottom-8 text-xs text-gray-600 uppercase tracking-widest">
        Antimeta © 2026
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode, title: string, description: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ y: -5, backgroundColor: "rgba(255,255,255,0.08)" }}
      className="glass-card p-6 rounded-2xl flex flex-col items-start text-left border border-white/5 transition-colors h-full"
    >
      <div className="mb-4 p-3 bg-white/5 rounded-full backdrop-blur-md">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed font-light">{description}</p>
    </motion.div>
  );
}
