import { Injectable } from '@nestjs/common';
import { Client, TravelMode } from '@googlemaps/google-maps-services-js';
import { PrismaService } from '../prisma.service';

@Injectable()
export class LogisticsService {
    private client: Client;

    constructor(private prisma: PrismaService) {
        this.client = new Client({});
    }

    async optimizeRoute(orderIds: number[]) {
        // 1. Fetch orders and user addresses
        const orders = await this.prisma.order.findMany({
            where: { id: { in: orderIds } },
            include: { user: true },
        });

        const destinations = orders
            .filter(o => o.user.addressLat && o.user.addressLng)
            .map(o => ({ lat: o.user.addressLat!, lng: o.user.addressLng! }));

        if (destinations.length === 0) return [];

        // 2. Mocking Google Routes API call logic
        // This would use this.client.distancematrix or directions

        // For now, return the orders sorted (placeholder logic)
        return orders.map(o => ({
            orderId: o.id,
            company: o.user.companyName,
            address: `${o.user.addressLat}, ${o.user.addressLng}`,
        }));
    }
}
