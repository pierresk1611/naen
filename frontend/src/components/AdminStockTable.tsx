import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/lib/api';
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
import { Package, AlertCircle, TrendingUp, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Product {
    id: number;
    sku: string;
    name: string;
    stockKros: number;
    prices: { price: number }[];
}

export const AdminStockTable: React.FC = () => {
    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await api.get('/products');
            return response.data;
        },
    });

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <Badge variant="outline" className="rounded-full border-black/10 text-black/40 font-bold text-[9px] tracking-widest uppercase">Inventory Control</Badge>
                    <h2 className="text-6xl font-black uppercase tracking-tighter italic">Sklad & Ceny</h2>
                </div>
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-20" />
                    <Input
                        placeholder="Hľadať produkt alebo SKU..."
                        className="h-14 pl-12 bg-white border-black/5 rounded-2xl focus:ring-primary focus:border-primary transition-all shadow-sm"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatCard label="Celkový Sklad" value={`${products?.reduce((acc, p) => acc + p.stockKros, 0) || 0} ks`} icon={<Package className="h-5 w-5" />} />
                <StatCard label="Kritické Zásoby" value={`${products?.filter(p => p.stockKros < 12).length || 0} položiek`} icon={<AlertCircle className="h-5 w-5" />} highlight />
                <StatCard label="Aktívne SKU" value={`${products?.length || 0}`} icon={<TrendingUp className="h-5 w-5" />} />
            </div>

            <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-black/5 overflow-hidden bg-white">
                <CardContent className="p-0">
                    <Table>
                        <TableHeader className="bg-black/5">
                            <TableRow className="hover:bg-transparent border-none">
                                <TableHead className="py-6 px-8 font-black uppercase text-[10px] tracking-widest text-black/40">SKU / Kód</TableHead>
                                <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest text-black/40">Názov Produktu</TableHead>
                                <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest text-black/40 text-right">Stav Skladu</TableHead>
                                <TableHead className="py-6 font-black uppercase text-[10px] tracking-widest text-black/40 text-right">B2B Cena (Gastro)</TableHead>
                                <TableHead className="py-6 px-8 font-black uppercase text-[10px] tracking-widest text-black/40 text-center">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {isLoading ? (
                                <TableRow><TableCell colSpan={5} className="h-32 text-center font-mono text-[10px] uppercase opacity-40">Synchronizujem dáta...</TableCell></TableRow>
                            ) : (
                                products?.map((product) => (
                                    <TableRow key={product.id} className="group border-black/5 hover:bg-primary/5 transition-colors cursor-default">
                                        <TableCell className="py-6 px-8 font-mono text-xs font-bold text-black/60">{product.sku}</TableCell>
                                        <TableCell className="py-6">
                                            <div className="flex flex-col">
                                                <span className="font-black uppercase text-sm tracking-tight">{product.name}</span>
                                                <span className="text-[9px] font-bold opacity-30 uppercase tracking-[0.2em] mt-0.5">Slovensko / Natural</span>
                                            </div>
                                        </TableCell>
                                        <TableCell className="py-6 text-right">
                                            <span className={`font-black text-lg ${product.stockKros < 12 ? 'text-destructive' : 'text-black'}`}>
                                                {product.stockKros} <span className="text-[10px] opacity-30 italic">ks</span>
                                            </span>
                                        </TableCell>
                                        <TableCell className="py-6 text-right font-black text-lg">
                                            {product.prices?.[0]?.price?.toFixed(2)} <span className="text-primary italic">€</span>
                                        </TableCell>
                                        <TableCell className="py-6 px-8 text-center">
                                            <Badge className={`
                        rounded-full px-4 py-1.5 font-black text-[9px] tracking-widest uppercase border-none shadow-sm
                        ${product.stockKros < 12 ? 'bg-destructive/10 text-destructive' : 'bg-green-500/10 text-green-600'}
                      `}>
                                                {product.stockKros < 12 ? 'Doplniť' : 'V PORIADKU'}
                                            </Badge>
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

function StatCard({ label, value, icon, highlight }: { label: string, value: string, icon: React.ReactNode, highlight?: boolean }) {
    return (
        <Card className={`rounded-[2rem] border-none shadow-xl shadow-black/5 p-8 flex items-center justify-between transition-transform hover:translate-y-[-4px] duration-300 ${highlight ? 'bg-destructive/5' : 'bg-white'}`}>
            <div className="space-y-1">
                <span className="block text-[10px] font-black uppercase tracking-[0.2em] opacity-30 leading-none">{label}</span>
                <span className={`block text-3xl font-black tracking-tighter ${highlight ? 'text-destructive' : 'text-black'}`}>{value}</span>
            </div>
            <div className={`h-12 w-12 rounded-2xl flex items-center justify-center ${highlight ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                {icon}
            </div>
        </Card>
    )
}
