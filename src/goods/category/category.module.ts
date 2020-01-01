import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { goods_category } from './category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([goods_category])], // 在此模板中注入存储库
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
