import { Zap } from "lucide-react";
import clsx from "clsx";

interface BadgeProps {
    type: "raw" | "verified" | "admin";
    className?: string;
}

export default function Badge({ type, className }: BadgeProps) {
    if (type === "raw") {
        return (
            <div
                className={clsx(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full border border-neon-pink/50 bg-neon-pink/10 text-[10px] font-bold tracking-wider text-neon-pink uppercase shadow-[0_0_10px_rgba(255,0,153,0.3)]",
                    className
                )}
                title="Raw Resonance: No Filters Detected"
            >
                <Zap className="w-3 h-3 fill-neon-pink" />
                <span>RAW</span>
            </div>
        );
    }

    return null;
}
