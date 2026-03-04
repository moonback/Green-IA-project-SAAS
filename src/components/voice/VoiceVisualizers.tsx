import { motion } from 'motion/react';

export function PulseRing({ delay = 0, scale = 1.5, color = 'green-neon' }: { delay?: number; scale?: number; color?: string }) {
    return (
        <motion.div
            initial={{ scale: 1, opacity: 0.4 }}
            animate={{ scale, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay }}
            className={`absolute inset-0 rounded-full border border-${color}/30`}
        />
    );
}

export function WaveformBars() {
    const bars = [
        { delay: 0, maxH: 20 },
        { delay: 0.08, maxH: 32 },
        { delay: 0.15, maxH: 40 },
        { delay: 0.08, maxH: 32 },
        { delay: 0, maxH: 20 },
    ];

    return (
        <div className="flex items-center gap-[5px]">
            {bars.map(({ delay, maxH }, i) => (
                <motion.div
                    key={i}
                    className="w-[3px] bg-gradient-to-t from-green-neon/60 to-green-neon rounded-full"
                    animate={{ height: ['6px', `${maxH}px`, '6px'] }}
                    transition={{ duration: 0.7, repeat: Infinity, delay, ease: 'easeInOut' }}
                />
            ))}
        </div>
    );
}

export function OrbitingDots() {
    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-[-8px]"
        >
            {[0, 120, 240].map((deg) => (
                <div
                    key={deg}
                    className="absolute w-1.5 h-1.5 bg-green-neon rounded-full shadow-[0_0_8px_rgba(57,255,20,0.5)]"
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${deg}deg) translateY(-68px) translate(-50%, -50%)`,
                    }}
                />
            ))}
        </motion.div>
    );
}
