import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from 'react-router-dom';

// Assets
import demacia from "../assets/demacia.jpg";
import jonia from "../assets/jonia.jpg";
import mapImage from "../assets/runaterra.jpg";
import noxus from "../assets/noxus.jpg";
import freljord from "../assets/freljord.jpg";
import shurima from "../assets/shurima.jpg";
import shadowisles from "../assets/shadowisles.jpg";
import piltover from "../assets/piltover.jpg";
import targon from "../assets/targon.jpg";
import bilgewater from "../assets/bilgewater.jpg";
import zaun from "../assets/zaun.jpg";
import barbaroFreiljord from "../assets/barbaroFreiljord.jpg";
import barbaroNoxus from "../assets/barbaroNoxus.jpg";
import barbaroShurima from "../assets/barbaroShurima.jpg";
import barbaroZaun from "../assets/barbaroZaun.jpg";
import barbaroTargon from "../assets/barbaroTargon.jpg";
import barbaroShadowIsles from "../assets/barbaroShadowIsles.jpg";
import ixtal from "../assets/ixtal.jpg";
import druidaixtal from "../assets/druidaixtal.jpg";

const DATA_RUNATERRA = {
    demacia: {
        nombre: "Demacia",
        color: "#c8aa6e",
        estiloTitulo: "bg-gradient-to-b from-[#f0e6d2] via-[#c8aa6e] to-[#785a28] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(200,170,110,0.8)]",
        animacionTitulo: "animate-pulse",
        fondo: demacia,
        clases: [
            {
                id: "barbaroDemacia",
                titulo: "Barbaro",
                subtitulo: "THE MIGHT OF DEMACIA",
                descripcion: "Fearless leader of the Dauntless Vanguard, Garen protects his kingdom with his life and his massive broadsword.",
                tags: ["FIGHTER", "TANK"],
                habilidades: [
                    { name: "Decisive Strike", desc: "Garen gains a burst of Movement Speed, breaking free of all slows." },
                    { name: "Demacian Justice", desc: "Garen calls upon the might of Demacia to attempt to execute an enemy champion." }
                ],
                imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg",
            },
            {
                id: "mago_lux",
                titulo: "Lux",
                subtitulo: "THE LADY OF LUMINOSITY",
                descripcion: "Master the light to illuminate the path for your allies and disintegrate those who stand in your way.",
                tags: ["MAGE", "SUPPORT"],
                habilidades: [
                    { name: "Light Binding", desc: "Shackle enemies with light." },
                    { name: "Final Spark", desc: "A beam of pure light." }
                ],
                imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg",
            },
        ],
    },
    ionia: {
        nombre: "Ionia",
        color: "#db9ac3",
        estiloTitulo: "bg-gradient-to-r from-[#db9ac3] via-[#fbcfe8] to-[#93c5fd] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(219,154,195,0.4)]",
        animacionTitulo: "animate-bounce [animation-duration:3s]",
        fondo: jonia,
        clases: [
            {
                id: "barbaroIonia",
                titulo: "Barbaro",
                subtitulo: "THE NINE-TAILED FOX",
                descripcion: "Dance through the battlefield using spiritual essence to charm and destroy your enemies.",
                tags: ["MAGE", "ASSASSIN"],
                habilidades: [
                    { name: "Orb of Deception", desc: "Magic damage on the way out and true damage back." },
                    { name: "Spirit Rush", desc: "Triple dash with essence bolts." }
                ],
                imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg",
            },
        ],
    },
    noxus: {
        nombre: "Noxus",
        color: "#ff4e4e",
        estiloTitulo: "bg-gradient-to-t from-[#4a0404] via-[#ff4e4e] to-[#ff0000] bg-clip-text text-transparent drop-shadow-[2px_4px_0px_rgba(0,0,0,1)]",
        animacionTitulo: "hover:scale-110 transition-transform duration-300",
        fondo: noxus,
        clases: [
            {
                id: "barbaroNoxus",
                titulo: "Bárbaro",
                subtitulo: "Devastador",
                descripcion: "Los Devastadores son la encarnación de la doctrina militar noxiana: fuerza, disciplina y dominio absoluto del campo de batalla. No son salvajes sin control; son líderes que canalizan su furia en estrategia marcial. Su ira es la del Imperio: expansiva, dominante y calculadoramente brutal. Cada golpe es un mensaje, cada grito una orden. Destruyen enemigos no solo con músculo, sino con una presencia que doblega voluntades y convierte a sus aliados en extensiones letales de su propia furia. Recompensa el liderazgo en primera línea y la coordinación táctica.",
                tags: ["Melee", "CA Todas"],
                weapons: ["Espadas largas, mandobles, lanzas, hachas de guerra, picas, escudo táctico"],
                habilidades: [
                    { name: "Presencia del Conquistador", desc: " La furia no disminuye fuera de combate mientras la unidad no descanse. Al entrar en Rabia, todos los aliados a 15m ganan +10 PV temporales y ventaja en su siguiente tirada de ataque. Los enemigos a 10m deben hacer salvación de WIS (CD = 8 + bonif. competencia + CHA) o quedar asustados durante 1 turno. Además, cada vez que un aliado a 15m impacta a un enemigo asustado por ti, tú generas +5 de furia." },
                ],
                imagen: barbaroNoxus,
            },
        ],
    },
    freljord: {
        nombre: "Freljord",
        color: "#e0fbff", // Azul hielo pálido
        // Estilo: Efecto de hielo cristalino con destellos blancos
        estiloTitulo: "bg-gradient-to-b from-[#ffffff] via-[#e0fbff] to-[#a5f3fc] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]",
        animacionTitulo: "animate-none blur-[0.3px]",
        estiloTextoClase: "text-[#e0fbff] drop-shadow-[0_0_10px_rgba(224,251,255,0.6)] font-light",
        fondo: freljord, // Tu asset de imagen
        clases: [
            {
                id: "barbaroFreiljord",
                titulo: "Bárbaro",
                subtitulo: "Berserker",
                descripcion: "Los Berserkers del Fréljord son guerreros que canalizan la furia primaria de la tundra y las tormentas. A diferencia de otros bárbaros, su ira no es solo calor de batalla: es frío cortante, es el rugido de la ventisca. Luchan con abandono temerario, entrando en estados de frenesí donde el dolor se convierte en poder y el hielo en su aliado. Cuanto más daño reciben, más peligrosos se vuelven, sacrificando defensa por pura aniquilación. Recompensa el juego agresivo y el riesgo constante en primera línea.",
                tags: ["Melee", "CA Ligero, Medio"],
                habilidades: [
                    { name: "Sangre de la Tormenta", desc: " La furia no disminuye fuera de combate si está en clima frío o nevado. Mientras está en Rabia, genera aura de frío (5 pies): enemigos que empiezan su turno en el área hacen salvación de CON (CD = 8) o quedan ralentizados 1 turno. Cada vez que recibe daño, su siguiente ataque gana +1d4 de daño por frío (no acumulable)." },
                ],
                imagen: barbaroFreiljord,
            },
        ],
    },
    shurima: {
        nombre: "Shurima",
        color: "#e3b33e",
        estiloTitulo: "bg-gradient-to-tr from-[#854d0e] via-[#e3b33e] to-[#fef08a] bg-clip-text text-transparent drop-shadow-[0_5px_15px_rgba(227,179,62,0.5)]",
        fondo: shurima,
        clases: [
            {
                id: "mago_azir",
                titulo: "Bárbaro",
                subtitulo: "Furia de las Dunas",
                descripcion: "Los Furias de las Dunas canalizan una resistencia conservadora, soportando castigos que matarían a cualquier otro. Su poder crece con cada golpe recibido, como las tormentas de arena que se alimentan del viento. No buscan evadir el daño: lo absorben, lo transforman y lo devuelven multiplicado. Son inevitables, imparables, como el propio desierto. Su resistencia es legendaria y su presencia evoca el poder de los antiguos dioses shurimanos. Recompensa el juego de tanque absoluto y la venganza paciente.",
                tags: ["Melee", "CA Ligero, Medio"],
                habilidades: [
                    { name: "Resistencia de las Arenas", desc: "Resistencia de las Arenas: La furia no disminuye fuera de combate mientras esté en terreno desértico o bajo el sol. Al entrar en Rabia, obtienes una coraza de arena: ganas resistencia al daño perforante, cortante y contundente durante 2 turnos. Cada vez que recibes daño, tu siguiente ataque gana +1d6 de daño radiante o de fuego (eliges al obtener esta pasiva). Este efecto se acumula hasta 3 veces (para un máximo de +3d6) y dura hasta el final de tu siguiente turno." },

                ],
                imagen: barbaroShurima,
            },
        ],
    },
    shadowisles: {
        nombre: "Shadow Isles",
        color: "#1de9b6",
        estiloTitulo: "bg-gradient-to-b from-[#064e3b] via-[#1de9b6] to-[#042f2e] bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(29,233,182,0.5)] blur-[0.5px]",
        fondo: shadowisles,
        clases: [
            {
                id: "soporte_thresh",
                titulo: "Thresh",
                subtitulo: "THE CHAIN WARDEN",
                descripcion: "A restless spirit who prides himself on tormenting mortals with his ghostly lantern.",
                tags: ["SUPPORT", "TANK"],
                habilidades: [
                    { name: "Death Sentence", desc: "Hooks and pulls enemies." },
                    { name: "The Box", desc: "Creates a prison of walls." }
                ],
                imagen: barbaroShadowIsles,
            },
        ],
    },
    piltover: {
        nombre: "Piltover",
        color: "#49f3ff",
        estiloTitulo: "bg-gradient-to-r from-[#49f3ff] via-white to-[#49f3ff] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(73,243,255,0.8)]",
        fondo: piltover,
        clases: [
            {
                id: "luchador_vi",
                titulo: "Vi",
                subtitulo: "THE PILTOVER ENFORCER",
                descripcion: "Using hextech gauntlets, Vi delivers punches that can shatter walls and criminals alike.",
                tags: ["FIGHTER", "ASSASSIN"],
                habilidades: [
                    { name: "Vault Breaker", desc: "Charges a powerful dash." },
                    { name: "Cease and Desist", desc: "Slams an enemy into the ground." }
                ],
                imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Vi_0.jpg",
            },
        ],
    },
    targon: {
        nombre: "Targon",
        color: "#b7adff", // Un lavanda/azul suave celestial
        estiloTitulo: "bg-gradient-to-b from-white via-[#b7adff] to-[#6d5dfc] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(183,173,255,0.5)]",
        fondo: targon,
        clases: [
            {
                id: "tanque_leona",
                titulo: "Leona",
                subtitulo: "THE RADIANT DAWN",
                descripcion: "Imbued with the fire of the sun, Leona is a holy warrior of the Solari who defends Mount Targon with her Zenith Blade and her Shield of Daybreak.",
                tags: ["TANK", "SUPPORT"],
                habilidades: [
                    { name: "Shield of Daybreak", desc: "Stuns the target with her shield." },
                    { name: "Solar Flare", desc: "Calls down a beam of solar energy to damage and slow/stun enemies." }
                ],
                imagen: barbaroTargon,
            },
        ],
    },
    zaun: {
        nombre: "Zaun",
        color: "#a2ff00", // Verde Químico / Neón
        // Estilo: Degradado de verde ácido a verde oscuro industrial
        estiloTitulo: "bg-gradient-to-b from-[#a2ff00] via-[#4d7c0f] to-[#1a2e05] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(162,255,0,0.7)]",
        fondo: zaun,
        clases: [
            {
                id: "tirador_jinx",
                titulo: "Bárbaro",
                subtitulo: "Quimófogo",
                descripcion: "Productos descontrolados de los laboratorios y callejones de Zaun, los Quimófagos convierten su propio cuerpo en un experimento viviente. Se inyectan poder a costa de su estabilidad, desatando ráfagas de violencia impredecible. Cuanto más se fuerzan, más cerca están de romperse… o de arrasar con todo a su paso. Son bombas de carne y químicos andantes, temidos incluso por otros zaunitas. Recompensa el juego de alto riesgo y la gestión del caos interno.",
                tags: ["Melee"],
                habilidades: [
                    { name: "Passive Race", desc: "Sistema de Sobrecarga: La furia no disminuye fuera de combate si está bajo los efectos de alguna sustancia o en ambiente tóxico. Al entrar en Sobredosis (Rabia), gana bonificación al ataque: +modificador de FUE. Además, cada turno en Sobredosis acumula 1 contador de (Toxicidad). Al final de la Sobredosis, recibe 1d10 de daño necrótico por cada contador de Toxicidad acumulado. Puede elegir no salir de Sobredosis voluntariamente, pero los contadores siguen acumulándose." },
                ],
                imagen: barbaroZaun,
            },
        ],
    },
    bilgewater: {
        nombre: "Bilgewater",
        color: "#00a8ff", // Color de acento: Oro de doblones
        // Estilo: Degradado de azul océano profundo a turquesa oscuro con brillo dorado
        estiloTitulo: "bg-gradient-to-b from-[#00d4ff] via-[#005c7a] to-[#c8aa6e] bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(0,212,255,0.5)]",
        fondo: bilgewater,
        clases: [
            {
                id: "tirador_mf",
                titulo: "Miss Fortune",
                subtitulo: "THE BOUNTY HUNTER",
                descripcion: "A Bilgewater captain famed for her looks but feared for her ruthlessness, Sarah Fortune is a stark figure among the city's hardened criminals.",
                tags: ["MARKSMAN"],
                habilidades: [
                    { name: "Double Up", desc: "Fires a bullet that hits two enemies." },
                    { name: "Bullet Time", desc: "Channels a barrage of bullets in a cone." }
                ],
                imagen: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/MissFortune_0.jpg",
            },
        ],
    },
    ixtal: {
        nombre: "Ixtal",
        color: "#2ecc71", // Color de acento: Verde de la selva
        // Estilo: Degradado de verde claro a verde oscuro con brillo elemental
        estiloTitulo: "bg-gradient-to-b from-[#58d68d] via-[#2ecc71] to-[#1d8348] bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(46,204,113,0.6)]",
        animacionTitulo: "animate-bounce [animation-duration:5s]",
        fondo: ixtal,
        clases: [
            {
                id: "Druida_Ixtal",
                titulo: "Druida",
                subtitulo: "THE BOUNTY HUNTER",
                descripcion: "A Bilgewater captain famed for her looks but feared for her ruthlessness, Sarah Fortune is a stark figure among the city's hardened criminals.",
                tags: ["MARKSMAN"],
                habilidades: [
                    { name: "Double Up", desc: "Fires a bullet that hits two enemies." },
                    { name: "Bullet Time", desc: "Channels a barrage of bullets in a cone." }
                ],
                imagen: druidaixtal,
            },
        ],
    },
};

// --- COMPONENTES DE PARTÍCULAS ---

const seededValue = (index, salt, min = 0, max = 1) => {
    const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
    const normalized = value - Math.floor(value);
    return min + normalized * (max - min);
};

const seededPercent = (index, salt, min = 0, max = 100) => `${seededValue(index, salt, min, max)}%`;

const DemaciaGoldParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(30)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute"
                initial={{ top: "110%", left: seededPercent(i, 1), opacity: 0, scale: seededValue(i, 2, 0.5, 1) }}
                animate={{ top: "-10%", left: seededPercent(i, 3), opacity: [0, 1, 1, 0], rotate: [0, 180, 360] }}
                transition={{ duration: seededValue(i, 4, 10, 25), repeat: Infinity, ease: "easeInOut", delay: seededValue(i, 5, 0, 10) }}
            >
                <div className="w-1 h-3 bg-[#c8aa6e] blur-[0.5px]" style={{ boxShadow: "0 0 15px #c8aa6e, 0 0 30px #ffffff", clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }} />
            </motion.div>
        ))}
    </div>
);

const IoniaFlowerParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute"
                initial={{ top: "-10%", left: seededPercent(i, 6), opacity: 0 }}
                animate={{ top: "110%", left: seededPercent(i, 7, -10, 90), opacity: [0, 0.7, 0.7, 0], rotate: 360 }}
                transition={{ duration: seededValue(i, 8, 10, 20), repeat: Infinity, ease: "linear", delay: seededValue(i, 9, 0, 10) }}
            >
                <div className="w-3 h-4 bg-[#db9ac3] rounded-full blur-[1px] opacity-60" style={{ boxShadow: "0 0 8px #db9ac3", borderRadius: "50% 0% 50% 50%" }} />
            </motion.div>
        ))}
    </div>
);

const NoxusAshParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(25)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-red-700"
                initial={{ bottom: "-10%", left: seededPercent(i, 10), opacity: 0 }}
                animate={{ y: -1000, x: seededValue(i, 11, -50, 50), opacity: [0, 0.8, 0], rotate: 360 }}
                transition={{ duration: seededValue(i, 12, 5, 10), repeat: Infinity, ease: "linear" }}
                style={{ boxShadow: "0 0 8px #ff0000" }}
            />
        ))}
    </div>
);

const FreljordSnowParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(50)].map((_, i) => {
            // Variamos el tamaño para crear profundidad (primer plano y fondo)
            const size = seededValue(i, 110, 2, 6);
            const blur = size > 4 ? "blur(1px)" : "blur(2px)";

            return (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full"
                    initial={{
                        top: "-5%",
                        left: seededPercent(i, 111),
                        opacity: 0,
                        scale: seededValue(i, 112, 0.5, 1.5)
                    }}
                    animate={{
                        y: "110vh",
                        // Movimiento lateral suave y aleatorio (copos meciéndose)
                        x: [0, seededValue(i, 113, -30, 30), 0],
                        opacity: [0, 0.8, 0.8, 0],
                        rotate: [0, 360]
                    }}
                    transition={{
                        duration: seededValue(i, 114, 4, 10), // Caída más lenta que la lluvia
                        repeat: Infinity,
                        ease: "linear",
                        delay: seededValue(i, 115, 0, 10)
                    }}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        filter: blur,
                        boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)"
                    }}
                />
            );
        })}
        {/* Capa de "Viento Gélido" (neblina blanca muy sutil pasando rápido) */}
        <motion.div
            className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent"
            animate={{ x: ['-100%', '100%'], opacity: [0, 0.2, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
    </div>
);

const PiltoverHextechParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(10)].map((_, i) => {
            const size = seededValue(i, 80, 4, 8);
            const horizontal = seededValue(i, 81, 0, 1) > 0.5; // La mitad de las líneas son horizontales

            return (
                <div key={i} className="absolute" style={{ top: seededPercent(i, 82), left: seededPercent(i, 83) }}>
                    {/* El Nodo / Punto de energía */}
                    <motion.div
                        className="rounded-full bg-white absolute"
                        style={{ width: `${size}px`, height: `${size}px`, x: '-50%', y: '-50%' }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                        transition={{ duration: 1, repeat: Infinity, repeatDelay: seededValue(i, 84, 2, 6), delay: seededValue(i, 85, 0, 4) }}
                    />

                    {/* La Línea de circuito que sale del nodo */}
                    <motion.div
                        className="bg-cyan-400 absolute origin-left blur-[0.5px]"
                        style={{
                            width: horizontal ? seededValue(i, 86, 50, 150) + 'px' : '2px',
                            height: horizontal ? '2px' : seededValue(i, 87, 50, 150) + 'px',
                            boxShadow: "0 0 10px #49f3ff",
                            y: '-50%',
                        }}
                        initial={{ scale: 0 }}
                        animate={{ scale: [0, 1, 1, 0], opacity: [0, 1, 1, 0] }}
                        transition={{ duration: 1.2, repeat: Infinity, repeatDelay: seededValue(i, 88, 2, 6), delay: seededValue(i, 89, 0, 4) + 0.2 }} // Un poco después del nodo
                    />
                </div>
            );
        })}
    </div>
);

const ShadowIslesMistParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(10)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-64 h-64 bg-emerald-900/20 rounded-full blur-[80px]"
                initial={{ x: "-10%", y: seededPercent(i, 18) }}
                animate={{ x: "110%" }}
                transition={{ duration: seededValue(i, 19, 20, 40), repeat: Infinity, ease: "linear" }}
            />
        ))}
    </div>
);

const ShurimaSandParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(50)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-1 h-1 bg-yellow-600/60"
                initial={{ left: "-5%", top: seededPercent(i, 20) }}
                animate={{ x: "110vw", y: [0, 20, -20, 0], opacity: [0, 0.8, 0] }}
                transition={{ duration: seededValue(i, 21, 1, 3), repeat: Infinity, ease: "linear" }}
            />
        ))}
    </div>
);

const TargonAetherParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(30)].map((_, i) => {
            const isPurple = seededValue(i, 50, 0, 1) > 0.5;
            return (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    initial={{
                        top: seededPercent(i, 51, 0, 100),
                        left: seededPercent(i, 52, 0, 100),
                        opacity: 0
                    }}
                    animate={{
                        opacity: [0, 1, 0.3, 1, 0], // Efecto de parpadeo estelar
                        scale: [0.5, 1.2, 0.8],
                        y: [-10, -50]
                    }}
                    transition={{
                        duration: seededValue(i, 53, 5, 10),
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    style={{
                        width: isPurple ? '3px' : '2px',
                        height: isPurple ? '3px' : '2px',
                        backgroundColor: isPurple ? '#b7adff' : '#ffffff',
                        boxShadow: isPurple
                            ? '0 0 10px #6d5dfc, 0 0 20px #b7adff'
                            : '0 0 10px #ffffff',
                    }}
                />
            );
        })}
    </div>
);

const ZaunToxicParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(25)].map((_, i) => {
            const size = seededValue(i, 60, 4, 12); // Burbujas más grandes y desiguales
            return (
                <motion.div
                    key={i}
                    className="absolute rounded-full border border-[#a2ff00]/30"
                    initial={{
                        top: "110%", // Salen desde abajo de la pantalla
                        left: seededPercent(i, 61, 0, 100),
                        opacity: 0
                    }}
                    animate={{
                        opacity: [0, 0.6, 0],
                        y: [-20, -1000], // Suben hasta arriba
                        x: [0, seededValue(i, 62, -20, 20), 0], // Oscilan lateralmente (efecto gas)
                        scale: [1, 1.5, 0.8]
                    }}
                    transition={{
                        duration: seededValue(i, 63, 6, 12),
                        repeat: Infinity,
                        delay: seededValue(i, 64, 0, 8),
                        ease: "linear"
                    }}
                    style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        backgroundColor: "rgba(162, 255, 0, 0.1)",
                        boxShadow: "0 0 15px rgba(162, 255, 0, 0.4)",
                        filter: "blur(1px)"
                    }}
                />
            );
        })}
    </div>
);

const BilgewaterRainParticles = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
        {[...Array(60)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute bg-linear-to-b from-transparent via-[#00a8ff]/40 to-white/20"
                style={{
                    width: '1px',
                    height: seededValue(i, 70, 40, 80) + 'px', // Largos variables
                    left: seededPercent(i, 71, 0, 100),
                    top: '-10%',
                }}
                animate={{
                    y: ['0vh', '110vh'],
                    x: ['0px', '-20px'], // Caída diagonal
                }}
                transition={{
                    duration: seededValue(i, 72, 0.6, 1.2), // Caída rápida
                    repeat: Infinity,
                    ease: "linear",
                    delay: seededValue(i, 73, 0, 2),
                }}
            />
        ))}
        {/* Capa de neblina marina ocasional */}
        <motion.div
            className="absolute inset-0 bg-[#001a2c]/20"
            animate={{ opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
        />
    </div>
);

const IxtalLeafParticles = () => {
    // Función auxiliar para valores aleatorios controlados
    const seededValue = (i, seed, min, max) => {
        const val = Math.abs(Math.sin(i * seed)) * (max - min) + min;
        return val;
    };

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {[...Array(30)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        left: seededValue(i, 45, 0, 100) + '%',
                        top: '-5%',
                    }}
                    animate={{
                        y: ['0vh', '105vh'],
                        x: [
                            '0px',
                            `${seededValue(i, 12, 20, 50)}px`,
                            `-${seededValue(i, 15, 20, 50)}px`,
                            '0px'
                        ], // Movimiento de vaivén
                        rotate: [0, 180, 360], // Rotación de la hoja
                    }}
                    transition={{
                        duration: seededValue(i, 88, 6, 12), // Caída mucho más lenta que la lluvia
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: seededValue(i, 23, 0, 10),
                    }}
                >
                    {/* El cuerpo de la hoja */}
                    <div
                        className="opacity-60 shadow-sm"
                        style={{
                            width: seededValue(i, 10, 8, 15) + 'px',
                            height: seededValue(i, 20, 12, 25) + 'px',
                            backgroundColor: i % 2 === 0 ? '#2ecc71' : '#27ae60', // Verdes de Ixtal
                            borderRadius: '100% 0% 100% 0%', // Forma de hoja
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            boxShadow: `0 0 10px ${i % 3 === 0 ? '#f1c40f44' : 'transparent'}`, // Algunas hojas tienen brillo elemental
                        }}
                    />
                </motion.div>
            ))}

            {/* Efecto de polen/magia ambiental de la selva */}
            <motion.div
                className="absolute inset-0 bg-linear-to-b from-[#2ecc71]/5 via-transparent to-transparent"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
        </div>
    );
};

// --- COMPONENTE PRINCIPAL ---

const RunaterraMap = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeRegionKey, setActiveRegionKey] = useState(null);
    const navigate = useNavigate();

    const regionData = activeRegionKey ? DATA_RUNATERRA[activeRegionKey] : null;

    const uiVariants = {
        hidden: { opacity: 0, y: -20 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: { delay: 1.8 + i * 0.2, duration: 0.8, ease: "easeOut" },
        }),
    };

    return (
        
        <div className="relative w-screen h-screen bg-[#010a13] overflow-hidden text-white font-serif selection:bg-[#c8aa6e]/30">
            <AnimatePresence>{!isLoaded && <LoadingScreen />}</AnimatePresence>

            <AnimatePresence>
                {activeRegionKey && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 overflow-y-auto custom-scrollbar pb-32 bg-[#010a13]"
                    >
                        <div className="fixed inset-0 z-0 overflow-hidden">
                            <motion.div
                                initial={{ scale: 1.2, x: "-1%", y: "-1%" }}
                                animate={{ scale: [1.2, 1.1, 1.2], x: ["-1%", "1%", "-1%"], y: ["-1%", "0%", "-1%"] }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="w-[105%] h-[105%] absolute"
                            >
                                <motion.img
                                    key={regionData.fondo}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 0.5 }}
                                    src={regionData.fondo}
                                    className="w-full h-full object-cover grayscale-[0.2] contrast-[1.2] brightness-[0.8]"
                                    alt="Backdrop"
                                />
                            </motion.div>

                            <div className="absolute inset-0 bg-linear-to-b from-[#010a13]/90 via-transparent to-[#010a13]" />

                            {/* Lógica de renderizado de partículas por región */}
                            {activeRegionKey === 'ionia' && <IoniaFlowerParticles />}
                            {activeRegionKey === 'demacia' && <DemaciaGoldParticles />}
                            {activeRegionKey === 'noxus' && <NoxusAshParticles />}
                            {activeRegionKey === 'freljord' && <FreljordSnowParticles />}
                            {activeRegionKey === 'shurima' && <ShurimaSandParticles />}
                            {activeRegionKey === 'shadowisles' && <ShadowIslesMistParticles />}
                            {activeRegionKey === 'piltover' && <PiltoverHextechParticles />}
                            {activeRegionKey === 'targon' && <TargonAetherParticles />}
                            {activeRegionKey === 'zaun' && <ZaunToxicParticles />}
                            {activeRegionKey === 'bilgewater' && <BilgewaterRainParticles />}
                            {activeRegionKey === 'ixtal' && <IxtalLeafParticles />}

                            <AmbientLightParticles color={regionData.color} />
                        </div>

                        <button
                            onClick={() => setActiveRegionKey(null)}
                            className="fixed top-8 right-8 z-130 bg-black/60 border border-[#c8aa6e]/40 p-4 text-[#c8aa6e] hover:text-white transition-all backdrop-blur-md uppercase text-[10px] tracking-[0.3em]"
                        >
                            Volver al mapa ✕
                        </button>

                        {/* Busca esta sección en tu código original y reemplázala */}
                        <div className="h-[70vh] flex flex-col items-center justify-center relative z-10 overflow-hidden">
                            <motion.h1
                                initial={{ y: 50, opacity: 0, scale: 0.8 }}
                                animate={{ y: 0, opacity: 1, scale: 1 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                /* Aplicamos la clase de estilo que definimos arriba */
                                className={`text-9xl font-black italic uppercase tracking-[0.2em] relative z-10 text-center py-4 ${regionData.estiloTitulo}`}
                            >
                                {regionData.nombre}
                            </motion.h1>

                            {/* Línea decorativa que combine con el color de la región */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "24rem" }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="h-0.5 my-6 relative z-10"
                                style={{
                                    background: `linear-gradient(to right, transparent, ${regionData.color}, transparent)`
                                }}
                            />

                            <p className="text-[#c8aa6e] tracking-[0.6em] text-xs uppercase opacity-80 relative z-10">
                                Región de Runaterra
                            </p>
                        </div>

                        <div className="max-w-7xl mx-auto px-6 space-y-24 relative z-10">
                            {regionData.clases.map((clase) => (
                                <ClassSection key={clase.id} clase={clase} regionColor={regionData.color} regionNombre={regionData.nombre} />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <nav className="absolute top-0 left-0 z-40 w-full p-6 pointer-events-none">
                <div className="max-w-7xl mx-auto flex items-center gap-4 pointer-events-none">
                    <motion.h1
                        variants={uiVariants}
                        initial="hidden"
                        animate={isLoaded ? "visible" : "hidden"}
                        className="text-[#c8aa6e] text-4xl tracking-[0.2em] uppercase italic font-black drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]"
                    >
                        Explorador de Runaterra
                    </motion.h1>

                    {isLoaded && !activeRegionKey && (
                        <motion.button
                            onClick={() => navigate('/selectCharacter')}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="pointer-events-auto ml-auto inline-flex items-center gap-3 px-4 py-2 rounded-full bg-linear-to-r from-[#f0e6d2] via-[#c8aa6e] to-[#785a28] text-[#081018] font-semibold uppercase tracking-wider shadow-[0_6px_30px_rgba(200,170,110,0.12)] border border-white/10 backdrop-blur-sm transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 opacity-90">
                                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                            </svg>
                            <span className="text-sm">Mis Personajes</span>
                        </motion.button>
                    )}
                </div>
            </nav>

            <div style={{ width: "100vw", height: "100vh" }}>
                <motion.div
                    initial={{ scale: 1.6, filter: "blur(15px)", opacity: 0 }}
                    animate={{
                        scale: isLoaded ? 1 : 1.6,
                        filter: isLoaded ? (activeRegionKey ? "blur(8px) brightness(0.2)" : "blur(0px) brightness(0.6)") : "blur(15px)",
                        opacity: isLoaded ? 1 : 0
                    }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative w-screen h-screen bg-black"
                >
                    <img
                        src={mapImage}
                        onLoad={() => setIsLoaded(true)}
                        className="w-full h-full object-cover contrast-[1.1]"
                        alt="Mapa"
                    />

                    {isLoaded && (
                        //poner opacity:1 para poder verlo 
                        <motion.div initial={{ opacity: 0 }} animate={{}} transition={{ delay: 1.5 }}>
                            <MapMarker x="57%" y="69%" label="Ixtal" onClick={() => setActiveRegionKey("ixtal")} />
                            <MapMarker x="25%" y="33%" label="Demacia" onClick={() => setActiveRegionKey("demacia")} />
                            <MapMarker x="69%" y="17%" label="Ionia" onClick={() => setActiveRegionKey("ionia")} />
                            <MapMarker x="44%" y="23%" label="Noxus" onClick={() => setActiveRegionKey("noxus")} />
                            <MapMarker x="28%" y="12%" label="Freljord" onClick={() => setActiveRegionKey("freljord")} />
                            <MapMarker x="47%" y="70%" label="Shurima" onClick={() => setActiveRegionKey("shurima")} />
                            <MapMarker x="76%" y="74%" label="Shadow Isles" onClick={() => setActiveRegionKey("shadowisles")} />
                            <MapMarker x="53%" y="45%" label="Piltover" onClick={() => setActiveRegionKey("piltover")} />
                            <MapMarker x="34%" y="73%" label="Targon" onClick={() => setActiveRegionKey("targon")} />
                            <MapMarker x="53%" y="52%" label="Zaun" onClick={() => setActiveRegionKey("zaun")} />
                            <MapMarker x="70%" y="55%" label="Bilgewater" onClick={() => setActiveRegionKey("bilgewater")} />

                        </motion.div>
                    )}
                    <div className="absolute inset-0 pointer-events-none z-10 bg-[radial-gradient(circle,transparent_30%,rgba(0,0,0,0.8)_100%)]" />
                </motion.div>
            </div>
        </div>
    );
};
const ClassSection = ({ clase, regionColor, regionNombre }) => {
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
    const handleSelection = () => {
        // Opcional: puedes pasar la clase elegida a través del estado de la ruta
        navigate('/selector-raza', { state: { selectedClass: clase.titulo, color: regionColor, region: regionNombre } });
    };
    return (
        <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="relative group w-full min-h-175 border border-[#c8aa6e]/20 backdrop-blur-sm overflow-hidden bg-black/30"
        >
            <div className="relative w-full h-full p-12 lg:p-20 flex flex-col justify-end min-h-175">
                {/* Imagen de Fondo y Overlays */}
                <div className="absolute inset-0 z-0">
                    <motion.img
                        src={clase.imagen}
                        initial={{ scale: 1.1 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full object-cover object-top opacity-40 mix-blend-lighten"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#010a13] via-transparent to-transparent z-10" />
                </div>

                {/* Partículas Mágicas */}
                <div className="absolute inset-0 z-5 pointer-events-none">
                    <MagicParticles color={regionColor} />
                </div>

                <div className="relative z-20">
                    <header className="mb-10">
                        <motion.h2
                            animate={{ x: isHovered ? 20 : 0 }}
                            className={`${clase.estiloTitulo} ${clase.animacionTitulo} text-8xl font-black leading-[0.8] mb-6 uppercase italic tracking-tighter transition-all duration-500`}
                            style={{ color: regionColor }}
                        >
                            {clase.titulo}
                        </motion.h2>
                        <p className="text-[#c8aa6e] uppercase tracking-[0.2em] text-sm font-semibold max-w-xl pl-4 border-l-2 border-[#c8aa6e]/50">
                            {clase.subtitulo}
                        </p>

                    </header>

                    {/* Etiquetas (Tags) */}
                    <div className="flex gap-3 mb-12">
                        {clase.tags?.map(tag => (
                            <span key={tag} className="px-4 py-1.5 border border-[#c8aa6e]/20 rounded-sm text-[9px] font-bold tracking-widest text-[#c8aa6e] bg-black/40 uppercase">
                                {tag}
                            </span>

                        ))}

                    </div>

                    <p className="text-[#c8aa6e] uppercase tracking-[0.2em] text-sm font-semibold max-w-xl pl-4 border-l-2 border-[#c8aa6e]/50 mb-4">
                        Available Weapons
                    </p>

                    <div className="flex gap-3 mb-12">
                        {clase.weapons?.map(weapon => (
                            <span key={weapon} className="px-4 py-1.5 border border-[#c8aa6e]/20 rounded-sm text-[9px] font-bold tracking-widest text-[#c8aa6e] bg-black/40 uppercase">
                                {weapon}
                            </span>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-10 border-t border-white/10 items-start">
                        {/* COLUMNA 1: LORE */}
                        <div className="space-y-4">
                            <h4 className="text-white/40 uppercase text-[10px] tracking-widest font-bold">Lore Fragment</h4>
                            <p className="text-gray-200 text-lg leading-relaxed italic font-light">"{clase.descripcion}"</p>
                        </div>

                        {/* COLUMNA 2: HABILIDADES */}
                        <div className="space-y-6">
                            <h4 className="text-white/40 uppercase text-[10px] tracking-widest font-bold">Abilities</h4>
                            <ul className="space-y-4">
                                {clase.habilidades.map((h, i) => (
                                    <li key={i} className="group/skill">
                                        <span className="text-[#c8aa6e] font-bold text-sm block mb-1 uppercase tracking-wider group-hover/skill:text-white transition-colors">
                                            {h.name}
                                        </span>
                                        <span className="text-gray-400 text-sm">{h.desc}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* COLUMNA 3: BOTÓN DE ACCIÓN */}
                        <div className="flex flex-col items-center justify-center gap-6 self-center">
                            <motion.button
                                onMouseEnter={() => setIsHovered(true)}
                                onMouseLeave={() => setIsHovered(false)}
                                // Al hacer clic, enviamos la clase seleccionada al padre
                                onClick={handleSelection}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="relative px-12 py-5 transition-all duration-300 border-2 overflow-hidden group/btn min-w-70 bg-transparent border-[#c8aa6e]/50 text-[#c8aa6e] hover:border-[#c8aa6e] hover:bg-[#c8aa6e]/10 shadow-[0_0_20px_rgba(200,170,110,0.1)]"
                            >
                                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />

                                <span className="relative z-10 font-black uppercase tracking-[0.4em] text-xs">
                                    Seleccionar clase
                                </span>

                                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#c8aa6e]" />
                                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#c8aa6e]" />
                            </motion.button>

                            <span className="text-[9px] text-[#c8aa6e]/60 uppercase tracking-[0.2em] font-bold">
                                Siguiente paso: Selección de linaje
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
};

const MagicParticles = ({ color }) => (
    <div className="absolute inset-0">
        {[...Array(12)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute rounded-full"
                style={{ backgroundColor: color, width: "2px", height: "2px", left: seededPercent(i, 22), top: seededPercent(i, 23) }}
                animate={{ y: [0, -100], opacity: [0, 0.5, 0], scale: [1, 2, 1] }}
                transition={{ duration: seededValue(i, 24, 2, 5), repeat: Infinity, delay: seededValue(i, 25, 0, 5) }}
            />
        ))}
    </div>
);

const AmbientLightParticles = ({ color }) => (
    <div className="absolute inset-0 pointer-events-none z-10">
        {[...Array(15)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute rounded-full blur-[2px]"
                style={{
                    backgroundColor: color,
                    width: `${seededValue(i, 26, 2, 6)}px`,
                    height: `${seededValue(i, 27, 2, 6)}px`,
                    left: seededPercent(i, 28),
                    top: seededPercent(i, 29),
                    boxShadow: `0 0 10px ${color}`,
                }}
                animate={{ y: [0, -150, 0], opacity: [0, 0.3, 0], scale: [1, 1.5, 1] }}
                transition={{ duration: seededValue(i, 30, 10, 20), repeat: Infinity, ease: "easeInOut" }}
            />
        ))}
    </div>
);

const MapMarker = ({ x, y, onClick }) => (
    <motion.div
        className="absolute z-30 cursor-pointer flex flex-col items-center group"
        style={{ left: x, top: y }}
        onClick={onClick}
        whileHover={{ scale: 1.1 }}
    >
        <div className="w-12 h-12 bg-[#010a13] border-2 border-[#c8aa6e] rounded-full flex items-center justify-center relative z-10 shadow-[0_0_15px_rgba(200,170,110,0.8)] group-hover:bg-[#c8aa6e] transition-colors">
            <div className="w-4 h-4 bg-[#c8aa6e] rounded-full group-hover:bg-[#010a13]" />
        </div>

    </motion.div>
);

const LoadingScreen = () => (
    <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-200 bg-[#010a13] flex items-center justify-center">
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 border-2 border-[#c8aa6e]/20 border-t-[#c8aa6e] rounded-full animate-spin mb-4" />
            <p className="text-[#c8aa6e] tracking-[1em] uppercase text-[10px]">Cargando Runaterra...</p>
        </div>
    </motion.div>
);

export default RunaterraMap;