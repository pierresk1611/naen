import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        try {
            await this.$connect();
            console.log('✅ Database connected successfully');
        } catch (error) {
            console.error('❌ Database connection failed. Ensure Docker is running and DATABASE_URL is correct.');
            console.error('App will continue in degraded mode (some features may fail).');
        }
    }

}
