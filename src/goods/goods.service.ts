/*
 * @Author: your name
 * @Date: 2020-01-13 09:20:01
 * @LastEditTime : 2020-01-24 00:28:52
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.service.ts
 */
import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { goods_spu, goods_category } from './entity';
import { shuffle } from '../util'
import { Repository } from 'typeorm';


@Injectable()
export class GoodsService {
    constructor(
        @InjectRepository(goods_spu) // 将已注册的entity注入到service中 // 修饰器将entity修饰注入到类中
        private readonly goodsSpu: Repository<goods_spu>, // 接口规定了返回数据的类型
        @InjectRepository(goods_category) // 将已注册的entity注入到service中 // 修饰器将entity修饰注入到类中
        private readonly goodsCategory: Repository<goods_category>, // 接口规定了返回数据的类型

    ) { }

    /**
     * 随机获取商品
     **/
    async randGoods(num: number): Promise<any> {

        let count = await this.goodsSpu.count();
        let offset = Math.floor(Math.random() * (count - num));
        let goodsList = await this.goodsSpu.find({
            select: ['spu_no', 'price', 'cover', 'goods_name'],
            take: num,
            skip: offset
        });

        return shuffle(goodsList);
    }

    /**
     * 搜索商品,分类名称获得分类商品
     **/
    async searchGoods(searchKey: string, pageNum: number = 1, pageSize: number = 60): Promise<any> {
        pageNum = Number(pageNum);
        pageSize = Number(pageSize);
        const goodsList = await this.goodsSpu.createQueryBuilder("goods")
            .innerJoinAndSelect("goods.category", "category", "category.category_name = :searchKey", { searchKey })
            .innerJoinAndSelect("goods.shop", "shop")
            .skip((pageNum - 1) * pageSize)
            .take(pageSize)
            .select(['goods.id', 'goods.goods_name', 'goods.price', 'goods.cover', 'goods.shop_id', 'goods.turnover', 'shop.id', 'shop.shop_name'])
            .getManyAndCount()
        if (goodsList[1]) {
            goodsList[0] = shuffle(goodsList[0]);
            return goodsList;
        } else {
            return `喵~没找到与“ ${searchKey} ”相关的 商品 哦，要不您换个关键词我帮您再找找看`
        }
    }

    async goodsDetails(spu_id: Number) {

        const goodsDetails = await this.goodsSpu.findOne({ relations: ["spec", 'spec.values', 'shop', 'brand', 'preview','content'], where: { id: spu_id } });
        console.log(goodsDetails);
        return goodsDetails;
    }
}
