import { Injectable } from '@nestjs/common';
import { Client } from '@googlemaps/google-maps-services-js';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LogisticsService {
    private client: Client;

    constructor(private prisma: PrismaService) {
        this.client = new Client({});
    }

    async optimizeRoute(orderIds: number[]) {
        const orders = await this.prisma.order.findMany({
            where: { id: { in: orderIds } },
            include: { user: true },
        });

        // Placeholder for actual optimization logic
        return orders.map((o, index) => ({
            stop: index + 1,
            orderId: o.id,
            company: o.user.companyName,
            address: `${o.user.addressLat}, ${o.user.addressLng}`,
        }));
    }
}
