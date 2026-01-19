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
exports.LogisticsService = void 0;
const common_1 = require("@nestjs/common");
const google_maps_services_js_1 = require("@googlemaps/google-maps-services-js");
const prisma_service_1 = require("../prisma.service");
let LogisticsService = class LogisticsService {
    prisma;
    client;
    constructor(prisma) {
        this.prisma = prisma;
        this.client = new google_maps_services_js_1.Client({});
    }
    async optimizeRoute(orderIds) {
        const orders = await this.prisma.order.findMany({
            where: { id: { in: orderIds } },
            include: { user: true },
        });
        return orders.map((o, index) => ({
            stop: index + 1,
            orderId: o.id,
            company: o.user.companyName,
            address: `${o.user.addressLat}, ${o.user.addressLng}`,
        }));
    }
};
exports.LogisticsService = LogisticsService;
exports.LogisticsService = LogisticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LogisticsService);
//# sourceMappingURL=logistics.service.js.map