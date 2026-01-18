"use client";

import { useState, useEffect, Suspense } from "react";
import AuthAnimation from "@/components/auth/AuthAnimation";
import { motion } from "framer-motion";
import { login, signup } from "@/app/auth/actions";
import Link from "next/link";
import { Zap, ArrowRight, Lock, Mail, Github, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
    const searchParams = useSearchParams();
    const [animationDone, setAnimationDone] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Skip animation if we have error params (redirected back) or already seen
        const hasError = searchParams.has("error") || searchParams.has("message");
        const seen = sessionStorage.getItem("vibe_auth_intro_played");

        if (hasError || seen) {
            setAnimationDone(true);
        }
    }, [searchParams]);

    const handleAnimationComplete = () => {
        setAnimationDone(true);
        sessionStorage.setItem("vibe_auth_intro_played", "true");
    };

    if (!mounted) return null; // Avoid hydration mismatch

    // If animation isn't done, show it
    if (!animationDone) {
        return <AuthAnimation onComplete={handleAnimationComplete} />;
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden text-white p-4">

            {/* Background Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

            {/* ambient glow */}
            <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-purple/20 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-blue/20 blur-[120px] rounded-full pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl relative z-10"
            >
                {/* Header */}
                <h1 className="text-6xl tracking-wide mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple font-display drop-shadow-[0_0_10px_rgba(191,0,255,0.5)]">
                    Vibes
                </h1>
                <p className="text-gray-400 text-sm">
                    {isLogin ? "Welcome back to the ecosystem." : "Find your frequency."}
                </p>

                {/* Error / Message Display */}
                {
                    searchParams.get("error") && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-3 text-red-400 text-sm">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p>{searchParams.get("error")}</p>
                        </div>
                    )
                }
                {
                    searchParams.get("message") && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-start gap-3 text-green-400 text-sm">
                            <AlertCircle className="w-5 h-5 shrink-0" />
                            <p>{searchParams.get("message")}</p>
                        </div>
                    )
                }

                {/* Form */}
                <form className="space-y-4">
                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-neon-blue focus:ring-1 focus:ring-neon-blue outline-none transition-all placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            className="w-full bg-black/40 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:border-neon-purple focus:ring-1 focus:ring-neon-purple outline-none transition-all placeholder:text-gray-600"
                            required
                        />
                    </div>

                    <button
                        formAction={isLogin ? login : signup}
                        className="w-full bg-white text-black font-bold py-4 rounded-xl mt-4 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
                    >
                        {isLogin ? "Log In" : "Join Vibe"}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-4 my-8">
                    <div className="h-px bg-white/5 flex-1" />
                    <span className="text-gray-500 text-xs uppercase">Or continue with</span>
                    <div className="h-px bg-white/5 flex-1" />
                </div>

                {/* Social */}
                <div className="grid grid-cols-2 gap-4">
                    <button className="py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors">
                        <Github className="w-5 h-5" />
                    </button>
                    <button className="py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl flex items-center justify-center transition-colors font-bold text-sm">
                        G
                    </button>
                </div>

                {/* Switcher */}
                <div className="mt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-white font-bold hover:underline"
                        >
                            {isLogin ? "Sign Up" : "Log In"}
                        </button>
                    </p>
                </div>

            </motion.div >
        </div >
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={null}>
            <LoginForm />
        </Suspense>
    );
}
