import { ProductsService } from './products.service';
import { KrosSyncService } from './kros-sync/kros-sync.service';
export declare class ProductsController {
    private readonly productsService;
    private readonly krosSyncService;
    constructor(productsService: ProductsService, krosSyncService: KrosSyncService);
    findAll(): Promise<({
        prices: {
            id: number;
            priceLevelId: number;
            createdAt: Date;
            updatedAt: Date;
            price: import("@prisma/client/runtime/library").Decimal;
            productId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        sku: string;
        stockKros: number;
        packagingUnit: number;
        imageUrl: string | null;
        isActive: boolean;
    })[] | {
        id: number;
        sku: string;
        name: string;
        stockKros: number;
        imageUrl: null;
        prices: {
            price: number;
            priceLevelId: number;
        }[];
    }[]>;
    triggerSync(): Promise<{
        message: string;
    }>;
    updateStock(stockData: {
        sku: string;
        qty: number;
    }[]): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        sku: string;
        stockKros: number;
        packagingUnit: number;
        imageUrl: string | null;
        isActive: boolean;
    }[]>;
}
