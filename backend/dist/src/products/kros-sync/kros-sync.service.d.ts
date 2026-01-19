import { PrismaService } from '../../prisma.service';
export declare class KrosSyncService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
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
