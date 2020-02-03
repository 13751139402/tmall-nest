/*
 * @Author: your name
 * @Date: 2020-01-11 22:30:40
 * @LastEditTime: 2020-02-01 18:19:55
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\order\order.module.ts
 */
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { order_cart } from './entity/order_cart.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([order_cart])]
})
export class OrderModule { }
