import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CartonInput } from './CartonInput';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBasket, Loader2, Info, Sparkles } from 'lucide-react';

interface Product {
    id: number;
    sku: string;
    name: string;
    stockKros: number;
    imageUrl?: string;
    prices: { price: number }[];
}

interface ProductCatalogProps {
    cart: Record<number, number>;
    onQtyChange: (productId: number, qty: number) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ cart, onQtyChange }) => {
    const { data: products, isLoading, error } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3000/products');
            return response.data;
        },
        retry: 1,
    });

    if (isLoading) return (
        <div className="flex flex-col items-center justify-center py-40">
            <div className="relative">
                <Loader2 className="h-24 w-24 animate-spin text-primary opacity-20" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
                </div>
            </div>
            <span className="font-black uppercase tracking-[0.6em] text-xs mt-8 opacity-40">Synchronizujem ponuku...</span>
        </div>
    );

    if (error) return (
        <div className="p-20 text-center space-y-4">
            <div className="inline-block p-4 bg-destructive/10 rounded-full text-destructive mb-4">
                <Info className="h-8 w-8" />
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tighter">Server nie je dostupný</h2>
            <p className="font-mono text-xs opacity-50 uppercase tracking-widest max-w-sm mx-auto">
                Práve prebieha údržba systémov. Skúste to prosím neskôr alebo kontaktujte podporu.
            </p>
        </div>
    );

    return (
        <div className="space-y-20 pb-20">
            {/* Visual Intro */}
            <div className="relative py-12">
                <div className="flex flex-col md:flex-row justify-between items-end gap-10">
                    <div className="space-y-4 flex-1">
                        <div className="flex items-center gap-3">
                            <Badge className="bg-primary/10 text-primary border-none rounded-full h-8 px-4 font-black text-[10px] tracking-widest flex gap-2">
                                <Sparkles className="h-3 w-3" /> EXKLUZÍVNA B2B PONUKA
                            </Badge>
                            <div className="h-px flex-1 bg-black/5" />
                        </div>
                        <h2 className="text-8xl font-black uppercase tracking-tighter leading-[0.8] italic">
                            Vínny <br />
                            <span className="text-primary not-italic">Katalóg</span>
                        </h2>
                    </div>
                    <div className="md:w-64 space-y-6">
                        <div className="text-right">
                            <span className="block text-5xl font-black">{products?.length || 0}</span>
                            <span className="block font-mono text-[9px] font-bold opacity-30 uppercase tracking-[0.3em]">Kurátorovaných vín</span>
                        </div>
                        <p className="text-[11px] font-medium leading-relaxed opacity-50 text-right uppercase tracking-wider">
                            Zobrazené ceny sú konečné B2B ceny pre vašu hladinu bez DPH. Logistika zabezpečená do 48h.
                        </p>
                    </div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-x-12 gap-y-24">
                {products?.map((product) => (
                    <div key={product.id} className="group relative">
                        {/* Hover Shadow Decor */}
                        <div className="absolute -inset-4 bg-white opacity-0 group-hover:opacity-100 rounded-[2.5rem] shadow-2xl shadow-black/5 transition-all duration-500 -z-10" />

                        {/* Image Container */}
                        <div className="relative aspect-[4/5] bg-[#eff0f0] rounded-[2rem] overflow-hidden transition-all duration-500 group-hover:translate-y-[-12px]">
                            {product.imageUrl ? (
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center">
                                    <h4 className="text-[120px] font-black text-black opacity-[0.03] select-none leading-none tracking-tighter">VÍNO</h4>
                                    <div className="absolute inset-x-0 bottom-0 p-8 flex justify-center">
                                        <div className="h-1 shadow-2xl w-2/3 bg-black/10 rounded-full blur-xl" />
                                    </div>
                                </div>
                            )}

                            <div className="absolute top-6 left-6 flex flex-col gap-2">
                                <Badge className="rounded-full bg-white text-black hover:bg-white font-black text-[9px] tracking-widest uppercase px-3 py-1 border-none shadow-sm">
                                    {product.sku}
                                </Badge>
                            </div>

                            {/* Quick Tag */}
                            <div className="absolute top-6 right-6 h-14 w-14 bg-black text-white rounded-full flex flex-col items-center justify-center shadow-xl ring-4 ring-white/10 group-hover:bg-primary transition-colors">
                                <span className="text-sm font-black leading-none">6</span>
                                <span className="text-[8px] font-bold uppercase opacity-60">Pack</span>
                            </div>
                        </div>

                        {/* Product Meta */}
                        <div className="pt-8 px-2 space-y-6">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black uppercase tracking-tighter leading-none min-h-[3rem] line-clamp-2 transition-colors duration-300 group-hover:text-primary">
                                    {product.name}
                                </h3>
                                <div className="flex items-center gap-3 font-mono text-[9px] font-bold uppercase tracking-[0.2em] opacity-40">
                                    <span>Natural Selection</span>
                                    <div className="w-1 h-1 rounded-full bg-black/20" />
                                    <span>Slovakia</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end border-b-2 border-black/5 pb-6">
                                <div className="flex flex-col">
                                    <span className="text-[9px] font-bold uppercase opacity-30 tracking-widest mb-1">Veľkoobchod</span>
                                    <div className="flex items-baseline gap-1">
                                        <span className="text-4xl font-black tracking-tighter">{product.prices?.[0]?.price?.toFixed(2) ?? '0.00'}</span>
                                        <span className="text-lg font-black italic text-primary">€</span>
                                    </div>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        <div className={`w-2 h-2 rounded-full ${product.stockKros < 12 ? 'bg-destructive animate-pulse' : 'bg-green-500'}`} />
                                        <span className={`text-[9px] font-bold uppercase tracking-widest ${product.stockKros < 12 ? 'text-destructive' : 'text-black/40'}`}>
                                            {product.stockKros < 12 ? 'Posledné kusy' : 'Skladom'}
                                        </span>
                                    </div>
                                    <span className="font-mono text-[10px] font-bold opacity-60 uppercase">{product.stockKros} ks</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 opacity-80 group-hover:opacity-100 transition-all">
                                <CartonInput
                                    value={cart[product.id] || 0}
                                    onChange={(qty) => onQtyChange(product.id, qty)}
                                />
                                <Button
                                    onClick={() => onQtyChange(product.id, (cart[product.id] || 0) + 6)}
                                    className="h-16 bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs hover:bg-primary transition-all shadow-xl shadow-black/5 flex gap-4 group/btn overflow-hidden"
                                >
                                    <ShoppingBasket className="h-4 w-4 group-hover/btn:translate-y-[-2px] transition-transform" />
                                    DO KOŠÍKA
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
