"use client";

import { Wave } from "@/lib/waves";
import WavePlayer from "./WavePlayer";
import { useInView } from "react-intersection-observer";

export default function WaveFeed({ initialWaves }: { initialWaves: Wave[] }) {
    return (
        <div className="w-full h-screen md:py-10 flex flex-col items-center md:gap-8 overflow-y-scroll snap-y snap-mandatory scroll-smooth no-scrollbar">
            {initialWaves.map((wave) => (
                <FeedItem key={wave.id} wave={wave} />
            ))}
        </div>
    );
}

function FeedItem({ wave }: { wave: Wave }) {
    const { ref, inView } = useInView({
        threshold: 0.6, // Activate when 60% visible
    });

    return (
        <div ref={ref} className="w-full flex justify-center snap-center shrink-0 h-screen md:h-auto py-0 md:py-4">
            <WavePlayer wave={wave} isActive={inView} />
        </div>
    );
}
