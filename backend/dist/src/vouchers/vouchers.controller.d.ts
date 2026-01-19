import { VouchersService } from './vouchers.service';
export declare class VouchersController {
    private readonly vouchersService;
    constructor(vouchersService: VouchersService);
    create(createVoucherDto: any): Promise<{
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
