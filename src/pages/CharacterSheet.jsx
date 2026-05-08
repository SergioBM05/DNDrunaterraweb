import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import trol from '../assets/trol.jpg';
import iceborn from '../assets/iceborn.jpg';

// Importamos el mismo mapeo de temas para mantener la coherencia visual
const regionThemes = {
    Demacia: { accent: '#d8b56b', shadow: 'rgba(216, 181, 107, 0.2)' },
    Freljord: { accent: '#9fd5ff', shadow: 'rgba(159, 213, 255, 0.2)' },
    Noxus: { accent: '#ff4646', shadow: 'rgba(255, 70, 70, 0.2)' },
    Ionia: { accent: '#ff99cc', shadow: 'rgba(255, 153, 204, 0.2)' },
    Shurima: { accent: '#ffcc33', shadow: 'rgba(255, 204, 51, 0.2)' },
    Aguasturbias: { accent: '#44ffcc', shadow: 'rgba(68, 255, 204, 0.2)' },
};

const raceImagesByName = {
    'Humano': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg',
    'Mageborn': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg',
    'Constructo': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Galio_0.jpg',
    'Hijo del Hielo': iceborn,
    'Troll': trol,
    'Ursino': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Volibear_0.jpg',
    'Legionario': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg',
    'Minotauro': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Alistar_4.jpg',
    'No-Muerto': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sion_0.jpg',
    'Vastaya': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg',
    'Monje': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg',
    'Ascendido': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Azir_0.jpg',
    'Nómada': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sivir_0.jpg',
    'Pirata': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_0.jpg',
    'Hundido': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pyke_0.jpg'
};

const CharacterSheet = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const [character, setCharacter] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCharacter = async () => {
            try {
                let characterData = location.state?.character;
                if (!characterData) {
                    const { data, error } = await supabase
                        .from('personajes')
                        .select('*')
                        .eq('id', id)
                        .single();

                    if (error || !data) {
                        navigate('/selector-raza');
                        return;
                    }
                    characterData = data;
                }

                characterData = {
                    ...characterData,
                    foto_raza: characterData.img || characterData.foto_raza || location.state?.foto_raza || raceImagesByName[characterData.raza] || ''
                };

                setCharacter(characterData);
            } catch (error) {
                console.error("Error:", error);
                navigate('/selector-raza');
            } finally {
                setLoading(false);
            }
        };
        loadCharacter();
    }, [id, location.state, navigate]);

    if (loading || !character) return <div className="min-h-screen bg-[#010a13]" />;

    const theme = regionThemes[character.region] || regionThemes.Demacia;

    const atributos = [
        { nombre: 'FUE', valor: character.fuerza, label: 'Fuerza', desc: 'Potencia física' },
        { nombre: 'DES', valor: character.destreza, label: 'Destreza', desc: 'Agilidad y reflejos' },
        { nombre: 'CON', valor: character.constitucion, label: 'Constitución', desc: 'Aguante y salud' },
        { nombre: 'INT', valor: character.inteligencia, label: 'Inteligencia', desc: 'Razonamiento y memoria' },
        { nombre: 'SAB', valor: character.sabiduria, label: 'Sabiduría', desc: 'Intuición y percepción' },
        { nombre: 'CAR', valor: character.carisma, label: 'Carisma', desc: 'Fuerza de personalidad' },
    ];

    return (
        <div className="min-h-screen bg-[#010a13] text-white selection:bg-white selection:text-black font-sans overflow-x-hidden pb-20">
            {/* Fondo Dinámico con Aura de Región */}
            <div className="fixed inset-0 pointer-events-none opacity-30" 
                 style={{ background: `radial-gradient(circle at 50% 0%, ${theme.accent}, transparent 70%)` }} />
            
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-10">
                
                {/* Header Estilo Riot */}
                <header className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16 border-b border-white/10 pb-8">
                    <div className="flex flex-col">
                        <button onClick={() => navigate(-1)} className="text-[10px] tracking-[0.4em] text-white/40 uppercase mb-4 hover:text-white transition-colors">
                            ← Volver al archivo
                        </button>
                        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                            <h1 className="text-8xl font-black italic uppercase tracking-tighter leading-none mb-2">
                                {character.nombre_personaje}
                            </h1>
                            <div className="flex items-center gap-4">
                                <span className="h-px w-12 bg-white/20" />
                                <span className="text-xl italic font-light tracking-[0.2em]" style={{ color: theme.accent }}>
                                    {character.raza} {character.clase}
                                </span>
                            </div>
                        </motion.div>
                    </div>

                    <div className="flex flex-col items-end">
                        <div className="text-right">
                            <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase mb-1">Región de Origen</p>
                            <p className="text-2xl font-bold uppercase tracking-widest italic">{character.region}</p>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    
                    {/* COLUMNA IZQUIERDA: Arte y Bio */}
                    <div className="lg:col-span-5 space-y-8">
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="relative aspect-3/4 group overflow-hidden border border-white/10"
                        >
                            <img 
                                src={character.foto_raza || raceImagesByName[character.raza] || ''} 
                                alt={character.raza}
                                className="w-full h-full object-cover grayscale-20 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#010a13] via-transparent to-transparent" />
                            
                            {/* Stats Flotantes sobre la Imagen */}
                            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                                <div>
                                    <p className="text-[10px] tracking-[0.4em] text-white/60 uppercase">Nivel</p>
                                    <p className="text-5xl font-black italic tracking-tighter">{character.nivel}</p>
                                </div>
                                <div className="flex flex-col items-end">
                                    <div className="flex gap-2">
                                        <StatBadge label="HP" value={character.vida_maxima} color="#22c55e" />
                                        <StatBadge label="AC" value={character.armadura_clase} color={theme.accent} />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="bg-white/2 border border-white/5 p-8">
                            <h3 className="text-[10px] tracking-[0.5em] text-white/40 uppercase mb-4 font-bold italic">Trasfondo</h3>
                            <p className="text-gray-400 font-light leading-relaxed italic text-lg">
                                "{character.trasfondo || character.lore || "Una leyenda aún por escribir en los anales de Runaterra..."}"
                            </p>
                        </div>
                    </div>

                    {/* COLUMNA DERECHA: Atributos y Habilidades */}
                    <div className="lg:col-span-7 space-y-12">
                        
                        {/* Grid de Atributos */}
                        <section>
                            <h3 className="text-[10px] tracking-[0.5em] text-white/40 uppercase mb-8 border-l-2 pl-4" style={{ borderColor: theme.accent }}>
                                Puntuaciones de Habilidad
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                {atributos.map((attr, index) => (
                                    <motion.div
                                        key={attr.nombre}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="relative bg-white/3 border border-white/5 p-6 hover:bg-white/6 transition-all group"
                                    >
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-[10px] font-black text-white/40 tracking-tighter uppercase">{attr.nombre}</span>
                                            <span className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: theme.accent }}>
                                                +{Math.floor((attr.valor - 10) / 2)}
                                            </span>
                                        </div>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-5xl font-black italic tracking-tighter leading-none">{attr.valor}</span>
                                        </div>
                                        <p className="text-[9px] text-white/20 uppercase mt-2 font-bold tracking-widest">{attr.label}</p>
                                        
                                        {/* Decoración Hextech inferior */}
                                        <div className="absolute bottom-0 left-0 w-full h-px bg-white/5 group-hover:bg-white/20 transition-colors" />
                                    </motion.div>
                                ))}
                            </div>
                        </section>

                        {/* Stats Secundarios */}
                        <section className="grid grid-cols-2 gap-8">
                            <div className="bg-white/2 border border-white/5 p-8 relative">
                                <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase mb-2">Iniciativa</p>
                                <p className="text-4xl font-black italic">{character.iniciativa >= 0 ? '+' : ''}{character.iniciativa}</p>
                                <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">⚡</div>
                            </div>
                            <div className="bg-white/2 border border-white/5 p-8 relative">
                                <p className="text-[10px] tracking-[0.5em] text-white/40 uppercase mb-2">Velocidad</p>
                                <p className="text-4xl font-black italic">{character.velocidad} <span className="text-sm not-italic font-light text-white/20">m</span></p>
                                <div className="absolute top-0 right-0 p-4 opacity-10 text-4xl">👟</div>
                            </div>
                        </section>

                        {/* Botones de Navegación */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-8">
                            <ActionButton onClick={() => navigate('/selectCharacter')} label="Ir a mis personajes" />
                            <ActionButton onClick={() => navigate('/dashboard')} label="Volver a runaterra" outline />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Sub-componentes para limpiar el código principal
const StatBadge = ({ label, value, color }) => (
    <div className="flex flex-col items-center bg-black/60 backdrop-blur-md border border-white/10 px-4 py-2 min-w-17.5">
        <span className="text-[9px] font-bold text-white/40 uppercase">{label}</span>
        <span className="text-xl font-black italic" style={{ color: color }}>{value}</span>
    </div>
);

const ActionButton = ({ label, onClick, outline }) => (
    <button 
        onClick={onClick}
        className={`flex-1 py-4 text-[11px] font-black uppercase tracking-[0.4em] transition-all relative overflow-hidden group
            ${outline 
                ? 'border border-white/10 text-white hover:border-white/40' 
                : 'bg-white text-black hover:bg-gray-200'}`}
    >
        <span className="relative z-10">{label}</span>
        {outline && (
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
        )}
    </button>
);

export default CharacterSheet;