/*
 * @Author: your name
 * @Date: 2020-01-02 10:10:18
 * @LastEditTime : 2020-02-04 19:33:36
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.module.ts
 */
import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { CategoryModule } from './category/category.module';
import { goods_spu, goods_sku, goods_spec_value } from './entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [GoodsController],
  providers: [GoodsService, CategoryModule],
  imports: [TypeOrmModule.forFeature([goods_spu, goods_sku, goods_spec_value])]
})
export class GoodsModule { }
