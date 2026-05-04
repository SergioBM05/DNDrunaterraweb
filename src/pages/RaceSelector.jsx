import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import trol from '../assets/trol.jpg';
import humanoFreljord from '../assets/humanoFreiljord.jpg';
import iceborn from '../assets/iceborn.jpg';

const regionThemes = {
    Demacia: {
        accent: '#d8b56b',
        aura: 'radial-gradient(circle at 20% 20%, rgba(216, 181, 107, 0.18) 0%, transparent 55%)',
        titleShift: { y: -18, opacity: 0 },
        titleReveal: { y: 0, opacity: 1 },
        cardShift: { x: -36, opacity: 0 },
        cardReveal: { x: 0, opacity: 1 }
    },
    Freljord: {
        accent: '#9fd5ff',
        aura: 'radial-gradient(circle at 80% 20%, rgba(159, 213, 255, 0.16) 0%, transparent 58%)',
        titleShift: { y: 12, opacity: 0 },
        titleReveal: { y: 0, opacity: 1 },
        cardShift: { x: 36, opacity: 0 },
        cardReveal: { x: 0, opacity: 1 }
    },
    Noxus: {
        accent: '#c85f5f',
        aura: 'radial-gradient(circle at 50% 10%, rgba(200, 95, 95, 0.18) 0%, transparent 60%)',
        titleShift: { scale: 0.96, opacity: 0 },
        titleReveal: { scale: 1, opacity: 1 },
        cardShift: { y: 28, opacity: 0 },
        cardReveal: { y: 0, opacity: 1 }
    }
};

const RaceSelector = () => {
    const location = useLocation();
    const navigate = useNavigate();

    // Recuperamos la región del state
    const { selectedClass, color, region } = location.state || {
        selectedClass: "Clase",
        color: "#c8aa6e",
        region: "Demacia"
    };

    // Diccionario maestro con rutas de imagen (basado en image_f08f20.png)
    const racesByRegion = {
        "Demacia": [
            { id: 'humano', name: 'Humano', desc: 'Ciudadanos devotos de la justicia y el honor.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg' },
            { id: 'mageBorn', name: 'Mageborn Demaciano', desc: 'Aliados poco comunes pero poderosos en las fronteras.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Alistar_0.jpg' },
            { id: 'petricitas', name: 'Petricitas', desc: 'Aliados poco comunes pero poderosos en las fronteras.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Alistar_0.jpg' }

        ],
        "Freljord": [
            { id: 'humano', name: 'Humano', desc: 'Supervivientes natos de las tribus del norte.', img: humanoFreljord },
            { id: 'iceborn', name: 'Iceborn', desc: 'Guerreros bendecidos con la sangre del hielo puro.', img: iceborn },
            { id: 'troll', name: 'Troll', img: trol, desc: 'Gigantes brutales que dominan los pasos helados.' },
            { id: 'ursino', name: 'Ursino', desc: 'Guerreros ferales transformados por el espíritu del oso.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Volibear_0.jpg' }
        ],
        "Noxus": [
            { id: 'humano', name: 'Humano', desc: 'La raza más común en Runaterra.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg' },
            { id: 'vastayaNoxiano', name: 'Vastaya Noxiano', desc: 'La raza más común en Runaterra.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg' },
            { id: 'forjadoGuerra', name: 'Forjado de Guerra', desc: 'La raza más común en Runaterra.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg' },
        ]
    };

    const currentRaces = racesByRegion[region] || [{ id: 'humano', name: 'Humano', desc: 'La raza más común en Runaterra.', img: '' }];
    const theme = regionThemes[region] || regionThemes.Demacia;

    return (
        <div className="relative min-h-screen bg-[#010a13] p-10 flex flex-col items-center overflow-hidden">
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                style={{ background: theme.aura }}
            />
            {/* Header (Igual a image_f08f20.png) */}
            <header className="relative z-10 w-full max-w-7xl flex justify-between items-start mb-20">
                <button
                    onClick={() => navigate(-1)}
                    className="uppercase tracking-widest text-[11px] font-bold hover:text-white transition-colors"
                    style={{ color: theme.accent }}
                >
                    ← Volver a {region}
                </button>
                <div className="text-right">
                    <p className="text-[10px] text-[#c8aa6e]/60 uppercase tracking-[0.3em]">Héroe de {region}</p>
                    <h3 className="text-4xl font-black italic uppercase italic tracking-tighter" style={{ color: color || theme.accent }}>
                        {selectedClass}
                    </h3>
                </div>
            </header>

            {/* Título Principal */}
            <div className="relative z-10 text-center mb-20">
                <motion.h2
                    initial={theme.titleShift}
                    animate={theme.titleReveal}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="text-7xl font-black text-white uppercase italic tracking-tighter mb-4"
                >
                    Selecciona tu <span style={{ color: theme.accent }}>Raza</span>
                </motion.h2>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.4em]">Razas disponibles en el territorio de {region}</p>
            </div>

            {/* Lista de Razas (Ancho completo como image_f08f20.png) */}
            <div className="relative z-10 w-full max-w-6xl flex flex-col gap-10">
                {currentRaces.map((race, index) => (
                    <motion.div
                        key={race.id}
                        initial={theme.cardShift}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.12, duration: 0.6, ease: 'easeOut' }}
                        className="relative group w-full h-[450px] cursor-pointer overflow-hidden border border-white/5 bg-black"
                    >
                        {/* Imagen de Fondo con Zoom y Overlay */}
                        <div className="absolute inset-0 z-0">
                            <motion.img
                                src={race.img}
                                alt={race.name}
                                className="w-full h-full object-cover object-[center_35%] opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-100"
                            />
                            {/* Degradado para legibilidad */}
                            <div
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(to top, #010a13 10%, rgba(1, 10, 19, 0.48) 52%, transparent 100%), ${theme.aura}`
                                }}
                            />
                        </div>

                        {/* Contenido (Abajo a la izquierda) */}
                        <div className="relative z-10 h-full p-12 flex flex-col justify-end">
                            <div className="max-w-xl">
                                <span className="text-[10px] font-bold text-[#c8aa6e] mb-2 tracking-[0.5em] uppercase block">
                                    Raza
                                </span>

                                <h4 className="text-6xl font-black text-white uppercase italic tracking-tighter mb-4 group-hover:text-white transition-colors duration-300" style={{ textShadow: `0 0 24px ${theme.accent}20` }}>
                                    {race.name}
                                </h4>

                                <p className="text-gray-400 text-sm leading-relaxed mb-8 max-w-md opacity-80 group-hover:opacity-100 transition-opacity">
                                    {race.desc}
                                </p>

                                {/* Barrita dorada decorativa de image_f08f20.png */}
                                <div className="relative w-24 h-[3px] bg-white/10 overflow-hidden">
                                    <motion.div
                                        className="absolute inset-0 bg-[#c8aa6e]"
                                        style={{ backgroundColor: theme.accent }}
                                        initial={{ x: "-100%" }}
                                        whileInView={{ x: "0%" }}
                                        transition={{ duration: 0.8, delay: 0.2 }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Brillo ambiental en hover */}
                        <div
                            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 transition-opacity duration-700"
                            style={{
                                background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`
                            }}
                        />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RaceSelector;