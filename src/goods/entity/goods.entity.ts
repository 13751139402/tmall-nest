/*
 * @Author: your name
 * @Date: 2020-01-10 13:40:50
 * @LastEditTime : 2020-01-17 14:53:53
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { goods_category } from '../category/category.entity'
import { shop_info } from './shop.entity'
@Entity()
export class goods_spu {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    spu_no: string

    @Column()
    goods_name: string;

    @Column()
    price: number;

    @Column()
    cover: string;

    @Column()
    brand_id: string;

    @ManyToOne(type => goods_category, goods_category => goods_category.goods)
    category: goods_category;

    @ManyToOne(type => shop_info, shop_info => shop_info.goods)
    shop: string;

    @Column({ length: 50 })
    turnover: string;
}