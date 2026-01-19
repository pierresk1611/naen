import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { KrosExportService } from './kros-export/kros-export.service';
import { PrismaService } from '../prisma.service';

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, KrosExportService, PrismaService],
    exports: [OrdersService],
})
export class OrdersModule { }
