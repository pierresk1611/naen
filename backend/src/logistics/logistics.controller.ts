import { Controller, Post, Body } from '@nestjs/common';
import { LogisticsService } from './logistics.service';

@Controller('logistics')
export class LogisticsController {
    constructor(private readonly logisticsService: LogisticsService) { }

    @Post('optimize')
    async optimize(@Body('orderIds') orderIds: number[]) {
        return this.logisticsService.optimizeRoute(orderIds);
    }
}
