import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { goods_spu } from './goods.entity'
import { Repository } from 'typeorm';


@Injectable()
export class GoodsService {
    constructor(
        @InjectRepository(goods_spu) // 将已注册的entity注入到service中 // 修饰器将entity修饰注入到类中
        private readonly goodsCategory: Repository<goods_spu>, // 接口规定了返回数据的类型
    ) { }

    async randGoods(num: number): Promise<any> {
        let count = await this.goodsCategory.count();
        let offset = Math.floor(Math.random() * (count - num));
        return this.goodsCategory.find({
            select: ['spu_no', 'price', 'cover', 'goods_name'],
            take: num,
            skip: offset
        });
    }
}
