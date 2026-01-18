"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, Music, Image as ImageIcon, X, Send, Wand2 } from "lucide-react";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";

const FILTERS = [
    { id: 'none', name: 'Raw', class: 'filter-none' },
    { id: 'cyber', name: 'Cyber', class: 'filter-cyber' },
    { id: 'noir', name: 'Noir', class: 'filter-noir' },
    { id: 'vapor', name: 'Vapor', class: 'filter-vapor' },
    { id: 'acid', name: 'Acid', class: 'filter-acid' },
];

export default function CreatePage() {
    const router = useRouter();
    const [step, setStep] = useState<'select' | 'edit' | 'uploading'>('select');
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [selectedFilter, setSelectedFilter] = useState(FILTERS[0]);
    const [caption, setCaption] = useState("");

    const cameraInputRef = useRef<HTMLInputElement>(null);
    const galleryInputRef = useRef<HTMLInputElement>(null);

    // Cleanup object URL
    useEffect(() => {
        return () => {
            if (previewUrl) URL.revokeObjectURL(previewUrl);
        };
    }, [previewUrl]);

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setStep('edit');
    };

    const handleTransmit = async () => {
        if (!selectedFile) return;

        setStep('uploading');

        // TODO: Actual Supabase Upload Logic
        // const { data, error } = await supabase.storage.from('waves').upload(...)

        console.log("Transmitting:", { file: selectedFile.name, filter: selectedFilter.id, caption });

        setTimeout(() => {
            alert("Frequency transmitted to the Vibe network! 🌊");
            router.push("/waves");
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />

            <AnimatePresence mode="wait">
                {step === 'select' && (
                    <motion.div
                        key="select"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="w-full max-w-md text-center"
                    >
                        {/* Hidden Inputs */}
                        <input type="file" accept="image/*,video/*" capture="environment" ref={cameraInputRef} className="hidden" onChange={handleFileSelect} />
                        <input type="file" accept="image/*,video/*" ref={galleryInputRef} className="hidden" onChange={handleFileSelect} />

                        <h1 className="text-3xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple tracking-tighter">
                            TRANSMIT
                        </h1>
                        <p className="text-gray-400 mb-12">Select your frequency source.</p>

                        <div className="grid grid-cols-2 gap-4">
                            <OptionButton icon={Camera} label="Camera" color="text-neon-pink" bg="bg-neon-pink/20" onClick={() => cameraInputRef.current?.click()} />
                            <OptionButton icon={Upload} label="Upload" color="text-neon-blue" bg="bg-neon-blue/20" onClick={() => galleryInputRef.current?.click()} />
                            <Link href="/create/spark" className="contents">
                                <OptionButton icon={ImageIcon} label="Spark" color="text-yellow-400" bg="bg-yellow-400/20" onClick={() => { }} />
                            </Link>
                            <OptionButton icon={Music} label="Audio (Soon)" color="text-gray-500" bg="bg-gray-700/50" disabled />
                        </div>

                        <Link href="/waves">
                            <button className="mt-12 text-gray-500 font-mono uppercase tracking-widest text-xs hover:text-white transition-colors">
                                Cancel Transmission
                            </button>
                        </Link>
                    </motion.div>
                )}

                {step === 'edit' && previewUrl && (
                    <motion.div
                        key="edit"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="w-full max-w-md flex flex-col items-center h-[90vh]"
                    >
                        {/* Header */}
                        <div className="w-full flex justify-between items-center mb-4">
                            <button onClick={() => setStep('select')} className="p-2 rounded-full bg-white/10 hover:bg-white/20">
                                <X className="w-5 h-5" />
                            </button>
                            <span className="font-bold tracking-widest text-neon-blue">STUDIO</span>
                            <button onClick={handleTransmit} className="p-2 rounded-full bg-neon-blue text-black font-bold hover:bg-white transition-colors">
                                <Send className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Preview Area */}
                        <div className="relative w-full aspect-[4/5] bg-gray-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10 mb-6 group">
                            {selectedFile?.type.startsWith('video') ? (
                                <video
                                    src={previewUrl}
                                    className={clsx("w-full h-full object-cover transition-all duration-300", selectedFilter.class)}
                                    controls
                                    loop
                                    playsInline
                                />
                            ) : (
                                <Image
                                    src={previewUrl}
                                    alt="Preview"
                                    fill
                                    className={clsx("object-cover transition-all duration-300", selectedFilter.class)}
                                />
                            )}

                            {/* Filter Overlay Indicator */}
                            <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-md rounded-full text-xs font-bold border border-white/10">
                                {selectedFilter.name}
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="w-full space-y-6">
                            {/* Caption */}
                            <input
                                type="text"
                                placeholder="Add a caption..."
                                value={caption}
                                onChange={(e) => setCaption(e.target.value)}
                                className="w-full bg-transparent border-b border-white/20 p-2 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue transition-colors text-sm"
                            />

                            {/* Filters */}
                            <div>
                                <div className="flex items-center gap-2 mb-3 text-sm text-gray-400">
                                    <Wand2 className="w-4 h-4" />
                                    <span>Vibe Filters</span>
                                </div>
                                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                                    {FILTERS.map((f) => (
                                        <button
                                            key={f.id}
                                            onClick={() => setSelectedFilter(f)}
                                            className={clsx(
                                                "flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold border transition-all",
                                                selectedFilter.id === f.id
                                                    ? "bg-white text-black border-white scale-105"
                                                    : "bg-white/5 border-white/10 hover:bg-white/10 text-gray-300"
                                            )}
                                        >
                                            {f.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {step === 'uploading' && (
                    <motion.div
                        key="uploading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center"
                    >
                        <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                        <h2 className="text-xl font-bold animate-pulse">TRANSMITTING...</h2>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Subcomponent for cleaner code
function OptionButton({ icon: Icon, label, color, bg, onClick, disabled = false }: any) {
    return (
        <motion.div
            whileHover={!disabled ? { scale: 1.02, backgroundColor: "rgba(255,255,255,0.1)" } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
            className={clsx(
                "aspect-square bg-white/5 border border-white/10 rounded-3xl flex flex-col items-center justify-center gap-4 cursor-pointer",
                disabled && "opacity-50 cursor-not-allowed"
            )}
            onClick={!disabled ? onClick : undefined}
        >
            <div className={clsx("p-4 rounded-full", bg, color)}>
                <Icon className="w-8 h-8" />
            </div>
            <span className={clsx("font-bold", disabled ? "text-gray-500" : "text-white")}>{label}</span>
        </motion.div>
    );
}
