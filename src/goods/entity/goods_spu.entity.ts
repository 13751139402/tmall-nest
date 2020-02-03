/*
 * @Author: your name
 * @Date: 2020-01-10 13:40:50
 * @LastEditTime : 2020-02-02 23:15:36
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { goods_category } from '../category/category.entity'
import { shop_info } from './shop_info.entity'
import { goods_spec } from "./goods_spec.entity";
import { goods_brand } from "./goods_brand.entity";
import { goods_spu_preview } from './goods_spu_preview.entity';
import { goods_spu_content } from './goods_spu_content.entity';
import { goods_sku } from './goods_sku.entity';
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

    @ManyToOne(type => goods_brand, goods_brand => goods_brand.goods)
    brand: string;

    @ManyToOne(type => goods_category, goods_category => goods_category.goods)
    category: goods_category;

    @ManyToOne(type => shop_info, shop_info => shop_info.goods)
    shop: string;

    @Column({ length: 50 })
    turnover: string;

    @ManyToMany(type => goods_spec) // 这是一个多对多关系，此属性对应goods_spec这个实体
    @JoinTable({ name: 'goods_spu_spec', joinColumn: { name: 'spu_id' }, inverseJoinColumn: { name: 'spec_id' } }) // 设置中间表
    spec: goods_spec[]; // 返回属性spec,内容为goods_spec实体组成的数组

    @OneToMany(type => goods_spu_preview, goods_spu_preview => goods_spu_preview.spu) // 1个spu 有多个preview,
    preview: goods_spu_preview[]; // 返回单个spu对应的多个preview,数组 

    @OneToMany(type => goods_spu_content, goods_spu_content => goods_spu_content.spu) // 1个spu 有多个preview,
    content: goods_spu_content[]; // 返回单个spu对应的多个preview,数组 

    @OneToMany(type => goods_sku, goods_sku => goods_sku.spu)
    sku: goods_sku[];
}