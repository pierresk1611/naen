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
exports.KrosExportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma.service");
const xmlbuilder2_1 = require("xmlbuilder2");
const date_fns_1 = require("date-fns");
let KrosExportService = class KrosExportService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async exportOrderToXml(orderId) {
        const order = await this.prisma.order.findUnique({
            where: { id: orderId },
            include: {
                items: { include: { product: true } },
                user: true,
            },
        });
        if (!order)
            throw new Error('Order not found');
        const root = (0, xmlbuilder2_1.create)({ version: '1.0', encoding: 'UTF-8' })
            .ele('ImportKros')
            .ele('Objednavka')
            .ele('Cislo').txt(`WEB-${order.id}`).up()
            .ele('Datum').txt((0, date_fns_1.format)(order.deliveryDate ?? new Date(), 'yyyy-MM-dd')).up()
            .ele('Partner').txt(order.user.companyName).up()
            .ele('Polozky');
        for (const item of order.items) {
            root.ele('Polozka')
                .ele('SKU').txt(item.product.sku).up()
                .ele('Nazov').txt(item.product.name).up()
                .ele('Mnozstvo').txt(item.quantity.toString()).up()
                .ele('Cena').txt(item.price.toString()).up()
                .up();
        }
        return root.end({ prettyPrint: true });
    }
};
exports.KrosExportService = KrosExportService;
exports.KrosExportService = KrosExportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], KrosExportService);
//# sourceMappingURL=kros-export.service.js.map