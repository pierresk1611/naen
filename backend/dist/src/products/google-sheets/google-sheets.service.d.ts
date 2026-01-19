import { PrismaService } from '../../prisma.service';
export declare class GoogleSheetsService {
    private prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    syncPrices(): Promise<void>;
}
