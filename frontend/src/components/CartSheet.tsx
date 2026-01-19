import React from 'react';
import { ShoppingCart, Trash2, Send } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface CartItem {
    id: number;
    sku: string;
    name: string;
    qty: number;
    price: number;
}

interface CartSheetProps {
    items: CartItem[];
    onRemove: (id: number) => void;
    onCheckout: () => void;
}

export const CartSheet: React.FC<CartSheetProps> = ({ items, onRemove, onCheckout }) => {
    const total = items.reduce((acc, item) => acc + item.qty * item.price, 0);

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="rounded-full border-2 border-black hover:bg-black hover:text-white flex gap-3 h-12 px-6 font-black uppercase transition-all relative group">
                    <ShoppingCart className="h-5 w-5 group-hover:animate-bounce" />
                    <span className="hidden sm:inline">Váš Košík</span>
                    {items.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-6 h-6 flex items-center justify-center font-black rounded-full border-2 border-white shadow-md">
                            {items.length}
                        </span>
                    )}
                </Button>
            </SheetTrigger>
            <SheetContent className="rounded-l-2xl border-l-4 border-black w-full sm:max-w-md flex flex-col p-0 shadow-[-20px_0px_60px_-15px_rgba(0,0,0,0.3)] bg-background">
                <SheetHeader className="p-8 border-b-2 border-black/10 pb-10">
                    <SheetTitle className="text-5xl font-black uppercase tracking-tighter italic leading-none">Váš Výber</SheetTitle>
                    <p className="font-mono text-[10px] opacity-40 uppercase tracking-widest mt-2">Natural Wine B2B Selection</p>
                </SheetHeader>

                <ScrollArea className="flex-1 p-8">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center opacity-30 py-24 text-center">
                            <ShoppingCart className="h-24 w-24 mb-6" />
                            <p className="font-black uppercase tracking-[0.2em] text-lg">Prázdny košík</p>
                            <p className="text-xs font-mono mt-2">Doplňte svoje zásoby z nášho katalógu.</p>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-8">
                            {items.map((item) => (
                                <div key={item.id} className="group">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1 space-y-1">
                                            <p className="font-mono text-[9px] opacity-40 uppercase font-bold tracking-widest">SKU: {item.sku}</p>
                                            <h4 className="font-black uppercase text-sm leading-tight text-foreground/90">{item.name}</h4>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onRemove(item.id)}
                                            className="text-muted-foreground hover:bg-destructive hover:text-white rounded-full h-8 w-8 transition-all"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                    <div className="flex justify-between items-end mt-4">
                                        <div className="flex gap-2 items-baseline">
                                            <span className="text-lg font-black italic">{item.qty}</span>
                                            <span className="text-[10px] font-bold uppercase opacity-40 tracking-widest">ks</span>
                                            <span className="text-[10px] font-bold uppercase opacity-20 mx-2">/</span>
                                            <span className="text-lg font-black opacity-30 italic">{Math.floor(item.qty / 6)}</span>
                                            <span className="text-[10px] font-bold uppercase opacity-20 tracking-widest leading-none">kartony</span>
                                        </div>
                                        <span className="text-xl font-black">{(item.qty * item.price).toFixed(2)} €</span>
                                    </div>
                                    <Separator className="mt-8 bg-black/5" />
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollArea>

                {items.length > 0 && (
                    <SheetFooter className="p-8 border-t-2 border-black/10 bg-white block space-y-6">
                        <div className="flex justify-between items-end">
                            <span className="font-black text-xs uppercase opacity-40 tracking-widest">Celkom bez DPH</span>
                            <span className="text-5xl font-black tracking-tighter leading-none italic">{total.toFixed(2)} €</span>
                        </div>
                        <Button
                            onClick={onCheckout}
                            className="w-full rounded-none h-16 bg-primary text-white hover:bg-black text-xl font-black uppercase tracking-widest flex gap-4 transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none translate-x-0 translate-y-0 active:translate-x-1 active:translate-y-1 border-2 border-black"
                        >
                            <Send className="h-6 w-6" />
                            Potvrdiť & Odoslať
                        </Button>
                    </SheetFooter>
                )}
            </SheetContent>
        </Sheet>
    );
};
