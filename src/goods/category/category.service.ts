import { TreeRepository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { goods_category } from './category.entity'

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(goods_category) // 将已注册的entity注入到service中 // 修饰器将entity修饰注入到类中
        private readonly goodsCategory: TreeRepository<goods_category>, // 接口规定了返回数据的类型
    ) { }
    async findRoot(): Promise<any[]> {
        const rootCategories = await this.goodsCategory.findRoots();
        let promiseList = rootCategories.reduce((target, item) => {
            target.push(this.goodsCategory
                .createDescendantsQueryBuilder("category", "categoryClosure", item)
                .andWhere("level = '1'")
                .select(["category.id", "category.category_name"])
                .getMany())
            return target;
        }, [])
        let list = await Promise.all(promiseList);
        rootCategories.map((item, index) => {
            return item.children = list[index]
        })
        return rootCategories;
    }

    async findDescendantsTree(rootId: number): Promise<any[]> {
        let parent = new goods_category();
        parent.id = rootId;
        const rootCategories = await this.goodsCategory
            .createDescendantsQueryBuilder("category", "categoryClosure", parent)
            .andWhere("category.level IS NULL")
            .select(["category.id", "category.category_name"])
            .getMany()
        let promiseList = rootCategories.reduce((target, item) => {
            target.push(this.goodsCategory
                .createDescendantsQueryBuilder("category", "categoryClosure", item)
                .select(["category.id", "category.category_name", "category.category_name"])
                .getMany())
            return target;
        }, [])
        let list = await Promise.all(promiseList);
        rootCategories.map((item, index) => {
            return item.children = list[index]
        })
        return rootCategories;
    }
}
