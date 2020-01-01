import { Module } from '@nestjs/common';
import { GoodsController } from './goods.controller';
import { GoodsService } from './goods.service';
import { CategoryModule } from './category/category.module';

@Module({
  controllers: [GoodsController],
  providers: [GoodsService],
  imports: [CategoryModule]
})
export class GoodsModule {}
