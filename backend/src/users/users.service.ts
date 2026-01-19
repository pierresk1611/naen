import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(data: any) {
        const { suppliedProductIds, ...userData } = data;

        const connectProducts = suppliedProductIds && suppliedProductIds.length > 0
            ? { connect: suppliedProductIds.map((id: number) => ({ id })) }
            : undefined;

        // In a real app, hash password here. For demo/MVP, storing as is or dummy.
        return this.prisma.user.create({
            data: {
                ...userData,
                password: userData.password || 'password123', // Default password if not provided
                suppliedProducts: connectProducts,
            },
        });
    }

    async findAll() {
        return this.prisma.user.findMany({
            include: { suppliedProducts: true },
            orderBy: { createdAt: 'desc' }
        });
    }
}
