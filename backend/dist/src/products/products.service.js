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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        try {
            return await this.prisma.product.findMany({
                include: { prices: true },
                where: { isActive: true },
            });
        }
        catch (error) {
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
    async findBySku(sku) {
        return this.prisma.product.findUnique({
            where: { sku },
            include: { prices: true },
        });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map