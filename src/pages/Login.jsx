import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
//SD
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Intento de inicio de sesión con Supabase Auth
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        });

        if (error) {
            // Error amigable pero directo
            alert("Error de Acceso: Revisa tu correo o contraseña de invocador.");
            setLoading(false);
        } else {
            // Éxito: El invocador entra en el sistema
            console.log('Sesión iniciada con éxito:', data.user.email);
            navigate('/dashboard'); 
        }
    };

    return (
        <div className="min-h-screen bg-[#010a13] flex items-center justify-center p-6 relative overflow-hidden font-sans">
            
            {/* Velo de Runaterra (Efectos visuales de fondo) */}
            <div className="absolute -left-20 -top-20 w-96 h-96 rounded-full bg-blue-900/10 blur-[120px] pointer-events-none"></div>
            <div className="absolute -right-20 -bottom-20 w-96 h-96 rounded-full bg-cyan-900/10 blur-[120px] pointer-events-none"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md"
            >
                {/* Resplandor áureo exterior */}
                <div className="absolute -inset-0.5 bg-[#c8aa6e]/20 rounded-lg blur-sm"></div>

                <form
                    onSubmit={handleLogin}
                    className="relative bg-[#010a13] border-2 border-[#c8aa6e]/30 p-10 shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col gap-8"
                >
                    {/* Header Estilo Riot Games */}
                    <div className="text-center space-y-2">
                        <h1 className="text-4xl font-serif tracking-tighter text-[#f0e6d2] uppercase italic font-bold">
                            Runaterra <span className="text-[#c8aa6e]">D&D</span>
                        </h1>
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#c8aa6e]"></div>
                            <div className="w-2 h-2 rotate-45 border border-[#c8aa6e] bg-[#010a13]"></div>
                            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#c8aa6e]"></div>
                        </div>
                        <p className="text-[#a09b8c] text-[11px] font-bold tracking-[0.25em] uppercase pt-3 opacity-80">Portal de Invocadores</p>
                    </div>

                    {/* Campos de Entrada */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[#c89b3c] text-[11px] font-bold uppercase tracking-[0.15em] ml-1">Identidad (Email)</label>
                            <input
                                required
                                type="email"
                                placeholder="invocador@ejemplo.com"
                                className="w-full p-3.5 bg-[#1e2328] text-[#f0e6d2] border border-[#3c3c41] focus:border-[#c8aa6e] focus:bg-[#2a2f35] outline-none transition-all duration-300 placeholder:text-[#a09b8c]/20 text-sm"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[#c89b3c] text-[11px] font-bold uppercase tracking-[0.15em] ml-1">Código de Acceso</label>
                            <input
                                required
                                type="password"
                                placeholder="••••••••"
                                className="w-full p-3.5 bg-[#1e2328] text-[#f0e6d2] border border-[#3c3c41] focus:border-[#c8aa6e] focus:bg-[#2a2f35] outline-none transition-all duration-300 placeholder:text-[#a09b8c]/20"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Botón de Acción */}
                    <div className="flex flex-col gap-5 mt-4">
                        <motion.button
                            type="submit"
                            disabled={loading}
                            whileHover={!loading ? { scale: 1.02, backgroundColor: '#1e2328' } : {}}
                            whileTap={!loading ? { scale: 0.98 } : {}}
                            className={`relative group overflow-hidden py-4 border-2 font-bold uppercase text-[13px] tracking-[0.3em] transition-all 
                                ${loading 
                                    ? 'bg-gray-800 border-gray-700 text-gray-500 cursor-wait' 
                                    : 'bg-[#1e2328] border-[#c8aa6e] text-[#c8aa6e] hover:text-[#f0e6d2] shadow-[0_0_20px_rgba(200,170,110,0.1)]'
                                }`}
                        >
                            <span className="relative z-10">{loading ? 'CANALIZANDO...' : 'Entrar en Combate'}</span>
                            
                            {/* Brillo dinámico en hover */}
                            {!loading && <div className="absolute inset-0 bg-[#c8aa6e]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>}
                            
                            {/* Esquinas Hextech */}
                            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t-2 border-l-2 border-[#c8aa6e]"></div>
                            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t-2 border-r-2 border-[#c8aa6e]"></div>
                            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b-2 border-l-2 border-[#c8aa6e]"></div>
                            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b-2 border-r-2 border-[#c8aa6e]"></div>
                        </motion.button>

                        <p className="text-[#a09b8c] text-[10px] text-center font-bold uppercase tracking-widest leading-loose">
                            ¿Aún no tienes cuenta? <br/>
                            <Link to="/avisale-a-sergio" className="text-[#c8aa6e] hover:text-[#f0e6d2] underline underline-offset-4 transition-colors">Solicita tu acceso aquí</Link>
                        </p>
                    </div>
                </form>
            </motion.div>

            {/* Borde de marco cinemático */}
            <div className="absolute inset-0 border-[20px] border-[#c8aa6e]/5 pointer-events-none"></div>
        </div>
    );
};

export default Login;