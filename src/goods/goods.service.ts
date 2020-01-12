import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { goods_spu } from './goods.entity'
import { goods_category } from './category/category.entity'
import { Repository } from 'typeorm';


@Injectable()
export class GoodsService {
    constructor(
        @InjectRepository(goods_spu) // 将已注册的entity注入到service中 // 修饰器将entity修饰注入到类中
        private readonly goodsSpu: Repository<goods_spu>, // 接口规定了返回数据的类型
        @InjectRepository(goods_category) // 将已注册的entity注入到service中 // 修饰器将entity修饰注入到类中
        private readonly goodsCategory: Repository<goods_category>, // 接口规定了返回数据的类型

    ) { }

    async randGoods(num: number): Promise<any> {

        let count = await this.goodsSpu.count();
        let offset = Math.floor(Math.random() * (count - num));
        return this.goodsSpu.find({
            select: ['spu_no', 'price', 'cover', 'goods_name'],
            take: num,
            skip: offset
        });
    }

    async searchGoods(searchKey: string, pageNum: number, pageSize: number): Promise<any> {
        let categoryId = await this.goodsCategory.find({ select: ['id'], where: { category_name: searchKey } });
        return categoryId;
    }
}
