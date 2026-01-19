import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CartonInputProps {
    value: number; // always in bottles
    packagingUnit?: number; // default 6
    onChange: (value: number) => void;
    className?: string;
}

export const CartonInput: React.FC<CartonInputProps> = ({
    value,
    packagingUnit = 6,
    onChange,
    className = '',
}) => {
    const cartons = Math.floor(value / packagingUnit);

    const increment = () => {
        onChange(value + packagingUnit);
    };

    const decrement = () => {
        if (value >= packagingUnit) {
            onChange(value - packagingUnit);
        } else {
            onChange(0);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVal = parseInt(e.target.value, 10);
        if (isNaN(newVal)) return;

        // Auto-correct to nearest multiple of packagingUnit
        const corrected = Math.round(newVal / packagingUnit) * packagingUnit;
        onChange(corrected);
    };

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <div className="flex items-center gap-2">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={decrement}
                    className="h-10 w-10 border-black rounded-none hover:bg-black hover:text-white transition-colors"
                    disabled={value <= 0}
                >
                    <Minus className="h-4 w-4" />
                </Button>

                <div className="relative flex-1 max-w-[120px]">
                    <Input
                        type="number"
                        value={value}
                        onChange={handleInputChange}
                        className="text-center h-10 border-black rounded-none focus-visible:ring-0 focus-visible:border-orange-500 font-mono text-lg pr-8"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono opacity-50">
                        ks
                    </span>
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={increment}
                    className="h-10 w-10 border-black rounded-none hover:bg-black hover:text-white transition-colors"
                >
                    <Plus className="h-4 w-4" />
                </Button>
            </div>

            <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground flex justify-between items-center px-1">
                <span>{cartons} {cartons === 1 ? 'kartón' : cartons >= 2 && cartons <= 4 ? 'kartóny' : 'kartónov'}</span>
                <span className="text-orange-600 font-bold">1 BAL = {packagingUnit} KS</span>
            </div>
        </div>
    );
};
