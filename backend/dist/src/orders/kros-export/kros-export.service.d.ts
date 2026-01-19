import { PrismaService } from '../../prisma.service';
export declare class KrosExportService {
    private prisma;
    constructor(prisma: PrismaService);
    exportOrderToXml(orderId: number): Promise<string>;
}
