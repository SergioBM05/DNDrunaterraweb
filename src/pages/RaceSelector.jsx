import { useState, useEffect, useRef, useCallback, useMemo } from 'react';

// Deterministic pseudo-random helper (pure)
const seededValue = (i, salt = 1, min = 0, max = 1) => {
    const a = 9301, c = 49297, m = 233280;
    let seed = (i + salt) % m;
    seed = (seed * a + c) % m;
    const rnd = seed / m;
    return min + rnd * (max - min);
};

// (seededPercent removed — not used)
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import trol from '../assets/trol.jpg';
import humanoFreljord from '../assets/humanoFreiljord.jpg';
import iceborn from '../assets/iceborn.jpg';

const regionThemes = {
    Demacia: {
        accent: '#d8b56b',
        aura: 'radial-gradient(circle at 50% 0%, rgba(216, 181, 107, 0.15) 0%, transparent 70%)',
        particles: "url('https://www.transparenttextures.com/patterns/natural-paper.png')",
        titleShift: { y: -20, opacity: 0 },
        cardAnimation: { opacity: 0, y: 20 }
    },
    Freljord: {
        accent: '#9fd5ff',
        aura: 'radial-gradient(circle at 50% 50%, rgba(159, 213, 255, 0.1) 0%, transparent 80%)',
        particles: "url('https://www.transparenttextures.com/patterns/stardust.png')",
        titleShift: { x: -30, opacity: 0 },
        cardAnimation: { opacity: 0, x: 30 }
    },
    Noxus: {
        accent: '#ff4646',
        aura: 'radial-gradient(circle at 50% 40%, rgba(255, 70, 70, 0.08) 0%, rgba(0, 0, 0, 0.6) 100%)',
        particles: "url('https://www.transparenttextures.com/patterns/diagmonds-light.png')",
        titleShift: { scale: 0.9, opacity: 0 },
        cardAnimation: { opacity: 0, y: 40 },
        specialStyle: "skew-x-[-3deg]"
    },
    Ionia: {
        accent: '#ff99cc',
        aura: 'radial-gradient(circle at 50% 50%, rgba(255, 153, 204, 0.12) 0%, transparent 75%)',
        particles: "url('https://www.transparenttextures.com/patterns/cloudy-day.png')",
        titleShift: { y: 15, opacity: 0 },
        cardAnimation: { opacity: 0, scale: 0.98 }
    },
    Shurima: {
        accent: '#ffcc33',
        aura: 'linear-gradient(0deg, rgba(255, 204, 51, 0.1) 0%, transparent 100%)',
        particles: "url('https://www.transparenttextures.com/patterns/sandpaper.png')",
        titleShift: { opacity: 0, letterSpacing: "0.5em" },
        cardAnimation: { opacity: 0, filter: "brightness(1.5)" }
    },
    Aguasturbias: {
        accent: '#44ffcc',
        aura: 'radial-gradient(circle at bottom, rgba(68, 255, 204, 0.15) 0%, transparent 60%)',
        particles: "url('https://www.transparenttextures.com/patterns/water.png')",
        titleShift: { rotate: -2, opacity: 0 },
        cardAnimation: { opacity: 0, x: -20 }
    }
};

// --- COMPONENTE DADO 3D ---
const Dice3D = ({ dice, theme }) => {
    const diceSize = 88;
    const half = diceSize / 2;

    // Asignar números a cada cara basado en el valor principal
    // Frente y Atrás siempre suman 7
    const front = dice.value;
    const back = 7 - front;
    
    // Para las otras caras, usamos los números restantes
    const remaining = [1, 2, 3, 4, 5, 6].filter(n => n !== front && n !== back);
    const [top, bottom, left, right] = remaining;

    const faceStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        border: `3px solid ${theme.accent}`,
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '34px',
        fontWeight: 900,
        color: '#111111',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        boxShadow: `inset 0 0 16px ${theme.accent}22, 0 0 18px ${theme.accent}55`,
        textShadow: `0 0 2px rgba(255,255,255,0.65)`
    };

    const finalOrientation = dice.settled ? { x: 0, y: 0, z: 0 } : null;

    if (dice.settled) {
        return (
            <div
                style={{
                    position: 'absolute',
                    left: `${dice.x}px`,
                    top: `${dice.y}px`,
                    width: `${diceSize}px`,
                    height: `${diceSize}px`,
                    borderRadius: '10px',
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(245,245,245,0.96) 100%)',
                    border: `3px solid ${theme.accent}`,
                    boxShadow: `0 0 18px ${theme.accent}55, inset 0 0 14px rgba(255,255,255,0.75)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#111111',
                    fontSize: '34px',
                    fontWeight: 900,
                    transform: 'none'
                }}
            >
                {front}
            </div>
        );
    }

    return (
        <div
            style={{
                position: 'absolute',
                left: `${dice.x}px`,
                top: `${dice.y}px`,
                width: `${diceSize}px`,
                height: `${diceSize}px`,
                perspective: '1500px',
                transformStyle: 'preserve-3d'
            }}
        >
            <div
                style={{
                    width: '100%',
                    height: '100%',
                    transformStyle: 'preserve-3d',
                    transform: finalOrientation
                        ? `rotateX(${finalOrientation.x}deg) rotateY(${finalOrientation.y}deg) rotateZ(${finalOrientation.z}deg)`
                        : `rotateX(${dice.rotationX}deg) rotateY(${dice.rotationY}deg) rotateZ(${dice.rotationZ}deg)`,
                    transition: 'none'
                }}
            >
                {/* Frente (Z positivo) */}
                <div style={{...faceStyle, transform: `translateZ(${half}px)`}}>
                    {front}
                </div>

                {/* Atrás (Z negativo) */}
                <div style={{...faceStyle, transform: `rotateY(180deg) translateZ(${half}px)`}}>
                    {back}
                </div>

                {/* Arriba (Y positivo) */}
                <div style={{...faceStyle, transform: `rotateX(90deg) translateZ(${half}px)`, opacity: 0.95}}>
                    {top}
                </div>

                {/* Abajo (Y negativo) */}
                <div style={{...faceStyle, transform: `rotateX(-90deg) translateZ(${half}px)`, opacity: 0.95}}>
                    {bottom}
                </div>

                {/* Izquierda (X negativo) */}
                <div style={{...faceStyle, transform: `rotateY(-90deg) translateZ(${half}px)`, opacity: 0.95}}>
                    {left}
                </div>

                {/* Derecha (X positivo) */}
                <div style={{...faceStyle, transform: `rotateY(90deg) translateZ(${half}px)`, opacity: 0.95}}>
                    {right}
                </div>
            </div>
        </div>
    );
};

// --- Partículas por región (ambientales) ---
const FreljordSnowParticles = () => {
    const specs = useMemo(() => Array.from({ length: 40 }).map((_, i) => {
        const size = seededValue(i, 101, 2, 8);
        const left = seededValue(i, 102, 0, 100);
        const delay = seededValue(i, 103, 0, 6);
        const duration = seededValue(i, 104, 6, 12);
        const scale = seededValue(i, 105, 0.5, 1.7);
        const sway = seededValue(i, 106, -30, 30);
        return { size, left, delay, duration, scale, sway };
    }), []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {specs.map((s, i) => (
                <motion.div
                    key={i}
                    className="absolute bg-white rounded-full"
                    initial={{ top: '-5%', left: `${s.left}%`, opacity: 0, scale: s.scale }}
                    animate={{ y: '110vh', x: [0, s.sway, 0], opacity: [0, 0.8, 0.8, 0], rotate: [0, 360] }}
                    transition={{ duration: s.duration, repeat: Infinity, ease: 'linear', delay: s.delay }}
                    style={{ width: `${s.size}px`, height: `${s.size}px`, filter: s.size > 4 ? 'blur(1px)' : 'blur(2px)', boxShadow: '0 0 8px rgba(255,255,255,0.6)' }}
                />
            ))}
            <motion.div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent" animate={{ x: ['-100%', '100%'], opacity: [0, 0.2, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
        </div>
    );
};

const ShurimaSandParticles = () => {
    const specs = useMemo(() => Array.from({ length: 40 }).map((_, i) => {
        const size = seededValue(i, 201, 1, 6);
        const left = seededValue(i, 202, 0, 100);
        const delay = seededValue(i, 203, 0, 4);
        const duration = seededValue(i, 204, 3, 8);
        const hue = seededValue(i, 205, 40, 60);
        const scale = seededValue(i, 206, 0.4, 1.5);
        const sway = seededValue(i, 207, -20, 20);
        return { size, left, delay, duration, hue, scale, sway };
    }), []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {specs.map((s, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    initial={{ top: '-10%', left: `${s.left}%`, opacity: 0, scale: s.scale }}
                    animate={{ y: '90vh', x: [0, s.sway, 0], opacity: [0, 0.85, 0] }}
                    transition={{ duration: s.duration, repeat: Infinity, ease: 'linear', delay: s.delay }}
                    style={{ width: `${s.size}px`, height: `${s.size}px`, background: `rgba(${s.hue},150,60,0.95)`, boxShadow: '0 0 10px rgba(255,200,120,0.6)', filter: 'blur(0.6px)' }}
                />
            ))}
        </div>
    );
};

const AguasturbiasWaterParticles = () => {
    const specs = useMemo(() => Array.from({ length: 30 }).map((_, i) => {
        const size = seededValue(i, 301, 2, 10);
        const left = seededValue(i, 302, 0, 100);
        const delay = seededValue(i, 303, 0, 5);
        const duration = seededValue(i, 304, 2, 6);
        const scale = seededValue(i, 305, 0.6, 1.8);
        const sway = seededValue(i, 306, -18, 18);
        return { size, left, delay, duration, scale, sway };
    }), []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
            {specs.map((s, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    initial={{ top: '-5%', left: `${s.left}%`, opacity: 0, scale: s.scale }}
                    animate={{ y: '95vh', x: [0, s.sway, 0], opacity: [0, 0.9, 0] }}
                    transition={{ duration: s.duration, repeat: Infinity, ease: 'linear', delay: s.delay }}
                    style={{ width: `${s.size}px`, height: `${s.size}px`, background: 'rgba(100,230,220,0.9)', boxShadow: '0 0 12px rgba(100,230,220,0.5)', filter: 'blur(0.4px)' }}
                />
            ))}
        </div>
    );
};

const RegionParticles = ({ region }) => {
    switch ((region || '').toLowerCase()) {
        case 'freljord': return <FreljordSnowParticles />;
        case 'shurima': return <ShurimaSandParticles />;
        case 'aguasturbias': return <AguasturbiasWaterParticles />;
        default: return null;
    }
};

// --- NUEVO COMPONENTE: DADOS CON FÍSICA ---
const DiceOverlay = ({ isRolling, theme, diceCount = 4, rolledValues = [], rolledTotal = null, notification, region = 'Demacia' }) => {
    const [dices, setDices] = useState([]);
    const [particles, setParticles] = useState([]);
    const animationFrameRef = useRef(null);
    const diceSize = 88;
    const radius = diceSize / 2;

    const particleColorForRegion = useCallback((r) => {
        switch ((r || '').toLowerCase()) {
            case 'shurima': return '#f5c65f';
            case 'freljord': return '#e6f2ff';
            case 'aguasturbias': return '#67f6e9';
            case 'demacia': return '#ffd88f';
            case 'noxus': return '#ff7b7b';
            case 'ionia': return '#f9b3ff';
            default: return theme.accent || '#ffffff';
        }
    }, [theme.accent]);

    const spawnParticles = (x, y, color, count = 6) => {
        const now = Date.now();
        const created = Array.from({ length: count }).map((_, i) => ({
            id: `${now}_${Math.random().toString(36).slice(2, 9)}_${i}`,
            x: x + (Math.random() - 0.5) * 12,
            y: y + (Math.random() - 0.5) * 12,
            dx: (Math.random() - 0.5) * 30,
            dy: -5 - Math.random() * 40,
            duration: 0.45 + Math.random() * 0.6,
            delay: Math.random() * 0.06,
            size: 4 + Math.random() * 6,
            color
        }));
        setParticles(prev => [...prev, ...created]);
    };

    const removeParticle = (id) => setParticles(prev => prev.filter(p => p.id !== id));

    useEffect(() => {
        if (!isRolling && dices.length === 0) return;

        if (isRolling) {
            // Crear dados iniciales
            const newDices = Array.from({ length: diceCount }, (_, i) => ({
                id: Date.now() + i,
                x: Math.random() * (window.innerWidth - 240) + 120,
                y: Math.random() * 30,
                vx: (Math.random() - 0.5) * 9,
                vy: Math.random() * 4 + 5,
                rotationX: Math.random() * 360,
                rotationY: Math.random() * 360,
                rotationZ: Math.random() * 360,
                rotationSpeedX: (Math.random() - 0.5) * 8,
                rotationSpeedY: (Math.random() - 0.5) * 8,
                rotationSpeedZ: (Math.random() - 0.5) * 6,
                value: rolledValues[i] ?? Math.floor(Math.random() * 6) + 1,
                settled: false
            }));
            requestAnimationFrame(() => setDices(newDices));
        }

        const gravity = 0.4;
        const friction = 0.988;
        const bounceDampen = 0.68;
        const minVelocity = 0.1;
        const boardPaddingX = 110;
        const boardPaddingTop = 70;
        const boardPaddingBottom = 70;
        const groundLevel = window.innerHeight - boardPaddingBottom - diceSize;
        const leftBound = boardPaddingX;
        const rightBound = window.innerWidth - boardPaddingX - diceSize;
        const topBound = boardPaddingTop;
        const collisionThreshold = diceSize - 8;

        const resolveDiceCollisions = (nextDices) => {
            for (let i = 0; i < nextDices.length; i += 1) {
                for (let j = i + 1; j < nextDices.length; j += 1) {
                    const first = nextDices[i];
                    const second = nextDices[j];
                    const dx = (first.x + radius) - (second.x + radius);
                    const dy = (first.y + radius) - (second.y + radius);
                    const distance = Math.hypot(dx, dy);

                    if (distance === 0 || distance >= collisionThreshold) continue;

                    const overlap = collisionThreshold - distance;
                    const nx = dx / distance;
                    const ny = dy / distance;

                    first.x += nx * (overlap / 2);
                    first.y += ny * (overlap / 2);
                    second.x -= nx * (overlap / 2);
                    second.y -= ny * (overlap / 2);

                    const relativeVelocityX = first.vx - second.vx;
                    const relativeVelocityY = first.vy - second.vy;
                    const impactSpeed = relativeVelocityX * nx + relativeVelocityY * ny;

                    if (impactSpeed < 0) {
                        const impulse = -impactSpeed * 0.9;
                        first.vx += impulse * nx;
                        first.vy += impulse * ny;
                        second.vx -= impulse * nx;
                        second.vy -= impulse * ny;

                        first.rotationSpeedX += relativeVelocityY * 0.08;
                        first.rotationSpeedY += relativeVelocityX * 0.08;
                        second.rotationSpeedX -= relativeVelocityY * 0.08;
                        second.rotationSpeedY -= relativeVelocityX * 0.08;

                        // Partículas en colisión entre dados
                        try {
                            const midX = (first.x + second.x) / 2 + radius;
                            const midY = (first.y + second.y) / 2 + radius;
                            const pColor = particleColorForRegion(region);
                            spawnParticles(midX, midY, pColor, Math.min(10, Math.ceil(impulse * 3)));
                        } catch (err) { console.debug(err) }
                    }
                }
            }
            return nextDices;
        };

        const animate = () => {
            setDices(prevDices => {
                const updated = prevDices.map(dice => {
                    let { x, y, vx, vy, rotationX, rotationY, rotationZ, rotationSpeedX, rotationSpeedY, rotationSpeedZ, settled } = dice;

                    if (!settled) {
                        vy += gravity;
                        x += vx;
                        y += vy;
                        rotationX += rotationSpeedX;
                        rotationY += rotationSpeedY;
                        rotationZ += rotationSpeedZ;

                        vx *= friction;
                        vy *= friction;
                        rotationSpeedX *= friction;
                        rotationSpeedY *= friction;
                        rotationSpeedZ *= friction;

                        if (y >= groundLevel) {
                            y = groundLevel;
                            vy *= -bounceDampen;

                            // Si la velocidad es muy pequeña, detener
                            if (
                                Math.abs(vy) < minVelocity &&
                                Math.abs(vx) < minVelocity &&
                                Math.abs(rotationSpeedX) < 0.2 &&
                                Math.abs(rotationSpeedY) < 0.2 &&
                                Math.abs(rotationSpeedZ) < 0.2
                            ) {
                                vy = 0;
                                vx = 0;
                                rotationSpeedX = 0;
                                rotationSpeedY = 0;
                                rotationSpeedZ = 0;
                                settled = true;
                            }

                            // Generar partículas al rebotar contra el suelo
                            if (!settled && Math.abs(vy) > 1) {
                                try {
                                    const pColor = particleColorForRegion(region);
                                    spawnParticles(x + radius, y + radius, pColor, 8);
                                } catch (err) { console.debug(err) }
                            }
                        }

                        if (x <= leftBound) {
                            x = leftBound;
                            vx = Math.abs(vx) * bounceDampen;
                        }
                        if (x >= rightBound) {
                            x = rightBound;
                            vx = -Math.abs(vx) * bounceDampen;
                        }

                        // Colisión con el techo
                        if (y <= topBound) {
                            y = topBound;
                            vy = Math.abs(vy) * bounceDampen;
                        }
                    }

                    return { ...dice, x, y, vx, vy, rotationX, rotationY, rotationZ, rotationSpeedX, rotationSpeedY, rotationSpeedZ, settled };
                });

                return resolveDiceCollisions(updated);
            });

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isRolling, diceCount, rolledValues, dices.length, radius, particleColorForRegion, region]);

    return (
        <AnimatePresence>
            {dices.length > 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-300 pointer-events-none"
                >
                    {/* Fondo de enfoque */}
                    {isRolling && <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />}

                    {/* Renderizar dados 3D */}
                    {dices.map(dice => (
                        <Dice3D key={dice.id} dice={dice} theme={theme} />
                    ))}

                    {/* Partículas de estallido (burbujas, arena, chispas) */}
                    {particles.map(p => (
                        <motion.div
                            key={p.id}
                            initial={{ left: p.x, top: p.y, opacity: 1, scale: 1 }}
                            animate={{ left: p.x + p.dx, top: p.y + p.dy, opacity: 0, scale: 0.6 }}
                            transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
                            onAnimationComplete={() => removeParticle(p.id)}
                            style={{
                                position: 'absolute',
                                width: `${p.size}px`,
                                height: `${p.size}px`,
                                background: p.color,
                                borderRadius: '50%',
                                pointerEvents: 'none',
                                transform: 'translate(-50%, -50%)',
                                filter: 'blur(0.2px)'
                            }}
                        />
                    ))}

                    {/* Partículas ambientales por región (lluvia/nieve/arena) */}
                    {isRolling && <RegionParticles region={region} />}

                    {notification && (
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed top-8 left-1/2 -translate-x-1/2 bg-black/80 border border-white/15 px-5 py-3 rounded-full text-white shadow-[0_0_30px_rgba(0,0,0,0.55)] backdrop-blur-md"
                        >
                            <div className="flex items-center gap-4">
                                <div>
                                    <div className="text-[10px] uppercase tracking-[0.35em] text-white/50">Tirada</div>
                                    <div className="text-xl font-black italic" style={{ color: theme.accent }}>
                                        {rolledTotal ?? '-'}
                                    </div>
                                </div>
                                
                            </div>
                        </motion.div>
                    )}

                    {isRolling && (
                        <motion.p
                            animate={{ y: [0, 5, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 0.5 }}
                            className="fixed bottom-20 left-1/2 -translate-x-1/2 text-[10px] font-black uppercase tracking-[0.4em] text-white pointer-events-none"
                        >
                            Tirando Dados...
                        </motion.p>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- COMPONENTE MODAL DE CREACIÓN ---
const CharacterModal = ({ isOpen, onClose, race, theme, charClass, region = 'Demacia' }) => {
    const [stats, setStats] = useState({ FUE: '--', DES: '--', CON: '--', INT: '--', SAB: '--', CAR: '--' });
    const [isRolling, setIsRolling] = useState(false);
    const [lore, setLore] = useState("");
    const [lastRolledValues, setLastRolledValues] = useState([]);
    const [lastRolledTotal, setLastRolledTotal] = useState(null);
    const [rollNotification, setRollNotification] = useState("");

    const rollStat = (statName) => {
        if (isRolling) return;
        
        setIsRolling(true);
        
        // Calcular el valor ANTES de mostrar los dados
        const rolls = Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1);
        const total = rolls.reduce((a, b) => a + b, 0);
        
        // Mostrar el dado con el valor correcto
        setLastRolledValues(rolls);
        setLastRolledTotal(total);
        setRollNotification(`${rolls.join(' + ')} = ${total}`);
        
        // El dado se muestra durante 900ms
        setTimeout(() => {
            setStats(prev => ({ ...prev, [statName]: total }));
            setIsRolling(false);
            setLastRolledValues([]);
        }, 900);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* EL DADO FÍSICO */}
                    <DiceOverlay 
                        isRolling={isRolling} 
                        theme={theme}
                        rolledValues={lastRolledValues}
                        rolledTotal={lastRolledTotal}
                        notification={rollNotification}
                        region={region}
                    />

                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />
                    
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 40 }}
                        className="relative w-full max-w-5xl bg-[#0a0e13] border border-white/10 h-[90vh] md:h-[80vh] overflow-hidden flex flex-col md:flex-row shadow-2xl"
                    >
                        {/* Columna Visual */}
                        <div className="w-full md:w-2/5 relative border-r border-white/5 bg-black">
                            <img src={race.img} className="absolute inset-0 w-full h-full object-cover opacity-50" alt={race.name} />
                            <div className="absolute inset-0 bg-linear-to-t from-[#0a0e13] via-transparent to-transparent" />
                            <div className="relative h-full p-10 flex flex-col justify-end">
                                <span className="text-[10px] tracking-[0.5em] text-white/40 uppercase mb-2">Ficha de Héroe</span>
                                <h2 className="text-5xl font-black italic uppercase text-white tracking-tighter leading-none">{race.name}</h2>
                                <p className="text-xl italic font-light mt-2" style={{ color: theme.accent }}>{charClass}</p>
                            </div>
                        </div>

                        {/* Columna de Datos */}
                        <div className="flex-1 p-8 md:p-12 overflow-y-auto bg-[#0a0e13] custom-scrollbar">
                            <button onClick={handleClose} className="absolute top-6 right-8 text-white/20 hover:text-white transition-colors text-2xl z-50">✕</button>
                            
                            <section className="mb-12">
                                <div className="flex justify-between items-end mb-8">
                                    <h3 className="text-[11px] tracking-[0.4em] text-white/60 uppercase font-bold">Atributos Base</h3>
                                    <span className="text-[9px] text-white/20 uppercase italic">Haz clic en el dado</span>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {Object.keys(stats).map((s) => (
                                        <div key={s} className="bg-white/5 border border-white/10 p-4 relative group overflow-hidden">
                                            <p className="text-[10px] text-white/40 font-bold mb-1 tracking-widest">{s}</p>
                                            <div className="flex items-center justify-between">
                                                <motion.span 
                                                    key={stats[s]}
                                                    initial={{ y: 10, opacity: 0 }}
                                                    animate={{ y: 0, opacity: 1 }}
                                                    className="text-3xl font-black text-white italic"
                                                >
                                                    {stats[s]}
                                                </motion.span>
                                                <button 
                                                    disabled={isRolling}
                                                    onClick={() => rollStat(s)}
                                                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-all text-sm
                                                        ${isRolling ? 'opacity-20' : 'bg-white/5 hover:bg-white hover:text-black hover:scale-110 active:scale-95'}`}
                                                >
                                                    🎲
                                                </button>
                                            </div>
                                            <div className="absolute bottom-0 left-0 h-px bg-white/5 w-full group-hover:bg-white/20 transition-colors" />
                                        </div>
                                    ))}
                                </div>
                            </section>

                            <section className="mb-10">
                                <h3 className="text-[11px] tracking-[0.4em] text-white/60 uppercase font-bold mb-6">Trasfondo y Motivación</h3>
                                <textarea 
                                    value={lore}
                                    onChange={(e) => setLore(e.target.value)}
                                    placeholder="Nací en las fronteras de mi región..."
                                    className="w-full bg-white/5 border border-white/10 p-6 text-gray-300 italic font-light min-h-45 focus:outline-none focus:border-white/30 transition-all resize-none"
                                />
                            </section>

                            <button className="w-full py-5 border-2 font-black uppercase tracking-[0.4em] text-[12px] transition-all hover:bg-white hover:text-black group relative overflow-hidden" style={{ borderColor: theme.accent, color: theme.accent }}>
                                <span className="relative z-10 group-hover:text-black transition-colors">Forjar Destino</span>
                                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

// --- COMPONENTE PRINCIPAL ---
const RaceSelector = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRace, setSelectedRace] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();

    const { selectedClass, color, region } = location.state || {
        selectedClass: "Guerrero",
        color: "#c8aa6e",
        region: "Demacia"
    };

    const theme = regionThemes[region] || regionThemes.Demacia;

    const racesByRegion = {
        "Demacia": [
            { id: 'humano', name: 'Humano', desc: 'Justicia y honor sobre todas las cosas.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Garen_0.jpg' },
            { id: 'mageBorn', name: 'Mageborn', desc: 'Magia oculta tras muros de petricita.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Lux_0.jpg' },
            { id: 'petricitas', name: 'Constructo', desc: 'La piedra viva que consume la magia.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Galio_0.jpg' }
        ],
        "Freljord": [
            { id: 'humano', name: 'Humano', desc: 'Supervivientes natos de las tribus del norte.', img: humanoFreljord },
            { id: 'iceborn', name: 'Hijo del Hielo', desc: 'Sangre bendecida por el frío eterno.', img: iceborn },
            { id: 'troll', name: 'Troll', desc: 'Gigantes brutales de los pasos helados.', img: trol },
            { id: 'ursino', name: 'Ursino', desc: 'Guerreros ferales bendecidos por el rayo.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Volibear_0.jpg' }
        ],
        "Noxus": [
            { id: 'humano', name: 'Legionario', desc: 'La fuerza es la única moneda en Noxus.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg' },
            { id: 'minotauro', name: 'Minotauro', desc: 'Poder bruto al servicio del imperio.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Alistar_4.jpg' },
            { id: 'muerto', name: 'No-Muerto', desc: 'Soldados que no conocen el descanso.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sion_0.jpg' }
        ],
        "Ionia": [
            { id: 'vastaya', name: 'Vastaya', desc: 'Herederos de la magia natural.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg' },
            { id: 'humano', name: 'Monje', desc: 'Buscadores del equilibrio espiritual.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg' }
        ],
        "Shurima": [
            { id: 'ascendido', name: 'Ascendido', desc: 'Semidioses del disco solar.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Azir_0.jpg' },
            { id: 'humano', name: 'Nómada', desc: 'Supervivientes de las dunas eternas.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Sivir_0.jpg' }
        ],
        "Aguasturbias": [
            { id: 'humano', name: 'Pirata', desc: 'Buscafortunas de la bahía.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Gangplank_0.jpg' },
            { id: 'monstruo', name: 'Hundido', desc: 'Cazadores del mar profundo.', img: 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Pyke_0.jpg' }
        ]
    };

    const currentRaces = racesByRegion[region] || [];

    const handleOpenModal = (race) => {
        setSelectedRace(race);
        setIsModalOpen(true);
    };

    return (
        <div className="relative min-h-screen bg-[#010a13] p-10 flex flex-col items-center overflow-x-hidden">
            <CharacterModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
                race={selectedRace || {}} 
                theme={theme}
                charClass={selectedClass}
                region={region}
            />

            <div className="fixed inset-0 z-0 opacity-10 pointer-events-none" style={{ backgroundImage: theme.particles }} />
            <motion.div className="fixed inset-0 z-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: theme.aura }} />

            <header className="relative z-10 w-full max-w-7xl flex justify-between items-start mb-20">
                <button onClick={() => navigate(-1)} className="group flex items-center gap-2 uppercase tracking-[0.3em] text-[10px] font-bold transition-all" style={{ color: theme.accent }}>
                    <span className="group-hover:-translate-x-1 transition-transform italic text-lg">←</span> 
                    Expedición {region}
                </button>
                <div className="text-right">
                    <h3 className="text-4xl font-black italic uppercase tracking-tighter" style={{ color: color || theme.accent }}>
                        {selectedClass}
                    </h3>
                    <p className="text-[10px] text-white/40 uppercase tracking-[0.4em]">Ficha de Personaje</p>
                </div>
            </header>

            <div className="relative z-10 text-center mb-20">
                <motion.h2
                    initial={theme.titleShift}
                    animate={{ y: 0, x: 0, scale: 1, opacity: 1, rotate: 0, letterSpacing: 'normal' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className={`text-8xl font-black text-white uppercase italic tracking-tighter mb-2 ${theme.specialStyle || ""}`}
                >
                    Elige tu <span style={{ color: theme.accent }}>Linaje</span>
                </motion.h2>
                <p className="text-white/20 text-[11px] uppercase tracking-[0.6em]">Archivos de Runaterra</p>
            </div>

            <div className="relative z-10 w-full max-w-6xl flex flex-col gap-10">
                {currentRaces.map((race, index) => (
                    <motion.div
                        key={race.id}
                        onClick={() => handleOpenModal(race)}
                        initial={theme.cardAnimation}
                        whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "brightness(1)" }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{ delay: index * 0.1, duration: 0.7 }}
                        className="relative group w-full h-120 cursor-pointer overflow-hidden border border-white/5 bg-[#020c16]/60 backdrop-blur-sm shadow-2xl"
                    >
                        <div className="absolute inset-0">
                            <motion.img 
                                src={race.img} 
                                className="w-full h-full object-cover object-[center_20%] opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#010a13] via-[#010a13]/40 to-transparent" />
                        </div>

                        <div className="relative h-full p-16 flex flex-col justify-end">
                            <div className={`max-w-2xl transform group-hover:translate-x-4 transition-transform duration-500 ${theme.specialStyle || ""}`}>
                                <span className="text-[10px] font-bold text-white/40 mb-3 tracking-[0.5em] uppercase block">
                                    Raza de {region}
                                </span>
                                <h4 className="text-7xl font-black text-white uppercase italic tracking-tighter mb-4">
                                    {race.name}
                                </h4>
                                <p className="text-gray-300 text-lg max-w-md font-light italic mb-8 border-l-2 pl-6" style={{ borderColor: theme.accent }}>
                                    {race.desc}
                                </p>
                                <div className="w-32 h-0.5 bg-white/10 relative overflow-hidden">
                                    <motion.div className="absolute inset-0" style={{ backgroundColor: theme.accent }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} transition={{ duration: 1, delay: 0.4 }} />
                                </div>
                            </div>
                        </div>

                        <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none"
                             style={{ background: `radial-gradient(circle at center, ${theme.accent}, transparent)` }} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default RaceSelector;