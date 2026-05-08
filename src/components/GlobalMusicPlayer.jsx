import { useEffect, useRef, useState } from 'react';
import musicTrack from '../assets/music/Cinder Cathedral.mp3';

const STORAGE_KEY = 'dnd-runaterra-music-enabled';

const GlobalMusicPlayer = () => {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.loop = true;
        audio.volume = 0.3;
        audio.muted = false;
        localStorage.setItem(STORAGE_KEY, 'true');

        const startPlayback = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch {
                try {
                    audio.muted = true;
                    await audio.play();
                    setIsPlaying(true);
                } catch {
                    setIsPlaying(false);
                }
            }
        };

        startPlayback();

        return () => {
            audio.pause();
        };
    }, []);

    return (
        <audio ref={audioRef} src={musicTrack} preload="auto" playsInline />
    );
};

export default GlobalMusicPlayer;