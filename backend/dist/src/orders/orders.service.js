"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let OrdersService = class OrdersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createOrderDto) {
        return this.prisma.$transaction(async (tx) => {
            const totalPrice = createOrderDto.items.reduce((acc, item) => acc + (item.quantity * (item.price ?? 0)), 0);
            const order = await tx.order.create({
                data: {
                    userId: createOrderDto.userId,
                    totalPrice: totalPrice,
                    status: 'PENDING',
                    deliveryDate: new Date(createOrderDto.deliveryDate),
                },
            });
            const itemsData = createOrderDto.items.map((item) => ({
                orderId: order.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price ?? 0,
            }));
            await tx.orderItem.createMany({
                data: itemsData,
            });
            return tx.order.findUnique({
                where: { id: order.id },
                include: { items: true },
            });
        });
    }
    async findAll(filters) {
        try {
            const where = {};
            if (filters?.startDate || filters?.endDate) {
                where.createdAt = {};
                if (filters.startDate)
                    where.createdAt.gte = new Date(filters.startDate);
                if (filters.endDate)
                    where.createdAt.lte = new Date(filters.endDate);
            }
            return await this.prisma.order.findMany({
                where,
                include: { items: { include: { product: true } }, user: true },
                orderBy: { createdAt: 'desc' },
            });
        }
        catch (error) {
            console.warn('⚠️ Returning Demo Orders because DB is unreachable');
            return [
                {
                    id: 101,
                    totalPrice: 150.00,
                    status: 'PENDING',
                    createdAt: new Date(),
                    deliveryDate: new Date(Date.now() + 86400000),
                    user: {
                        companyName: 'Gastro Palace s.r.o.',
                        phone: '+421 900 123 456',
                        street: 'Vajnorská 42',
                        city: 'Bratislava',
                        zip: '831 04'
                    },
                    items: [
                        { quantity: 12, price: 12.50, product: { name: 'Veltlínske Zelené 2024' } }
                    ]
                },
                {
                    id: 102,
                    totalPrice: 280.00,
                    status: 'PROCESSING',
                    createdAt: new Date(Date.now() - 86400000),
                    deliveryDate: new Date(Date.now() + 172800000),
                    user: {
                        companyName: 'Hotel Luxury & Spa',
                        phone: '+421 911 888 777',
                        street: 'Pribinova 1',
                        city: 'Bratislava',
                        zip: '811 09'
                    },
                    items: [
                        { quantity: 24, price: 11.00, product: { name: 'Frankovka Modrá' } }
                    ]
                }
            ];
        }
    }
    async findOne(id) {
        return this.prisma.order.findUnique({
            where: { id },
            include: { items: true, user: true },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map