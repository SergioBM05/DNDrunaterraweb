import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import musicTrack from '../assets/music/Cinder Cathedral.mp3';

const STORAGE_KEY = 'dnd-runaterra-music-enabled';

const GlobalMusicPlayer = () => {
    const audioRef = useRef(null);
    const [isEnabled, setIsEnabled] = useState(() => localStorage.getItem(STORAGE_KEY) === 'true');
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.loop = true;
        audio.volume = 0.3;

        const startPlayback = async () => {
            if (!isEnabled) return;

            try {
                await audio.play();
                setIsPlaying(true);
            } catch {
                setIsPlaying(false);
            }
        };

        startPlayback();

        const resumeOnFirstInteraction = () => {
            if (!isEnabled) return;
            audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
            window.removeEventListener('click', resumeOnFirstInteraction);
            window.removeEventListener('keydown', resumeOnFirstInteraction);
            window.removeEventListener('touchstart', resumeOnFirstInteraction);
        };

        window.addEventListener('click', resumeOnFirstInteraction);
        window.addEventListener('keydown', resumeOnFirstInteraction);
        window.addEventListener('touchstart', resumeOnFirstInteraction);

        return () => {
            window.removeEventListener('click', resumeOnFirstInteraction);
            window.removeEventListener('keydown', resumeOnFirstInteraction);
            window.removeEventListener('touchstart', resumeOnFirstInteraction);
        };
    }, [isEnabled]);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        localStorage.setItem(STORAGE_KEY, String(isEnabled));

        if (!isEnabled) {
            audio.pause();
            setIsPlaying(false);
        }
    }, [isEnabled]);

    const toggleMusic = async () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
            return;
        }

        setIsEnabled(true);
        try {
            await audio.play();
            setIsPlaying(true);
        } catch {
            setIsPlaying(false);
        }
    };

    return (
        <>
            <audio ref={audioRef} src={musicTrack} preload="auto" />

            <AnimatePresence>
                <motion.button
                    type="button"
                    onClick={toggleMusic}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-10 left-6 z-120 flex items-center gap-3 rounded-full border border-[#c8aa6e]/30 bg-[#010a13]/90 px-4 py-3 text-[#f0e6d2] shadow-[0_0_24px_rgba(0,0,0,0.45)] backdrop-blur-md transition-all hover:border-[#c8aa6e] hover:bg-[#0b111a]"
                    aria-pressed={isPlaying}
                    aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
                >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#c8aa6e]/30 bg-[#1e2328] text-[#c8aa6e]">
                        {isPlaying ? (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                <path d="M8 5h3v14H8zm5 0h3v14h-3z" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                                <path d="M8 5v14l11-7z" />
                            </svg>
                        )}
                    </span>

                    <div className="flex flex-col items-start leading-none">
                        <span className="text-[10px] uppercase tracking-[0.35em] text-white/40">Música</span>
                        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#c8aa6e]">
                            {isPlaying ? 'Sonando' : 'Activar'}
                        </span>
                    </div>
                </motion.button>
            </AnimatePresence>
        </>
    );
};

export default GlobalMusicPlayer;