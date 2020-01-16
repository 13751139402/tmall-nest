/*
 * @Author: your name
 * @Date: 2020-01-13 09:20:01
 * @LastEditTime : 2020-01-14 16:04:03
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.service.ts
 */
import { Injectable, } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { goods_spu } from './goods.entity'
import { goods_category } from './category/category.entity'
import { HttpException } from '@nestjs/common/exceptions/http.exception';
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

    async searchGoods(searchKey: string, pageNum: number = 1, pageSize: number = 60): Promise<any> {
        pageNum = Number(pageNum);
        pageSize = Number(pageSize);
        // const categoryData = await (await this.goodsCategory.findOne({ select: ['id'], where: { category_name: searchKey } }));
        // if (!categoryData) {
        //     return `喵~没找到与“ ${searchKey} ”相关的商品哦。`;
        // }
        // const goodsList = await this.goodsSpu.find({
        //     join: {
        //         alias: "shop_info",
        //         leftJoinAndSelect: {
        //             id: "shop_id",
        //         }
        //     },
        //     where: {
        //         category_id: categoryData.id,
        //     },
        //     skip: (pageNum - 1) * pageSize,
        //     take: pageSize
        // })
        // if (!goodsList.length) {
        //     return `喵~没找到与“ ${searchKey} ”相关的商品哦。`;
        // }
        let goodsList = await this.goodsCategory.find({ relations: ['goods_spu'] });
        return goodsList;
    }
}
