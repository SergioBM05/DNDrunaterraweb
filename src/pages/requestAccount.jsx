import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AccessRestricted = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#010a13] text-white flex items-center justify-center p-6 overflow-hidden relative">
            
            {/* Efecto de Scanline / Interferencia de fondo */}
            <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
            
            {/* Luces de alarma suaves */}
            <motion.div 
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute inset-0 bg-red-900/10"
            />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full text-center z-10"
            >
                {/* Icono de Bloqueo Estilizado */}
                <div className="relative inline-block mb-8">
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-7xl mb-4"
                    >
                        🔒
                    </motion.div>
                    <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full" />
                </div>

                <h1 className="text-[10px] tracking-[0.8em] text-red-500 uppercase font-black mb-4">
                    Protocolo de Seguridad Activo
                </h1>
                
                <h2 className="text-7xl font-black italic uppercase tracking-tighter mb-6 leading-none">
                    Acceso <br/>
                    <span className="text-white/20 group-hover:text-white transition-colors">Denegado</span>
                </h2>

                <div className="h-[1px] w-24 bg-red-500/50 mx-auto mb-8" />

                <div className="space-y-6">
                    <p className="text-lg text-white/60 font-light italic max-w-md mx-auto leading-relaxed">
                        "Si no te conozco no te hago cuenta bobo"
                    </p>
                    
                    <div className="bg-white/[0.03] border border-white/5 p-6 backdrop-blur-sm">
                        <p className="text-[11px] tracking-[0.3em] uppercase text-white/40 mb-2">Instrucciones de alta</p>
                        <p className="text-xl font-bold text-white uppercase italic">
                            Dile a <span className="text-red-500">el admin todo poderoso </span> que te cree una cuenta
                        </p>
                    </div>
                </div>

                <button 
                    onClick={() => navigate('/')}
                    className="mt-12 text-[10px] font-black uppercase tracking-[0.5em] text-white/30 hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-2"
                >
                    ← Volver al inicio
                </button>
            </motion.div>

            {/* Decoración en las esquinas estilo HUD */}
            <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-white/5" />
            <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-white/5" />
        </div>
    );
};

export default AccessRestricted;