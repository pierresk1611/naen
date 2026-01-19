import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class KrosSyncService {
    private readonly logger = new Logger(KrosSyncService.name);

    constructor(private prisma: PrismaService) { }

    async updateStock(stockData: { sku: string; qty: number }[]) {
        this.logger.log(`Updating stock for ${stockData.length} products from KROS`);

        return this.prisma.$transaction(
            stockData.map((item) =>
                this.prisma.product.upsert({
                    where: { sku: item.sku },
                    update: { stockKros: item.qty },
                    create: {
                        sku: item.sku,
                        name: `Imported ${item.sku}`, // Fallback name
                        stockKros: item.qty,
                    },
                }),
            ),
        );
    }
}
