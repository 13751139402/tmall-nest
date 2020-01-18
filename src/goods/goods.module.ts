/*
 * @Author: your name
 * @Date: 2020-01-02 10:10:18
 * @LastEditTime : 2020-01-10 14:58:54
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.module.ts
 */
import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { CategoryModule } from './category/category.module';
import { goods_spu } from './entity/goods_spu.entity';
import { goods_category } from './category/category.entity'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [GoodsController],
  providers: [GoodsService, CategoryModule],
  imports: [CategoryModule, TypeOrmModule.forFeature([goods_spu, goods_category])]
})
export class GoodsModule { }
