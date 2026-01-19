import { LogisticsService } from './logistics.service';
export declare class LogisticsController {
    private readonly logisticsService;
    constructor(logisticsService: LogisticsService);
    optimize(orderIds: number[]): Promise<{
        stop: number;
        orderId: number;
        company: string;
        address: string;
    }[]>;
}
