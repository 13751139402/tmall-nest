/*
 * @Author: your name
 * @Date: 2020-01-18 21:39:06
 * @LastEditTime : 2020-02-02 23:28:53
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\entity\goods_brand.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { goods_spu } from './goods_spu.entity'

@Entity()
export class goods_brand {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @OneToMany(type => goods_spu, goods_spu => goods_spu.brand)
    goods: goods_spu[]

    @Column({ length: 50 })
    brand_name: string
}