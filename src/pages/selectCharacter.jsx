import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../lib/supabaseClient';
import trol from '../assets/trol.jpg';
import humanoFreljord from '../assets/humanoFreiljord.jpg';
import iceborn from '../assets/iceborn.jpg';

const regionColors = {
    Demacia: '#d8b56b',
    Freljord: '#9fd5ff',
    Noxus: '#ff4646',
    Ionia: '#ff99cc',
    Shurima: '#ffcc33',
    Aguasturbias: '#44ffcc',
};

const CharacterLibrary = () => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('All');
    const [hoveredId, setHoveredId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCharacters = async () => {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate('/login');
                return;
            }

            const { data, error } = await supabase
                .from('personajes')
                .select('*')
                .eq('usuario_id', user.id)
                .order('fecha_creacion', { ascending: false });

            if (!error) setCharacters(data);
            setLoading(false);
        };
        fetchCharacters();
    }, [navigate]);

    const filteredCharacters = filter === 'All' 
        ? characters 
        : characters.filter(c => c.region === filter);

    const regions = ['All', ...Object.keys(regionColors)];

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
        'Pirata': 'https://ddragon.leagueoflegarts.com/cdn/img/champion/splash/Gangplank_0.jpg',
        'Hundido': 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pyke_0.jpg'
    };

    if (loading) return (
        <div className="min-h-screen bg-[#010a13] flex items-center justify-center">
            <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-12 h-12 border-4 border-t-white border-white/10 rounded-full"
            />
        </div>
    );

    return (
        <div className="min-h-screen bg-[#010a13] text-white p-8 lg:p-16 overflow-x-hidden">
            {/* BACKGROUND DESTELLO DINÁMICO */}
            <AnimatePresence>
                {hoveredId && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-0 pointer-events-none"
                        style={{ 
                            backgroundImage: `radial-gradient(circle at center, ${regionColors[characters.find(c => c.id === hoveredId)?.region] || '#fff'}, transparent 70%)` 
                        }}
                    />
                )}
            </AnimatePresence>

            <header className="relative z-10 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
                <div>
                    <h1 className="text-[10px] tracking-[0.8em] text-white/40 uppercase mb-2">Colección de Leyendas</h1>
                    <h2 className="text-6xl font-black italic uppercase tracking-tighter">Tus <span className="text-white/20">Campeones</span></h2>
                </div>

                {/* FILTROS POR REGIÓN */}
                <div className="flex flex-wrap gap-2">
                    {regions.map(r => (
                        <button
                            key={r}
                            onClick={() => setFilter(r)}
                            className={`px-4 py-1 text-[10px] font-bold uppercase tracking-widest border transition-all
                                ${filter === r ? 'border-white bg-white text-black' : 'border-white/10 text-white/40 hover:border-white/30 hover:text-white'}`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </header>

            {/* GRID DE SELECCIÓN */}
            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
                
                {/* BOTÓN CREAR NUEVO */}
                <motion.div
                    onClick={() => navigate('/dashboard')}
                    style={{ height: '450px' }}
                    className="group relative border-2 border-dashed border-white/10 flex flex-col items-center justify-center cursor-pointer hover:border-white/30 transition-all hover:bg-white/2"
                >
                    <span className="text-4xl mb-4 group-hover:scale-125 transition-transform">+</span>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 group-hover:text-white">Forjar Destino</p>
                </motion.div>

                {/* CARTAS DE PERSONAJE */}
                {filteredCharacters.map((char, index) => (
                    <motion.div
                        key={char.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        onMouseEnter={() => setHoveredId(char.id)}
                        onMouseLeave={() => setHoveredId(null)}
                        onClick={() => navigate(`/character/${char.id}`, { state: { character: char } })}
                        className="group relative bg-black overflow-hidden border border-white/10 cursor-pointer shadow-2xl"
                        style={{ height: '450px' }}
                    >
                        {/* IMAGEN DE FONDO */}
                        <img 
                            src={char.img || char.foto_raza || raceImagesByName[char.raza] || raceImagesByName[char.nombre_personaje] || humanoFreljord} 
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-60 opacity-80 grayscale-30 group-hover:grayscale-0"
                            alt={char.nombre_personaje}
                        />
                        
                        {/* OVERLAY GRADIENTE */}
                        <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />
                        
                        {/* BORDE DINÁMICO SEGÚN REGIÓN */}
                        <div 
                            className="absolute inset-0 border-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                            style={{ borderColor: regionColors[char.region] }}
                        />

                        {/* INFO DEL PERSONAJE */}
                        <div className="absolute inset-x-0 bottom-0 p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                            <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-1" style={{ color: regionColors[char.region] }}>
                                {char.region}
                            </p>
                            <h3 className="text-3xl font-black italic uppercase tracking-tighter leading-none mb-3">
                                {char.nombre_personaje}
                            </h3>
                            
                                <div className="flex gap-4 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                                <div className="text-center">
                                    <p className="text-[8px] text-white/40 uppercase font-bold">Nivel</p>
                                    <p className="text-sm font-black italic">{char.nivel}</p>
                                </div>
                                <div className="h-6 w-px bg-white/20" />
                                <div>
                                    <p className="text-[8px] text-white/40 uppercase font-bold">Clase</p>
                                    <p className="text-sm font-black italic">{char.clase}</p>
                                </div>
                            </div>
                        </div>

                        {/* INDICADOR DE SELECCIÓN (ESQUINA) */}
                        <div className="absolute top-4 right-4 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all transform rotate-45 border-r-2 border-t-2 border-white pointer-events-none" />
                    </motion.div>
                ))}
            </div>

            {/* MENSAJE SI NO HAY PERSONAJES */}
            {filteredCharacters.length === 0 && !loading && (
                <div className="mt-20 text-center">
                    <p className="text-white/20 uppercase tracking-[0.5em] italic">No se han encontrado leyendas en esta región</p>
                </div>
            )}
        </div>
    );
};

export default CharacterLibrary;