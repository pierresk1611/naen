import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { ArrowRight, Wine, ShieldCheck } from 'lucide-react';

export const LoginForm: React.FC<{ onLogin: (role: 'customer' | 'admin') => void }> = ({ onLogin }) => {
    const [email, setEmail] = React.useState('');
    const [isHovered, setIsHovered] = React.useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email.includes('admin')) {
            onLogin('admin');
        } else {
            onLogin('customer');
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black font-sans">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[20s] ease-linear scale-110"
                style={{
                    backgroundImage: 'url("/assets/login_bg.png")',
                    transform: isHovered ? 'scale(1.05)' : 'scale(1.1)'
                }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/40 to-transparent" />

            {/* Hero Content */}
            <div className="relative z-10 w-full max-w-6xl px-6 grid lg:grid-cols-2 gap-16 items-center">
                <div className="hidden lg:block space-y-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary-foreground">B2B Network Active</span>
                    </div>
                    <h1 className="text-8xl font-black text-white leading-[0.9] tracking-tighter">
                        POCTIVÉ <br />
                        <span className="text-primary italic">VÍNA</span> <br />
                        BEZ KOMPROMISU.
                    </h1>
                    <p className="text-xl text-white/60 max-w-md font-medium leading-relaxed">
                        Vitajte v uzavretej B2B zóne NAEN. Miesto, kde sa remeslo stretáva s modernou logistikou.
                    </p>
                    <div className="flex gap-10 pt-4">
                        <div className="space-y-1">
                            <span className="block text-white font-black text-2xl">400+</span>
                            <span className="block text-white/40 text-[10px] uppercase font-bold tracking-widest">Partnerov</span>
                        </div>
                        <div className="space-y-1">
                            <span className="block text-white font-black text-2xl">Direct</span>
                            <span className="block text-white/40 text-[10px] uppercase font-bold tracking-widest">Distribution</span>
                        </div>
                    </div>
                </div>

                {/* Login Card */}
                <div
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="flex justify-center"
                >
                    <Card className="w-full max-w-md bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-10 shadow-2xl space-y-8">
                        <div className="space-y-2 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center rotate-3 shadow-xl shadow-primary/20">
                                    <Wine className="text-white h-8 w-8 -rotate-3" />
                                </div>
                            </div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tight">Vstúpiť do zóny</h2>
                            <p className="text-white/40 text-sm font-medium tracking-wide">Zadajte svoje prístupové údaje</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">E-mailová adresa</label>
                                    <Input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="email@partner.sk"
                                        className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus:ring-primary focus:border-primary transition-all text-lg"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-white/50 ml-1">Heslo</label>
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="h-14 bg-white/5 border-white/10 text-white placeholder:text-white/20 rounded-xl focus:ring-primary focus:border-primary transition-all text-lg"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-16 bg-primary hover:bg-white hover:text-black text-white rounded-xl font-black uppercase tracking-widest text-lg transition-all duration-300 shadow-lg shadow-primary/20 flex gap-4 group"
                            >
                                Prihlásiť sa
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
                            </Button>
                        </form>

                        <div className="pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-white/30">
                            <span className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Secure SSL</span>
                            <a href="#" className="hover:text-primary transition-colors">Zabudnuté heslo?</a>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Bottom Branding */}
            <div className="absolute bottom-10 left-10 hidden lg:block">
                <div className="flex items-center gap-4 text-white/20">
                    <span className="text-4xl font-black tracking-tighter">NAEN.</span>
                    <div className="h-0.5 w-20 bg-white/10" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em]">Official B2B Channel</span>
                </div>
            </div>
        </div>
    );
};
