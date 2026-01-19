import { Controller, Get, Post, Body, Param, ParseIntPipe, Res, Query } from '@nestjs/common';

import { OrdersService } from './orders.service';
import { CreateOrderDto, CreateOrderSchema } from './dto/create-order.dto';
import { KrosExportService } from './kros-export/kros-export.service';
import * as express from 'express';


@Controller('orders')
export class OrdersController {
    constructor(
        private readonly ordersService: OrdersService,
        private readonly krosExportService: KrosExportService,
    ) { }

    @Post()
    async create(@Body() rawData: any) {
        const validatedData = CreateOrderSchema.parse(rawData);
        return this.ordersService.create(validatedData);
    }

    @Get()
    async findAll(
        @Query('startDate') startDate?: string,
        @Query('endDate') endDate?: string
    ) {
        return this.ordersService.findAll({ startDate, endDate });
    }


    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ordersService.findOne(id);
    }

    @Get(':id/export-kros')
    async exportKros(@Param('id', ParseIntPipe) id: number, @Res() res: express.Response) {
        const xml = await this.krosExportService.exportOrderToXml(id);
        res.set('Content-Type', 'text/xml');
        res.set('Content-Disposition', `attachment; filename="order-${id}-kros.xml"`);
        return res.send(xml);
    }
}
