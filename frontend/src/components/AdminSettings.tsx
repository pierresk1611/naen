import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, Table, FileSpreadsheet, Key, Save, Plug, AlertCircle, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const AdminSettings: React.FC = () => {
    // Mock state for settings
    const [krosConfig, setKrosConfig] = React.useState({
        apiKey: '****************************',
        warehouseId: 'SKLAD_001',
        apiUrl: 'https://api.kros.sk/v1'
    });

    // Mock state for Price Levels
    const [priceLevels, setPriceLevels] = React.useState([
        { id: 1, name: 'Základ (Maloobchod)', column: 'MOC s DPH' },
        { id: 2, name: 'Gastro (B2B)', column: 'VOC' },
        { id: 3, name: 'VIP Partner', column: 'VIP Cena' },
    ]);

    const addPriceLevel = () => {
        const newId = Math.max(...priceLevels.map(p => p.id), 0) + 1;
        setPriceLevels([...priceLevels, { id: newId, name: '', column: '' }]);
    };

    const removePriceLevel = (id: number) => {
        setPriceLevels(priceLevels.filter(p => p.id !== id));
    };

    const updatePriceLevel = (id: number, field: 'name' | 'column', value: string) => {
        setPriceLevels(priceLevels.map(p =>
            p.id === id ? { ...p, [field]: value } : p
        ));
    };

    const [sheets, setSheets] = React.useState([
        { id: 1, name: 'Cenník - Malokarpatská', sheetId: '1BxiMvs0XRA5nLRd-g4CO_...', gid: '0', status: 'active' },
        { id: 2, name: 'Cenník - Rakúsko', sheetId: '1BxiMvs0XRA5nLRd-g4CO_...', gid: '1244', status: 'active' },
        { id: 3, name: 'Skladové Zásoby (Externé)', sheetId: '1BxiMvs0XRA5nLRd-g4CO_...', gid: '5521', status: 'error' },
    ]);

    const handleSaveKros = () => {
        alert('KROS nastavenia boli uložené! (Mock)');
    };

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                <div className="space-y-2">
                    <Badge variant="outline" className="rounded-full border-black/10 text-black/40 font-bold text-[9px] tracking-widest uppercase italic">System Configuration</Badge>
                    <h2 className="text-6xl font-black uppercase tracking-tighter italic leading-none">Nastavenia</h2>
                </div>
                <Button className="bg-black text-white hover:bg-primary hover:text-white rounded-full px-8 py-6 font-black uppercase tracking-widest text-xs transition-all">
                    <Save className="mr-2 h-4 w-4" /> Uložiť Zmeny
                </Button>
            </div>

            <Tabs defaultValue="integrations" className="space-y-8">
                <TabsList className="bg-white border border-black/5 p-1 rounded-full h-auto inline-flex">
                    <TabsTrigger value="integrations" className="rounded-full px-6 py-2.5 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">External Integrations</TabsTrigger>
                    <TabsTrigger value="general" className="rounded-full px-6 py-2.5 text-[10px] font-black uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">General Settings</TabsTrigger>
                </TabsList>

                {/* INTEGRATIONS TAB */}
                <TabsContent value="integrations" className="space-y-8">

                    {/* KROS Configuration */}
                    <Card className="rounded-[2.5rem] border-none shadow-xl shadow-black/5 overflow-hidden">
                        <CardHeader className="bg-black/5 p-8 pb-6 border-b border-black/5">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm">
                                    <Plug className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl font-black uppercase tracking-tighter">KROS Integrácia</CardTitle>
                                    <CardDescription className="font-mono text-[10px] uppercase tracking-widest opacity-60 mt-1">Skladové hospodárstvo & Fakturácia</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-8 space-y-6">
                            <div className="grid md:grid-cols-2 gap-8">
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest opacity-60">API Base URL</Label>
                                    <Input value={krosConfig.apiUrl} onChange={(e) => setKrosConfig({ ...krosConfig, apiUrl: e.target.value })} className="bg-black/5 border-transparent h-12 rounded-xl text-xs font-mono" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-black uppercase tracking-widest opacity-60">Warehouse ID</Label>
                                    <Input value={krosConfig.warehouseId} onChange={(e) => setKrosConfig({ ...krosConfig, warehouseId: e.target.value })} className="bg-black/5 border-transparent h-12 rounded-xl text-xs font-mono" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label className="text-xs font-black uppercase tracking-widest opacity-60">API Key / Token</Label>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 opacity-30" />
                                        <Input type="password" value={krosConfig.apiKey} onChange={(e) => setKrosConfig({ ...krosConfig, apiKey: e.target.value })} className="pl-12 bg-black/5 border-transparent h-12 rounded-xl text-xs font-mono" />
                                    </div>
                                    <p className="text-[9px] opacity-40 uppercase font-bold tracking-widest mt-2 pl-1">Naposledy overené: 17.01.2026 10:00</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Google Sheets Configuration */}
                    <Card className="rounded-[2.5rem] border-none shadow-xl shadow-black/5 overflow-hidden">
                        <CardHeader className="bg-green-50/50 p-8 pb-6 border-b border-green-100/50">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 bg-green-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/20">
                                    <FileSpreadsheet className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl font-black uppercase tracking-tighter text-green-950">Google Sheets Sync</CardTitle>
                                    <CardDescription className="font-mono text-[10px] uppercase tracking-widest opacity-60 mt-1 text-green-800">Cenníky & Externé sklady</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="p-0">
                            <div className="p-8 space-y-4">
                                <Alert className="bg-blue-50 border-blue-100 text-blue-900 rounded-2xl">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle className="font-black uppercase tracking-widest text-[10px]">Info</AlertTitle>
                                    <AlertDescription className="text-[10px] opacity-80 mt-1 font-mono">
                                        Synchronizácia prebieha automaticky každú hodinu. Pre okamžitý sync použite tlačidlo v detaile.
                                    </AlertDescription>
                                </Alert>
                            </div>

                            <div className="border-t border-black/5 p-8 bg-green-50/30">
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-green-800">
                                        <Table className="h-5 w-5" />
                                        <h4 className="font-black uppercase tracking-widest text-xs">Mapovanie Stĺpcov (Column Mapping)</h4>
                                    </div>
                                    <p className="text-[10px] opacity-60 font-mono leading-relaxed max-w-2xl">
                                        Zadajte <strong>presné názvy hlavičiek</strong> (prvý riadok v Exceli/Sheets), podľa ktorých systém nájde správne údaje.
                                        Napríklad ak máte cenu v stĺpci s názvom "Velkoobchod", napíšte sem "Velkoobchod".
                                    </p>

                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-[9px] font-black uppercase tracking-widest opacity-40">Kód Produktu (SKU)</Label>
                                            <Input defaultValue="Kód" className="bg-white border-green-100 h-10 rounded-xl text-xs font-bold text-green-900" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[9px] font-black uppercase tracking-widest opacity-40">Názov Produktu</Label>
                                            <Input defaultValue="Názov položky" className="bg-white border-green-100 h-10 rounded-xl text-xs font-bold text-green-900" />
                                        </div>
                                        <div className="col-span-2 lg:col-span-4 space-y-4 pt-4 border-t border-green-100/50 mt-2">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-[10px] font-black uppercase tracking-widest opacity-60">Cenové Úrovne & Mapovanie (Price Levels)</Label>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={addPriceLevel}
                                                    className="h-7 text-[9px] font-black uppercase tracking-widest border-green-200 text-green-700 hover:bg-green-50"
                                                >
                                                    + Pridať Úroveň
                                                </Button>
                                            </div>

                                            <div className="space-y-3">
                                                {priceLevels.map((level, index) => (
                                                    <div key={level.id} className="grid grid-cols-12 gap-4 items-end animate-in fade-in slide-in-from-left-2 duration-300">
                                                        <div className="col-span-1 flex items-center justify-center pb-2">
                                                            <span className="font-mono text-[10px] font-bold text-green-800/40">#{level.id}</span>
                                                        </div>
                                                        <div className="col-span-5 space-y-1.5">
                                                            <Label className="text-[9px] font-bold uppercase tracking-widest opacity-40 pl-1">Názov Kategórie (Admin)</Label>
                                                            <Input
                                                                value={level.name}
                                                                onChange={(e) => updatePriceLevel(level.id, 'name', e.target.value)}
                                                                placeholder="Napr. Gastro, VIP, Ostatné..."
                                                                className="bg-white border-green-100 h-9 rounded-lg text-xs font-bold text-green-900 placeholder:text-green-800/20"
                                                            />
                                                        </div>
                                                        <div className="col-span-5 space-y-1.5">
                                                            <Label className="text-[9px] font-bold uppercase tracking-widest opacity-40 pl-1">Hlavička v Google Sheet</Label>
                                                            <Input
                                                                value={level.column}
                                                                onChange={(e) => updatePriceLevel(level.id, 'column', e.target.value)}
                                                                placeholder="Napr. Cena A, B2B Price..."
                                                                className="bg-white border-green-100 h-9 rounded-lg text-xs font-mono text-green-900 placeholder:text-green-800/20"
                                                            />
                                                        </div>
                                                        <div className="col-span-1 pb-1">
                                                            {priceLevels.length > 1 && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    onClick={() => removePriceLevel(level.id)}
                                                                    className="h-8 w-8 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-full"
                                                                >
                                                                    <Trash2 className="h-3.5 w-3.5" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <p className="text-[9px] text-green-800/40 font-mono text-center pt-2">
                                                * ID úrovne (1, 2, 3...) sa musí zhodovať s 'priceLevelId' nastaveným u zákazníka.
                                            </p>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[9px] font-black uppercase tracking-widest opacity-40">Sklad (Počet ks)</Label>
                                            <Input defaultValue="Stav zásob" className="bg-white border-green-100 h-10 rounded-xl text-xs font-bold text-green-900" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-black/5">
                                {sheets.map((sheet, idx) => (
                                    <div key={sheet.id} className="flex items-center justify-between p-6 border-b border-black/5 last:border-0 hover:bg-black/[0.02] transition-colors">
                                        <div className="flex items-center gap-4">
                                            <span className="font-mono text-[10px] font-bold text-black/30">0{idx + 1}</span>
                                            <div>
                                                <h4 className="font-black uppercase text-sm tracking-tight">{sheet.name}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Badge variant="secondary" className="bg-black/5 hover:bg-black/10 text-[9px] font-mono h-5">GID: {sheet.gid}</Badge>
                                                    <span className="text-[9px] font-mono opacity-40 truncate max-w-[200px]">{sheet.sheetId}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className={`
                                                flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest
                                                ${sheet.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}
                                            `}>
                                                <div className={`h-1.5 w-1.5 rounded-full ${sheet.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`} />
                                                {sheet.status === 'active' ? 'Connected' : 'Error'}
                                            </div>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full hover:bg-black/5">
                                                <Key className="h-4 w-4 opacity-30" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <div className="p-6 bg-black/[0.02] flex justify-center">
                                    <Button variant="outline" className="text-[10px] font-black uppercase tracking-widest border-dashed border-black/20 hover:border-black hover:bg-transparent">
                                        + Pridať Nový Zdroj (Sheet)
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* GENERAL TAB */}
                <TabsContent value="general">
                    <Card className="rounded-[2.5rem] border-none shadow-xl shadow-black/5">
                        <CardContent className="p-20 text-center">
                            <p className="text-black/20 font-black uppercase tracking-widest">Všeobecné nastavenia portálu (Coming Soon)</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
};
