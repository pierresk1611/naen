import { PrismaService } from '../prisma.service';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
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
    findBySku(sku: string): Promise<({
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
    }) | null>;
}
