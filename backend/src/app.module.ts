import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { LogisticsModule } from './logistics/logistics.module';
import { VouchersModule } from './vouchers/vouchers.module';
import { UsersModule } from './users/users.module';
import { PrismaService } from './prisma.service';
// import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    LogisticsModule,
    VouchersModule,
    UsersModule,
  ],



  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule { }
