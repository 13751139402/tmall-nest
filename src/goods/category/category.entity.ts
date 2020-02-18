/*
 * @Author: your name
 * @Date: 2020-01-17 09:37:03
 * @LastEditTime : 2020-02-04 12:37:11
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\category\category.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';
import { goods_spu } from '../entity/goods_spu.entity'
@Entity()
@Tree("closure-table")
export class goods_category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_name: string;

    @Column({ select: false, nullable: true })
    level: number;

    @Column({ select: false, nullable: true })
    picture: string;

    @TreeChildren()
    children: goods_category[];

    @TreeParent()
    parent: goods_category;

    @OneToMany(type => goods_spu, goods_spu => goods_spu.category)
    goods: goods_spu[];
}