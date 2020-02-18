/*
 * @Author: your name
 * @Date: 2020-01-11 22:30:40
 * @LastEditTime : 2020-02-12 17:01:21
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\order\order.module.ts
 */
import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { order_info, order_cart, order_product } from './entity/'
import { goods_sku } from '../goods/entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [OrderService],
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature([order_cart, goods_sku, order_product, order_info])]
})
export class OrderModule { }
