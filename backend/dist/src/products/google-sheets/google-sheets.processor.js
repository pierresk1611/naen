"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleSheetsProcessor = void 0;
const bullmq_1 = require("@nestjs/bullmq");
const google_sheets_service_1 = require("./google-sheets.service");
let GoogleSheetsProcessor = class GoogleSheetsProcessor extends bullmq_1.WorkerHost {
    sheetsService;
    constructor(sheetsService) {
        super();
        this.sheetsService = sheetsService;
    }
    async process(job) {
        switch (job.name) {
            case 'sync':
                return this.sheetsService.syncPrices();
            default:
                throw new Error('Unknown job name');
        }
    }
};
exports.GoogleSheetsProcessor = GoogleSheetsProcessor;
exports.GoogleSheetsProcessor = GoogleSheetsProcessor = __decorate([
    (0, bullmq_1.Processor)('sync-prices'),
    __metadata("design:paramtypes", [google_sheets_service_1.GoogleSheetsService])
], GoogleSheetsProcessor);
//# sourceMappingURL=google-sheets.processor.js.map