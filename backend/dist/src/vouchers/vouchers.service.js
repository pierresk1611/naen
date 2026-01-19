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
exports.VouchersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let VouchersService = class VouchersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        const { targetUserIds, targetProductIds, ...voucherData } = data;
        const connectUsers = targetUserIds && targetUserIds.length > 0
            ? { connect: targetUserIds.map((id) => ({ id })) }
            : undefined;
        const connectProducts = targetProductIds && targetProductIds.length > 0
            ? { connect: targetProductIds.map((id) => ({ id })) }
            : undefined;
        return this.prisma.voucher.create({
            data: {
                ...voucherData,
                specificUsers: connectUsers,
                specificProducts: connectProducts,
            },
        });
    }
    async findAll() {
        return this.prisma.voucher.findMany({
            include: {
                specificUsers: {
                    select: { id: true, companyName: true }
                },
                specificProducts: {
                    select: { id: true, name: true, sku: true }
                }
            },
            orderBy: { createdAt: 'desc' }
        });
    }
};
exports.VouchersService = VouchersService;
exports.VouchersService = VouchersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VouchersService);
//# sourceMappingURL=vouchers.service.js.map