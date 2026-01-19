import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Phone, MapPin, Building2, Package, History } from 'lucide-react';
import { Button } from './ui/button';

interface Order {
    id: number;
    totalPrice: string;
    status: string;
    createdAt: string;
    items: any[];
}

export const CustomerAccount: React.FC = () => {
    const { data: orders, isLoading } = useQuery<Order[]>({
        queryKey: ['orders'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3000/orders');
            return response.data;
        },
    });

    const profile = {
        company: 'Gastro Palace s.r.o.',
        contact: 'Jozef Vinár',
        phone: '+421 900 123 456',
        address: 'Vajnorská 42, 831 04 Bratislava',
        level: 'Gold B2B Partner',
    };

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="space-y-4">
                <Badge variant="outline" className="rounded-full border-black/10 text-black/40 font-bold text-[9px] tracking-widest uppercase italic">Partner Dashboard</Badge>
                <h2 className="text-7xl font-black uppercase tracking-tighter italic leading-none">Môj Účet</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Profile Card */}
                <div className="lg:col-span-1 space-y-8">
                    <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-black/5 bg-white overflow-hidden p-10">
                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="h-16 w-16 bg-primary rounded-2xl flex items-center justify-center text-white shadow-xl shadow-primary/20 rotate-3">
                                    <Building2 className="h-8 w-8 -rotate-3" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-black uppercase tracking-tight">{profile.company}</h3>
                                    <Badge className="bg-green-500/10 text-green-600 border-none rounded-full px-3 py-0.5 text-[9px] font-black uppercase tracking-widest mt-1">
                                        {profile.level}
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-6 pt-6 border-t border-black/5">
                                <ProfileItem icon={<User className="h-4 w-4" />} label="Kontaktná osoba" value={profile.contact} />
                                <ProfileItem icon={<Phone className="h-4 w-4" />} label="Telefón" value={profile.phone} />
                                <ProfileItem icon={<MapPin className="h-4 w-4" />} label="Dodacia adresa" value={profile.address} />
                            </div>

                            <Button className="w-full h-14 rounded-2xl border-2 border-black/5 bg-transparent text-black font-black uppercase tracking-widest text-[10px] hover:bg-black hover:text-white transition-all shadow-sm">
                                Upraviť Údaje
                            </Button>
                        </div>
                    </Card>

                    <div className="p-10 rounded-[2.5rem] bg-primary text-white space-y-4 shadow-2xl shadow-primary/20 relative overflow-hidden group">
                        <SparkleDecor />
                        <div className="relative z-10 space-y-2">
                            <h4 className="text-sm font-black uppercase tracking-widest opacity-60">Vernostný Program</h4>
                            <p className="text-4xl font-black tracking-tighter">Gold Partner</p>
                            <p className="text-[10px] font-medium opacity-80 uppercase leading-relaxed pt-2">
                                Dosiahli ste 12% zľavu na všetky tiché vína. Ďalšia úroveň: VIP Partner (+3%).
                            </p>
                        </div>
                    </div>
                </div>

                {/* Orders Archive */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center gap-4 px-2">
                        <History className="h-5 w-5 opacity-40" />
                        <h3 className="text-2xl font-black uppercase tracking-tighter italic">História Objednávok</h3>
                    </div>

                    <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-black/5 bg-white overflow-hidden">
                        <CardContent className="p-0">
                            <Table>
                                <TableHeader className="bg-black/5">
                                    <TableRow className="border-none hover:bg-transparent">
                                        <TableHead className="py-6 px-10 font-black uppercase text-[10px] tracking-widest opacity-40">Číslo</TableHead>
                                        <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest opacity-40">Dátum</TableHead>
                                        <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest opacity-40 text-right">Suma</TableHead>
                                        <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest opacity-40 text-center">Stav</TableHead>
                                        <TableHead className="py-6 px-10"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {isLoading ? (
                                        <TableRow><TableCell colSpan={5} className="h-32 text-center opacity-40">Načítavam históriu...</TableCell></TableRow>
                                    ) : (
                                        orders?.map((order) => (
                                            <TableRow key={order.id} className="border-black/5 hover:bg-primary/5 transition-colors group">
                                                <TableCell className="py-6 px-10 font-mono text-xs font-bold opacity-60">#WEB-{order.id}</TableCell>
                                                <TableCell className="py-6 text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</TableCell>
                                                <TableCell className="py-6 text-right font-black text-lg">
                                                    {parseFloat(order.totalPrice).toFixed(2)} <span className="text-primary italic">€</span>
                                                </TableCell>
                                                <TableCell className="py-6 text-center">
                                                    <Badge className={`
                            rounded-full px-4 py-1 font-black text-[9px] tracking-widest uppercase border-none
                            ${order.status === 'COMPLETED' ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600'}
                          `}>
                                                        {order.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="py-6 px-10 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        className="rounded-full h-10 w-10 p-0 hover:bg-black hover:text-white transition-all group-hover:rotate-12"
                                                    >
                                                        <Package className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

function ProfileItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex gap-4 items-start">
            <div className="mt-1 text-primary/40">{icon}</div>
            <div className="space-y-1">
                <span className="block text-[9px] font-black uppercase tracking-[0.2em] opacity-30 leading-none">{label}</span>
                <span className="block text-sm font-bold text-black/80">{value}</span>
            </div>
        </div>
    )
}

function SparkleDecor() {
    return (
        <div className="absolute top-0 right-0 p-10 opacity-10 pointer-events-none select-none">
            <div className="flex gap-4">
                <div className="h-2 w-2 rounded-full bg-white animate-ping" />
                <div className="h-1 w-1 rounded-full bg-white animate-pulse mt-4" />
                <div className="h-1.5 w-1.5 rounded-full bg-white animate-bounce mt-2" />
            </div>
        </div>
    )
}
