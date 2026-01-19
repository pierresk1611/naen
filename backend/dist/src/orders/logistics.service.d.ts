import { PrismaService } from '../prisma.service';
export declare class LogisticsService {
    private prisma;
    private client;
    constructor(prisma: PrismaService);
    optimizeRoute(orderIds: number[]): Promise<{
        orderId: number;
        company: string;
        address: string;
    }[]>;
}
