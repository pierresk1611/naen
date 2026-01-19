import { PrismaService } from '../prisma.service';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: number;
        email: string;
        password: string;
        companyName: string;
        role: string;
        ico: string | null;
        dic: string | null;
        phone: string | null;
        priceLevelId: number;
        addressLat: number | null;
        addressLng: number | null;
        street: string | null;
        city: string | null;
        zip: string | null;
        deliveryTimeFrom: string | null;
        deliveryTimeTo: string | null;
        deliveryDays: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
        suppliedProducts: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            sku: string;
            stockKros: number;
            packagingUnit: number;
            imageUrl: string | null;
            isActive: boolean;
        }[];
    } & {
        id: number;
        email: string;
        password: string;
        companyName: string;
        role: string;
        ico: string | null;
        dic: string | null;
        phone: string | null;
        priceLevelId: number;
        addressLat: number | null;
        addressLng: number | null;
        street: string | null;
        city: string | null;
        zip: string | null;
        deliveryTimeFrom: string | null;
        deliveryTimeTo: string | null;
        deliveryDays: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
}
