import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
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
import { Users, Building2, Mail, Phone, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Clock, Calendar } from 'lucide-react';

interface Client {
    id: number;
    email: string;
    companyName: string;
    ico: string;
    role: 'CUSTOMER' | 'SUPPLIER';
    priceLevelId?: number;
    suppliedProducts?: { id: number; name: string }[];
    deliveryTimeFrom?: string;
    deliveryTimeTo?: string;
    deliveryDays?: string;
}

interface Product {
    id: number;
    name: string;
    sku: string;
}

export const AdminClients: React.FC = () => {
    const { data: clients, isLoading } = useQuery<Client[]>({
        queryKey: ['clients'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/users');
            return res.data;
        },
    });

    const { data: products } = useQuery<Product[]>({
        queryKey: ['products-list'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/products');
            return res.data;
        }
    });

    const [activeTab, setActiveTab] = React.useState<'CUSTOMER' | 'SUPPLIER'>('CUSTOMER');
    const [isAddPartnerOpen, setIsAddPartnerOpen] = React.useState(false);
    const [newPartner, setNewPartner] = React.useState({
        companyName: '',
        email: '',
        ico: '',
        role: 'CUSTOMER' as 'CUSTOMER' | 'SUPPLIER',
        priceLevelId: 1,
        suppliedProductIds: [] as number[],
        deliveryTimeFrom: '',
        deliveryTimeTo: '',
        deliveryDays: [] as string[]
    });

    const days = ['PO', 'UT', 'ST', 'ŠT', 'PI', 'SO', 'NE'];

    const createPartnerMutation = useMutation({
        mutationFn: async () => {
            const payload = {
                ...newPartner,
                deliveryDays: newPartner.deliveryDays.length > 0 ? newPartner.deliveryDays.join(',') : undefined
            };
            await axios.post('http://localhost:3000/users', payload);
        },
        onSuccess: () => {
            alert('Partner bol úspešne vytvorený!');
            setIsAddPartnerOpen(false);
            setNewPartner({
                companyName: '', email: '', ico: '',
                role: 'CUSTOMER', priceLevelId: 1, suppliedProductIds: [],
                deliveryTimeFrom: '', deliveryTimeTo: '', deliveryDays: []
            });
        }
    });

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <Badge variant="outline" className="rounded-full border-black/10 text-black/40 font-bold text-[9px] tracking-widest uppercase italic">Client Relations</Badge>
                    <h2 className="text-6xl font-black uppercase tracking-tighter italic leading-none">Partneri</h2>

                    <div className="flex bg-black/5 p-1 rounded-full w-fit mt-4">
                        <button
                            onClick={() => setActiveTab('CUSTOMER')}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'CUSTOMER' ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black'}`}
                        >
                            Odberatelia
                        </button>
                        <button
                            onClick={() => setActiveTab('SUPPLIER')}
                            className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'SUPPLIER' ? 'bg-white shadow-sm text-black' : 'text-black/40 hover:text-black'}`}
                        >
                            Dodávatelia
                        </button>
                    </div>
                </div>
                <div className="flex gap-4">
                    <Sheet open={isAddPartnerOpen} onOpenChange={setIsAddPartnerOpen}>
                        <SheetTrigger asChild>
                            <Button className="h-14 bg-primary text-white hover:bg-primary/90 px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex gap-3 shadow-xl shadow-primary/20">
                                <Plus className="h-4 w-4" /> Pridať Partnera
                            </Button>
                        </SheetTrigger>
                        <SheetContent className="w-[400px] sm:w-[540px] bg-[#fbfaf8] overflow-y-auto">
                            <SheetHeader className="mb-8">
                                <SheetTitle className="text-3xl font-black uppercase tracking-tighter">Nový Partner</SheetTitle>
                            </SheetHeader>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="uppercase text-[10px] font-black tracking-widest opacity-40">Názov Spoločnosti</Label>
                                    <Input
                                        value={newPartner.companyName}
                                        onChange={(e) => setNewPartner({ ...newPartner, companyName: e.target.value })}
                                        className="h-12 bg-white border-black/5 font-bold uppercase tracking-tight"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label className="uppercase text-[10px] font-black tracking-widest opacity-40">Typ Partnera</Label>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            variant={newPartner.role === 'CUSTOMER' ? 'default' : 'outline'}
                                            onClick={() => setNewPartner({ ...newPartner, role: 'CUSTOMER' })}
                                            className="flex-1"
                                        >
                                            Odberateľ
                                        </Button>
                                        <Button
                                            type="button"
                                            variant={newPartner.role === 'SUPPLIER' ? 'default' : 'outline'}
                                            onClick={() => setNewPartner({ ...newPartner, role: 'SUPPLIER' })}
                                            className="flex-1"
                                        >
                                            Dodávateľ
                                        </Button>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="uppercase text-[10px] font-black tracking-widest opacity-40">Email</Label>
                                    <Input
                                        value={newPartner.email}
                                        onChange={(e) => setNewPartner({ ...newPartner, email: e.target.value })}
                                        className="h-12 bg-white border-black/5 font-medium"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="uppercase text-[10px] font-black tracking-widest opacity-40">IČO</Label>
                                    <Input
                                        value={newPartner.ico}
                                        onChange={(e) => setNewPartner({ ...newPartner, ico: e.target.value })}
                                        className="h-12 bg-white border-black/5 font-mono"
                                    />
                                </div>

                                {newPartner.role === 'CUSTOMER' ? (
                                    <>
                                        <div className="space-y-2">
                                            <Label className="uppercase text-[10px] font-black tracking-widest opacity-40">Cenová Hladina (Predvolená)</Label>
                                            <select
                                                value={newPartner.priceLevelId}
                                                onChange={(e) => setNewPartner({ ...newPartner, priceLevelId: parseInt(e.target.value) })}
                                                className="w-full h-12 px-3 rounded-md border border-black/5 bg-white text-sm font-bold uppercase"
                                            >
                                                <option value={1}>Gastro Hladina</option>
                                                <option value={2}>VIP Partner</option>
                                                <option value={3}>Základ (MOC)</option>
                                            </select>
                                        </div>

                                        <div className="space-y-4 pt-4 border-t border-black/5">
                                            <Label className="uppercase text-[10px] font-black tracking-widest opacity-40 flex items-center gap-2">
                                                <Clock className="h-3 w-3" /> Závozové Okno
                                            </Label>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <span className="text-[9px] uppercase font-bold opacity-30">Od</span>
                                                    <Input
                                                        type="time"
                                                        value={newPartner.deliveryTimeFrom}
                                                        onChange={(e) => setNewPartner({ ...newPartner, deliveryTimeFrom: e.target.value })}
                                                        className="h-10 bg-white border-black/5"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="text-[9px] uppercase font-bold opacity-30">Do</span>
                                                    <Input
                                                        type="time"
                                                        value={newPartner.deliveryTimeTo}
                                                        onChange={(e) => setNewPartner({ ...newPartner, deliveryTimeTo: e.target.value })}
                                                        className="h-10 bg-white border-black/5"
                                                    />
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <span className="text-[9px] uppercase font-bold opacity-30">Dni závozu</span>
                                                <div className="flex flex-wrap gap-3">
                                                    {days.map(day => (
                                                        <div key={day} className="flex items-center space-x-2">
                                                            <Checkbox
                                                                id={`day-${day}`}
                                                                checked={newPartner.deliveryDays.includes(day)}
                                                                onCheckedChange={(checked) => {
                                                                    if (checked) {
                                                                        setNewPartner(prev => ({ ...prev, deliveryDays: [...prev.deliveryDays, day] }));
                                                                    } else {
                                                                        setNewPartner(prev => ({ ...prev, deliveryDays: prev.deliveryDays.filter(d => d !== day) }));
                                                                    }
                                                                }}
                                                            />
                                                            <label
                                                                htmlFor={`day-${day}`}
                                                                className="text-xs font-bold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                            >
                                                                {day}
                                                            </label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-2">
                                        <Label className="uppercase text-[10px] font-black tracking-widest opacity-40">Dodávané Produkty</Label>
                                        <div className="max-h-[150px] overflow-y-auto border border-black/5 rounded-xl p-2 bg-white">
                                            {products?.map(p => (
                                                <div
                                                    key={p.id}
                                                    onClick={() => {
                                                        const current = newPartner.suppliedProductIds;
                                                        const updated = current.includes(p.id)
                                                            ? current.filter(id => id !== p.id)
                                                            : [...current, p.id];
                                                        setNewPartner({ ...newPartner, suppliedProductIds: updated });
                                                    }}
                                                    className={`
                                                        p-2 rounded-lg text-xs font-bold uppercase cursor-pointer flex justify-between items-center mb-1
                                                        ${newPartner.suppliedProductIds.includes(p.id) ? 'bg-primary/10 text-primary' : 'hover:bg-black/5'}
                                                    `}
                                                >
                                                    <span>{p.name}</span>
                                                    {newPartner.suppliedProductIds.includes(p.id) && <Plus className="h-3 w-3" />}
                                                </div>
                                            ))}
                                        </div>
                                        <div className="text-[9px] font-bold text-right opacity-40">
                                            {newPartner.suppliedProductIds.length} produktov vybraných
                                        </div>
                                    </div>
                                )}
                                <div className="pt-4">
                                    <Button
                                        onClick={() => createPartnerMutation.mutate()}
                                        className="w-full h-14 bg-black text-white hover:bg-primary rounded-xl font-black uppercase tracking-widest text-xs"
                                    >
                                        Vytvoriť Partnera
                                    </Button>
                                    <p className="text-center mt-4 text-[9px] uppercase font-bold opacity-30 tracking-widest">
                                        Partnerovi bude automaticky vygenerované heslo.
                                    </p>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>

                    <Button className="h-14 bg-white border border-black/5 hover:border-black/20 text-black px-8 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all flex gap-3 shadow-sm">
                        <Users className="h-4 w-4" /> Export
                    </Button>
                </div>
            </div>

            <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-black/5 bg-white overflow-hidden">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-black/5">
                            <TableRow className="border-none hover:bg-transparent">
                                <TableHead className="py-8 px-10 font-black uppercase text-[10px] tracking-widest opacity-40">Spoločnosť</TableHead>
                                <TableHead className="py-8 font-black uppercase text-[10px] tracking-widest opacity-40">Kontakt</TableHead>
                                <TableHead className="py-8 font-black uppercase text-[10px] tracking-widest opacity-40">ICO / Identifikátor</TableHead>
                                <TableHead className="py-8 font-black uppercase text-[10px] tracking-widest opacity-40">Závozové Okno</TableHead>
                                <TableHead className="py-8 font-black uppercase text-[10px] tracking-widest opacity-40">
                                    {activeTab === 'CUSTOMER' ? 'Cenová Hladina' : 'Dodávané Produkty'}
                                </TableHead>
                                <TableHead className="py-8 px-10 text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow><TableCell colSpan={6} className="h-32 text-center font-mono text-[10px] uppercase opacity-40">Načítavam zoznam partnerov...</TableCell></TableRow>
                            ) : (
                                clients?.filter(c =>
                                    activeTab === 'CUSTOMER' ? (c.role === 'CUSTOMER' || !c.role) : c.role === 'SUPPLIER'
                                ).map((client) => (
                                    <TableRow key={client.id} className="border-black/5 hover:bg-primary/5 transition-colors group">
                                        <TableCell className="py-8 px-10">
                                            <div className="flex items-center gap-6">
                                                <div className="h-12 w-12 bg-black/5 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                                    <Building2 className="h-5 w-5 opacity-40 group-hover:text-primary group-hover:opacity-100 transition-all" />
                                                </div>
                                                <div className="space-y-1">
                                                    <span className="block font-black uppercase text-sm tracking-tight">{client.companyName}</span>
                                                    <span className="block font-mono text-[9px] font-bold opacity-30 uppercase tracking-[0.2em]">Registrovaný Partner</span>
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-8">
                                            <div className="space-y-1.5 font-bold uppercase text-[10px] tracking-widest leading-none">
                                                <div className="flex items-center gap-2 opacity-50"><Mail className="h-3 w-3" /> {client.email}</div>
                                                <div className="flex items-center gap-2 opacity-30"><Phone className="h-3 w-3" /> +421 9xx xxx xxx</div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-8 font-mono text-xs font-bold opacity-40">{client.ico}</TableCell>
                                        <TableCell className="py-8">
                                            {(client.deliveryTimeFrom || client.deliveryDays) ? (
                                                <div className="space-y-1">
                                                    {client.deliveryDays && (
                                                        <div className="flex gap-1">
                                                            {client.deliveryDays.split(',').map(d => (
                                                                <Badge key={d} variant="outline" className="text-[8px] h-4 px-1 rounded-sm border-primary/20 bg-primary/5 text-primary">
                                                                    {d}
                                                                </Badge>
                                                            ))}
                                                        </div>
                                                    )}
                                                    {(client.deliveryTimeFrom && client.deliveryTimeTo) && (
                                                        <div className="flex items-center gap-1 text-[10px] font-bold opacity-60">
                                                            <Clock className="h-3 w-3" />
                                                            {client.deliveryTimeFrom} - {client.deliveryTimeTo}
                                                        </div>
                                                    )}
                                                </div>
                                            ) : (
                                                <span className="text-[10px] opacity-20 font-bold uppercase">Nenastavené</span>
                                            )}
                                        </TableCell>
                                        <TableCell className="py-8">
                                            {client.role === 'CUSTOMER' || !client.role ? (
                                                <div className="relative group/select">
                                                    <select
                                                        value={client.priceLevelId}
                                                        onChange={(e) => {
                                                            alert(`Cenová hladina pre ${client.companyName} bola zmenená!`);
                                                        }}
                                                        className={`
                                                            appearance-none w-full bg-transparent font-black text-[9px] tracking-widest uppercase cursor-pointer
                                                            py-2 pl-3 pr-8 rounded-full border border-transparent hover:border-black/10 transition-all
                                                            focus:outline-none focus:ring-2 focus:ring-primary/20
                                                            ${client.priceLevelId === 2 ? 'text-amber-700 bg-amber-50' : 'text-black/60 bg-black/5'}
                                                        `}
                                                    >
                                                        <option value={1}>Gastro Hladina</option>
                                                        <option value={2}>VIP Partner</option>
                                                        <option value={3}>Základ (MOC)</option>
                                                        <option value={4}>Premium (Rakúsko)</option>
                                                    </select>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">
                                                        {client.suppliedProducts?.length || 0} Produktov
                                                    </span>
                                                    <div className="flex gap-1 flex-wrap">
                                                        {client.suppliedProducts?.slice(0, 3).map(p => (
                                                            <Badge key={p.id} variant="secondary" className="text-[8px] h-4 px-1 rounded-sm">
                                                                {p.name.substring(0, 15)}...
                                                            </Badge>
                                                        ))}
                                                        {client.suppliedProducts && client.suppliedProducts.length > 3 && (
                                                            <Badge variant="secondary" className="text-[8px] h-4 px-1 rounded-sm">
                                                                +{client.suppliedProducts.length - 3}
                                                            </Badge>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </TableCell>
                                        <TableCell className="py-8 px-10 text-right">
                                            <Button variant="outline" className="rounded-full h-10 px-4 border-black/10 hover:border-black hover:bg-black hover:text-white flex gap-2 font-black uppercase text-[9px] tracking-widest transition-all">
                                                Detail <ExternalLink className="h-3 w-3" />
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
    );
};
