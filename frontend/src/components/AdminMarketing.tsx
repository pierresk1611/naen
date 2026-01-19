import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tag, Percent, Download } from 'lucide-react';
// import { Checkbox } from '@/components/ui/checkbox';

interface Voucher {
    id: number;
    code: string;
    discountValue: number;
    discountType: 'PERCENTAGE' | 'FIXED';
    targetType: 'GLOBAL' | 'PRICE_LEVEL' | 'SPECIFIC_USERS';
    targetPriceLevelId?: number;
    specificUsers?: { id: number; companyName: string }[];
    specificProducts?: { id: number; name: string; sku: string }[];
    isActive: boolean;
}

interface Partner {
    id: number;
    companyName: string;
    email: string;
}

interface Product {
    id: number;
    name: string;
    sku: string;
}

export const AdminMarketing: React.FC = () => {
    // State for new voucher form
    const [code, setCode] = React.useState('');
    const [discount, setDiscount] = React.useState('');
    const [targetType, setTargetType] = React.useState<'PRICE_LEVEL' | 'SPECIFIC_USERS' | 'SPECIFIC_PRODUCTS'>('PRICE_LEVEL');
    const [selectedLevel, setSelectedLevel] = React.useState<number>(1);
    const [selectedPartners, setSelectedPartners] = React.useState<number[]>([]);
    const [selectedProducts, setSelectedProducts] = React.useState<number[]>([]);

    // Fetch Vouchers
    const { data: vouchers } = useQuery<Voucher[]>({
        queryKey: ['vouchers'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/vouchers');
            return res.data;
        }
    });

    // Fetch Partners for selection
    const { data: partners } = useQuery<Partner[]>({
        queryKey: ['partners-list'],
        queryFn: async () => {
            // Mocking partners list if API not ready, or use /users
            return [
                { id: 1, companyName: 'Gastro Palace s.r.o.', email: 'admin@gastro.sk' },
                { id: 2, companyName: 'Elite Wines Bratislava', email: 'vip@wines.sk' },
                { id: 3, companyName: 'Hotel Luxury & Spa', email: 'manager@hotel.sk' },
            ];
        }
    });

    // Fetch Products for selection
    const { data: products } = useQuery<Product[]>({
        queryKey: ['products-list'],
        queryFn: async () => {
            const res = await axios.get('http://localhost:3000/products');
            return res.data;
        }
    });

    const createVoucherMutation = useMutation({
        mutationFn: async () => {
            const payload = {
                code,
                discountValue: parseFloat(discount),
                discountType: 'PERCENTAGE', // Hardcoded for MV
                targetType,
                targetPriceLevelId: targetType === 'PRICE_LEVEL' ? selectedLevel : undefined,
                targetUserIds: targetType === 'SPECIFIC_USERS' ? selectedPartners : undefined,
                targetProductIds: targetType === 'SPECIFIC_PRODUCTS' ? selectedProducts : undefined,
            };
            await axios.post('http://localhost:3000/vouchers', payload);
        },
        onSuccess: () => {
            alert('Kupón bol úspešne vytvorený!');
            setCode('');
            setDiscount('');
            setSelectedPartners([]);
            setSelectedProducts([]);
        }
    });

    const handleTogglePartner = (id: number) => {
        if (selectedPartners.includes(id)) {
            setSelectedPartners(selectedPartners.filter(p => p !== id));
        } else {
            setSelectedPartners([...selectedPartners, id]);
        }
    };

    const handleToggleProduct = (id: number) => {
        if (selectedProducts.includes(id)) {
            setSelectedProducts(selectedProducts.filter(p => p !== id));
        } else {
            setSelectedProducts([...selectedProducts, id]);
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <Badge variant="outline" className="rounded-full border-black/10 text-black/40 font-bold text-[9px] tracking-widest uppercase italic">Campaigns & Promo</Badge>
                    <h2 className="text-6xl font-black uppercase tracking-tighter italic leading-none">Marketing</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CREATE VOUCHER FORM */}
                <Card className="lg:col-span-1 rounded-[2.5rem] border-none shadow-2xl shadow-black/5 bg-white overflow-hidden h-fit">
                    <CardHeader className="bg-black/5 p-8 pb-6">
                        <CardTitle className="text-xl font-black uppercase tracking-tight flex items-center gap-3">
                            <Tag className="h-5 w-5" /> Nový Kupón
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 space-y-6">
                        <div className="space-y-2">
                            <Label className="uppercase text-[10px] font-black tracking-widest opacity-40">Kód Kupónu</Label>
                            <Input
                                placeholder="napr. VALENTIN20"
                                value={code}
                                onChange={e => setCode(e.target.value.toUpperCase())}
                                className="h-12 border-black/10 font-black text-lg uppercase tracking-wider"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="uppercase text-[10px] font-black tracking-widest opacity-40">Zľava (%)</Label>
                            <div className="relative">
                                <Input
                                    type="number"
                                    placeholder="20"
                                    value={discount}
                                    onChange={e => setDiscount(e.target.value)}
                                    className="h-12 border-black/10 font-bold pl-10"
                                />
                                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30" />
                            </div>
                        </div>

                        <div className="space-y-4 pt-4 border-t border-black/5">
                            <Label className="uppercase text-[10px] font-black tracking-widest opacity-40">Cielenie</Label>

                            <Tabs value={targetType} onValueChange={(v) => setTargetType(v as any)} className="w-full">
                                <TabsList className="w-full h-10 bg-black/5 rounded-full p-1">
                                    <TabsTrigger value="PRICE_LEVEL" className="flex-1 rounded-full text-[10px] font-black uppercase tracking-widest">Cenová Hladina</TabsTrigger>
                                    <TabsTrigger value="SPECIFIC_USERS" className="flex-1 rounded-full text-[10px] font-black uppercase tracking-widest">Partneri</TabsTrigger>
                                    <TabsTrigger value="SPECIFIC_PRODUCTS" className="flex-1 rounded-full text-[10px] font-black uppercase tracking-widest">Produkty</TabsTrigger>
                                </TabsList>

                                <TabsContent value="PRICE_LEVEL" className="pt-4 animate-in fade-in">
                                    <div className="space-y-2">
                                        <Label className="text-xs font-bold">Vyberte Hladinu</Label>
                                        <select
                                            className="w-full h-10 px-3 rounded-xl border border-black/10 bg-white text-xs font-bold uppercase"
                                            value={selectedLevel}
                                            onChange={e => setSelectedLevel(parseInt(e.target.value))}
                                        >
                                            <option value={1}>1 - Gastro</option>
                                            <option value={2}>2 - VIP</option>
                                            <option value={3}>3 - Základ</option>
                                        </select>
                                    </div>
                                </TabsContent>

                                <TabsContent value="SPECIFIC_USERS" className="pt-4 animate-in fade-in">
                                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                                        {partners?.map(p => (
                                            <div key={p.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/5 transition-colors cursor-pointer select-none" onClick={() => handleTogglePartner(p.id)}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedPartners.includes(p.id)}
                                                    onChange={() => { }} // Controlled by parent div click
                                                    className="mt-0.5 h-4 w-4 rounded border-black/10 text-primary focus:ring-primary/20 cursor-pointer"
                                                />
                                                <div className="leading-none">
                                                    <div className="font-bold text-xs uppercase">{p.companyName}</div>
                                                    <div className="text-[9px] opacity-40 mt-1">{p.email}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-2 text-right">
                                        <span className="text-[10px] font-bold uppercase opacity-40">{selectedPartners.length} vybraných</span>
                                    </div>
                                </TabsContent>

                                <TabsContent value="SPECIFIC_PRODUCTS" className="pt-4 animate-in fade-in">
                                    <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2">
                                        {products?.map(p => (
                                            <div key={p.id} className="flex items-start gap-3 p-3 rounded-xl hover:bg-black/5 transition-colors cursor-pointer select-none" onClick={() => handleToggleProduct(p.id)}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProducts.includes(p.id)}
                                                    onChange={() => { }} // Controlled by parent div click
                                                    className="mt-0.5 h-4 w-4 rounded border-black/10 text-primary focus:ring-primary/20 cursor-pointer"
                                                />
                                                <div className="leading-none">
                                                    <div className="font-bold text-xs uppercase">{p.name}</div>
                                                    <div className="text-[9px] opacity-40 mt-1">{p.sku}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="pt-2 text-right">
                                        <span className="text-[10px] font-bold uppercase opacity-40">{selectedProducts.length} vybraných</span>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </div>

                        <Button
                            onClick={() => {
                                if (!code || !discount) {
                                    alert('Prosím vyplňte Kód kupónu a Zľavu.');
                                    return;
                                }
                                createVoucherMutation.mutate();
                            }}
                            disabled={createVoucherMutation.isPending}
                            className="w-full h-14 bg-primary text-white hover:bg-primary/90 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20 disabled:opacity-50"
                        >
                            {createVoucherMutation.isPending ? 'Vytváram...' : 'Vytvoriť Kampaň'}
                        </Button>
                    </CardContent>
                </Card>

                {/* ACTIVE VOUCHERS LIST */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-2xl font-black uppercase tracking-tight opacity-30">Aktívne Kampane</h3>
                        <Button variant="outline" className="rounded-full border-black/10 text-[10px] font-black uppercase tracking-widest hover:bg-black hover:text-white">
                            <Download className="h-3 w-3 mr-2" /> Export CSV
                        </Button>
                    </div>

                    <div className="grid gap-4">
                        {vouchers?.map((v) => (
                            <div key={v.id} className="bg-white p-6 rounded-[1.5rem] shadow-sm flex flex-col md:flex-row justify-between md:items-center gap-4 group hover:shadow-md transition-all">
                                <div className="flex items-center gap-6">
                                    <div className="h-16 w-16 bg-black/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                        <Tag className="h-6 w-6 opacity-30 group-hover:text-primary group-hover:opacity-100 transition-all" />
                                    </div>
                                    <div>
                                        <h4 className="text-2xl font-black uppercase tracking-tight">{v.code}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge className="bg-amber-100 text-amber-800 border-none rounded-md px-2 py-0.5 text-[9px] font-black uppercase tracking-widest">
                                                -{v.discountValue}% OFF
                                            </Badge>
                                            <span className="text-[10px] font-bold uppercase opacity-40">
                                                {v.targetType === 'PRICE_LEVEL' ? `Hladina ${v.targetPriceLevelId}` : v.targetType === 'SPECIFIC_USERS' ? `${v.specificUsers?.length || 0} Partnerov` : `${v.specificProducts?.length || 0} Produktov`}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 pl-22 md:pl-0">
                                    <div className="text-right hidden md:block">
                                        <div className="text-[9px] font-bold uppercase opacity-30">Použité</div>
                                        <div className="text-xl font-black">0x</div>
                                    </div>
                                    <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10 uppercase font-bold text-[10px]">
                                        Deaktivovať
                                    </Button>
                                </div>
                            </div>
                        ))}

                        {!vouchers?.length && (
                            <div className="text-center py-20 opacity-30 font-black uppercase tracking-widest text-sm">
                                Žiadne aktívne kampane
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
