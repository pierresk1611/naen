import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class ProductsService {
    constructor(private prisma: PrismaService) { }

    async findAll() {
        try {
            return await this.prisma.product.findMany({
                include: { prices: true },
                where: { isActive: true },
            });
        } catch (error) {
            console.warn('⚠️ Returning Demo Products because DB is unreachable');
            return [
                {
                    id: 1,
                    sku: 'NAEN-001',
                    name: 'Prosecco Spumante - Extray Dry [DEMO]',
                    stockKros: 120,
                    imageUrl: null,
                    prices: [{ price: 12.50, priceLevelId: 1 }],
                },
                {
                    id: 2,
                    sku: 'NAEN-002',
                    name: 'Pinot Grigio Delle Venezie [DEMO]',
                    stockKros: 48,
                    imageUrl: null,
                    prices: [{ price: 8.90, priceLevelId: 1 }],
                },
            ];
        }
    }


    async findBySku(sku: string) {
        return this.prisma.product.findUnique({
            where: { sku },
            include: { prices: true },
        });
    }
}
