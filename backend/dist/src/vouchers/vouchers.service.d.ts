import { PrismaService } from '../prisma.service';
export declare class VouchersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: number;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        code: string;
        discountValue: import("@prisma/client/runtime/library").Decimal;
        discountType: string;
        targetType: string;
        targetPriceLevelId: number | null;
        validFrom: Date | null;
        validUntil: Date | null;
    }>;
    findAll(): Promise<({
        specificUsers: {
            id: number;
            companyName: string;
        }[];
        specificProducts: {
            id: number;
            name: string;
            sku: string;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        isActive: boolean;
        code: string;
        discountValue: import("@prisma/client/runtime/library").Decimal;
        discountType: string;
        targetType: string;
        targetPriceLevelId: number | null;
        validFrom: Date | null;
        validUntil: Date | null;
    })[]>;
}
