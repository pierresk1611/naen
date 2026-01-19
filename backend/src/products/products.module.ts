import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { GoogleSheetsService } from './google-sheets/google-sheets.service';
import { GoogleSheetsProcessor } from './google-sheets/google-sheets.processor';
import { KrosSyncService } from './kros-sync/kros-sync.service';
import { PrismaService } from '../prisma.service';
// import { BullModule } from '@nestjs/bullmq';

@Module({
    imports: [],


    controllers: [ProductsController],
    providers: [
        ProductsService,
        GoogleSheetsService,
        // GoogleSheetsProcessor,
        KrosSyncService,
        PrismaService,
    ],

    exports: [ProductsService, GoogleSheetsService, KrosSyncService],
})
export class ProductsModule { }
