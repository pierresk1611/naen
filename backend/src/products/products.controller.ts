import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { KrosSyncService } from './kros-sync/kros-sync.service';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly krosSyncService: KrosSyncService,
        // @InjectQueue('sync-prices') private readonly syncQueue: Queue,
    ) { }

    @Get()
    async findAll() {
        return this.productsService.findAll();
    }

    @Post('sync')
    async triggerSync() {
        // await this.syncQueue.add('sync', {});
        return { message: 'Sync job added to queue (DISABLED: Redis not available)' };
    }


    @Post('webhooks/kros-stock')
    async updateStock(@Body() stockData: { sku: string; qty: number }[]) {
        return this.krosSyncService.updateStock(stockData);
    }
}
