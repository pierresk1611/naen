import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class VouchersService {
    constructor(private prisma: PrismaService) { }

    async create(data: any) {
        const { targetUserIds, targetProductIds, ...voucherData } = data;

        // Preparation for relation connect
        const connectUsers = targetUserIds && targetUserIds.length > 0
            ? { connect: targetUserIds.map((id: number) => ({ id })) }
            : undefined;

        const connectProducts = targetProductIds && targetProductIds.length > 0
            ? { connect: targetProductIds.map((id: number) => ({ id })) }
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
}
