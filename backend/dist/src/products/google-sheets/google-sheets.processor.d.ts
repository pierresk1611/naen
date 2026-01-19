import { WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { GoogleSheetsService } from './google-sheets.service';
export declare class GoogleSheetsProcessor extends WorkerHost {
    private readonly sheetsService;
    constructor(sheetsService: GoogleSheetsService);
    process(job: Job<any, any, string>): Promise<any>;
}
