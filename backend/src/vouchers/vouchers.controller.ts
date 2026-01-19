import { Controller, Get, Post, Body } from '@nestjs/common';
import { VouchersService } from './vouchers.service';

@Controller('vouchers')
export class VouchersController {
    constructor(private readonly vouchersService: VouchersService) { }

    @Post()
    create(@Body() createVoucherDto: any) {
        return this.vouchersService.create(createVoucherDto);
    }

    @Get()
    findAll() {
        return this.vouchersService.findAll();
    }
}
