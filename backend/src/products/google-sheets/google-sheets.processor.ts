import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { GoogleSheetsService } from './google-sheets.service';

@Processor('sync-prices')
export class GoogleSheetsProcessor extends WorkerHost {
    constructor(private readonly sheetsService: GoogleSheetsService) {
        super();
    }

    async process(job: Job<any, any, string>): Promise<any> {
        switch (job.name) {
            case 'sync':
                return this.sheetsService.syncPrices();
            default:
                throw new Error('Unknown job name');
        }
    }
}
