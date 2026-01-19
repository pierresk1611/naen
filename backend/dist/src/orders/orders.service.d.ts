import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createOrderDto: CreateOrderDto): Promise<({
        items: {
            id: number;
            price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            productId: number;
            orderId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: string;
        deliveryDate: Date | null;
        krosExportedAt: Date | null;
        userId: number;
    }) | null>;
    findAll(filters?: {
        startDate?: string;
        endDate?: string;
    }): Promise<({
        user: {
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
        };
        items: ({
            product: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                sku: string;
                stockKros: number;
                packagingUnit: number;
                imageUrl: string | null;
                isActive: boolean;
            };
        } & {
            id: number;
            price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            productId: number;
            orderId: number;
        })[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: string;
        deliveryDate: Date | null;
        krosExportedAt: Date | null;
        userId: number;
    })[] | {
        id: number;
        totalPrice: number;
        status: string;
        createdAt: Date;
        deliveryDate: Date;
        user: {
            companyName: string;
            phone: string;
            street: string;
            city: string;
            zip: string;
        };
        items: {
            quantity: number;
            price: number;
            product: {
                name: string;
            };
        }[];
    }[]>;
    findOne(id: number): Promise<({
        user: {
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
        };
        items: {
            id: number;
            price: import("@prisma/client/runtime/library").Decimal;
            quantity: number;
            productId: number;
            orderId: number;
        }[];
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        totalPrice: import("@prisma/client/runtime/library").Decimal;
        status: string;
        deliveryDate: Date | null;
        krosExportedAt: Date | null;
        userId: number;
    }) | null>;
}
