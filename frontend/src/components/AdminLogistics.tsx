import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    MapPin, Navigation, CheckCircle2, Phone, Package, Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface Order {
    id: number;
    totalPrice: string;
    status: string;
    deliveryDate: string;
    createdAt: string;
    user: {
        companyName: string;
        phone: string;
        street: string;
        city: string;
        zip: string;
    };
    items: {
        quantity: number;
        product: { name: string };
    }[];
}

interface RouteStop {
    stop: number;
    orderId: number;
    company: string;
    address: string;
}

export const AdminLogistics: React.FC = () => {
    const [selectedOrders, setSelectedOrders] = React.useState<number[]>([]);
    const [route, setRoute] = React.useState<RouteStop[]>([]);
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isPicked, setIsPicked] = React.useState(false);

    const { data: orders, isLoading: isLoadingOrders } = useQuery<Order[]>({
        queryKey: ['admin-orders-logistics'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3000/orders');
            return response.data;
        },
    });

    const { data: products } = useQuery<any[]>({
        queryKey: ['products-logistics'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3000/products');
            return response.data;
        },
    });

    const toggleSelect = (id: number) => {
        if (isPicked) return; // Lock selection if picked
        setSelectedOrders(prev =>
            prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]
        );
    };

    const optimizeMutation = useMutation({
        mutationFn: async () => {
            const response = await axios.post('http://localhost:3000/logistics/optimize', {
                orderIds: selectedOrders
            });
            // Enrich mock route data with order details for the driver
            return response.data.map((stop: any) => ({
                ...stop,
                items: orders?.find(o => o.id === stop.orderId)?.items || []
            }));
        },
        onSuccess: (data) => {
            setRoute(data);
        }
    });

    const filteredOrders = orders?.filter(o =>
        o.user.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        `WEB-${o.id}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStockStatus = (productName: string, reqQty: number) => {
        const product = products?.find(p => p.name === productName);
        const stock = product?.stockKros || 0;
        return { hasStock: stock >= reqQty, stock, missing: reqQty - stock };
    };

    const handleRevertOrder = (orderId: number) => {
        // In a real app, this would perform an API call to revert status
        setRoute(prev => prev.filter(stop => stop.orderId !== orderId));
        setSelectedOrders(prev => prev.filter(id => id !== orderId));
        if (route.length <= 1) setIsPicked(false); // Reset picking if route cancelled
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <Badge variant="outline" className="rounded-full border-black/10 text-black/40 font-bold text-[9px] tracking-widest uppercase italic">Route Optimization</Badge>
                    <h2 className="text-6xl font-black uppercase tracking-tighter italic leading-none">Logistika</h2>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-12">
                {/* Selection Column */}
                <div className="xl:col-span-7 space-y-6">
                    <div className="flex items-center justify-between px-2">
                        <h3 className="text-xl font-black uppercase tracking-tight">Nevybavené Objednávky</h3>
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-20" />
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Hľadať partnera..."
                                className="h-10 pl-10 bg-white border-black/5 rounded-xl text-xs focus:ring-primary shadow-sm"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4">
                        {isLoadingOrders ? (
                            <div className="p-20 text-center font-mono text-[10px] uppercase opacity-40">Synchronizujem objednávky...</div>
                        ) : filteredOrders?.map(order => (
                            <Card
                                key={order.id}
                                onClick={() => toggleSelect(order.id)}
                                className={`
                  group cursor-pointer rounded-[1.5rem] border-none transition-all duration-300 relative overflow-hidden
                  ${selectedOrders.includes(order.id)
                                        ? 'bg-primary text-white shadow-2xl shadow-primary/30 ring-4 ring-primary/20'
                                        : 'bg-white hover:bg-black/5 shadow-xl shadow-black/5'
                                    }
                  ${isPicked && !selectedOrders.includes(order.id) ? 'opacity-30 pointer-events-none' : ''}
`}
                            >
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start gap-6">
                                        <div className="space-y-4 flex-1">
                                            <div className="flex items-center gap-3">
                                                <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${selectedOrders.includes(order.id) ? 'opacity-60' : 'opacity-30'} `}>
                                                    #WEB-{order.id}
                                                </span>
                                                <div className={`h-1 w-1 rounded-full ${selectedOrders.includes(order.id) ? 'bg-white/40' : 'bg-black/10'} `} />
                                                <span className={`font-mono text-[10px] font-bold uppercase tracking-widest ${selectedOrders.includes(order.id) ? 'opacity-60' : 'opacity-30'} `}>
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </span>
                                            </div>

                                            <div className="space-y-1">
                                                <h4 className="text-xl font-black uppercase tracking-tight leading-none">{order.user.companyName}</h4>
                                                <div className={`flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${selectedOrders.includes(order.id) ? 'text-white/70' : 'text-black/40'} `}>
                                                    <MapPin className="h-3 w-3" />
                                                    {order.user.street}, {order.user.city}
                                                </div>
                                            </div>

                                            <div className="flex gap-6 items-center pt-2">
                                                <div className="flex items-center gap-2">
                                                    <Package className={`h-4 w-4 ${selectedOrders.includes(order.id) ? 'text-white/60' : 'text-primary'} `} />
                                                    <span className="text-sm font-black italic">{order.items.reduce((acc, i) => acc + i.quantity, 0)} <span className="text-[10px] uppercase opacity-50 not-italic">ks</span></span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Phone className={`h-3 w-3 ${selectedOrders.includes(order.id) ? 'text-white/40' : 'opacity-20'} `} />
                                                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">{order.user.phone}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-end justify-between self-stretch">
                                            <div className={`
h-10 w-10 rounded-full flex items-center justify-center transition-all
                          ${selectedOrders.includes(order.id) ? 'bg-white text-primary' : 'bg-black/5 text-black/10 group-hover:bg-primary/10 group-hover:text-primary'}
`}>
                                                <CheckCircle2 className={`h-6 w-6 ${selectedOrders.includes(order.id) ? 'scale-100' : 'scale-0'} transition-transform`} />
                                            </div>
                                            <div className="text-right">
                                                <span className={`block text-2xl font-black tracking-tighter ${selectedOrders.includes(order.id) ? 'text-white' : 'text-black'} `}>
                                                    {parseFloat(order.totalPrice).toFixed(2)} €
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Action & Result Column */}
                <div className="xl:col-span-5 space-y-8">
                    <Card className="rounded-[2.5rem] border-none shadow-2xl shadow-black/5 bg-white overflow-hidden p-8 sticky top-32">
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <h3 className="text-2xl font-black uppercase tracking-tighter italic">Plánovanie Trasy</h3>
                                <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 leading-relaxed">
                                    {isPicked ? 'Tovar je pripravený. Skontrolujte trasu a vytlačte podklady.' : 'Vyberte objednávky, skontrolujte dostupnosť tovaru a potvrďte vyskladnenie.'}
                                </p>
                            </div>

                            <div className="bg-black/5 rounded-2xl p-6 flex items-center justify-between">
                                <div className="space-y-1">
                                    <span className="block text-[10px] font-black uppercase tracking-widest opacity-40">Vybrané body</span>
                                    <span className="block text-3xl font-black">{selectedOrders.length}</span>
                                </div>
                                <Navigation className={`h-8 w-8 transition-all ${selectedOrders.length > 0 ? 'text-primary animate-bounce' : 'opacity-10'} `} />
                            </div>

                            {/* Required Goods Summary */}
                            <div className={`rounded-2xl p-6 space-y-4 border transition-all ${isPicked ? 'bg-green-50 border-green-100' : 'bg-orange-50 border-orange-100'} `}>
                                <div className="flex items-center justify-between">
                                    <div className={`flex items-center gap-2 ${isPicked ? 'text-green-700' : 'text-orange-700'} `}>
                                        <Package className="h-5 w-5" />
                                        <h4 className="font-black uppercase tracking-widest text-xs">Súhrn Tovaru (Pick List)</h4>
                                    </div>
                                    {isPicked && <Badge className="bg-green-500 text-white border-none">Vyskladnené</Badge>}
                                </div>

                                {selectedOrders.length === 0 ? (
                                    <p className="text-[10px] uppercase font-bold opacity-40">Vyberte objednávky pre zobrazenie tovaru</p>
                                ) : (
                                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                                        {Object.entries(
                                            filteredOrders
                                                ?.filter(o => selectedOrders.includes(o.id))
                                                .reduce((acc, order) => {
                                                    order.items.forEach(item => {
                                                        acc[item.product.name] = (acc[item.product.name] || 0) + item.quantity;
                                                    });
                                                    return acc;
                                                }, {} as Record<string, number>) ?? {}
                                        ).map(([name, qty]) => {
                                            const status = getStockStatus(name, qty);
                                            return (
                                                <div key={name} className={`flex justify-between items-center text-xs border-b pb-2 last:border-0 last:pb-0 ${isPicked ? 'border-green-200/50' : 'border-orange-200/50'} `}>
                                                    <div className="flex flex-col">
                                                        <span className={`font-bold ${isPicked ? 'text-green-900/80' : 'text-orange-900/80'} `}>{name}</span>
                                                        {!status.hasStock && (
                                                            <span className="text-[9px] font-black text-destructive uppercase tracking-widest">
                                                                Chýba: {status.missing} ks (Doobjednať!)
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className={`font-mono font-black ${isPicked ? 'text-green-600' : 'text-orange-600'} `}>
                                                        {qty} <span className="text-[9px] opacity-50">/ {status.stock}</span>
                                                    </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}

                                {!isPicked && selectedOrders.length > 0 && (
                                    <Button
                                        onClick={() => { setIsPicked(true); optimizeMutation.mutate(); }}
                                        className="w-full h-10 bg-orange-500 hover:bg-orange-600 text-white font-black uppercase tracking-widest text-[10px] rounded-xl"
                                    >
                                        Potvrdiť a Rezervovať
                                    </Button>
                                )}
                            </div>


                            {route.length > 0 && isPicked && (
                                <div className="space-y-6 pt-8 border-t border-black/5 animate-in fade-in slide-in-from-top-4 duration-500">
                                    <div className="flex items-center justify-between">
                                        <h4 className="text-sm font-black uppercase tracking-widest italic">Podklady Pre Vodiča</h4>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="sm" onClick={() => window.print()} className="h-8 text-[9px] font-black uppercase tracking-widest">
                                                Tlačiť
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="space-y-6 relative ml-3">
                                        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-black/5" />
                                        {route.map((stop: any) => (
                                            <div key={stop.stop} className="flex gap-6 relative z-10 group/stop">
                                                <div className="h-8 w-8 bg-white border border-black/10 rounded-full flex items-center justify-center font-black text-xs shadow-sm transition-all group-hover/stop:bg-black group-hover/stop:text-white group-hover/stop:border-black shrink-0">
                                                    {stop.stop}
                                                </div>
                                                <div className="flex-1 space-y-3 pb-6 border-b border-black/5 last:border-0">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <p className="font-black uppercase text-sm tracking-tight leading-none text-black/80">{stop.company}</p>
                                                            <p className="font-mono text-[9px] opacity-40 font-bold uppercase tracking-widest mt-1">{stop.address}</p>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleRevertOrder(stop.orderId)}
                                                            className="h-6 text-[9px] text-destructive opacity-0 group-hover/stop:opacity-100 hover:bg-destructive/10"
                                                        >
                                                            Vrátiť
                                                        </Button>
                                                    </div>

                                                    {/* Driver Manifest per Stop */}
                                                    <div className="bg-black/5 rounded-lg p-3 space-y-1">
                                                        <p className="text-[9px] font-bold uppercase opacity-40 mb-2">Na vyloženie:</p>
                                                        {stop.items?.map((item: any, idx: number) => (
                                                            <div key={idx} className="flex justify-between items-center text-[10px] font-medium">
                                                                <span>{item.quantity}x {item.product.name}</span>
                                                                <div className="h-3 w-3 border border-black/20 rounded-sm" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};
