import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { create } from 'xmlbuilder2';
import { format } from 'date-fns';

@Injectable()
export class KrosExportService {
    constructor(private prisma: PrismaService) { }

    async exportOrderToXml(orderId: number) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: { include: { product: true } },
                user: true,
            },
        });

        if (!order) throw new Error('Order not found');

        const root = create({ version: '1.0', encoding: 'UTF-8' })
            .ele('ImportKros')
            .ele('Objednavka')
            .ele('Cislo').txt(`WEB-${order.id}`).up()
            .ele('Datum').txt(format(order.deliveryDate ?? new Date(), 'yyyy-MM-dd')).up()

            .ele('Partner').txt(order.user.companyName).up()
            .ele('Polozky');

        for (const item of order.items) {
            root.ele('Polozka')
                .ele('SKU').txt(item.product.sku).up()
                .ele('Nazov').txt(item.product.name).up()
                .ele('Mnozstvo').txt(item.quantity.toString()).up() // Total bottles
                .ele('Cena').txt(item.price.toString()).up()
                .up();
        }

        return root.end({ prettyPrint: true });
    }
}
