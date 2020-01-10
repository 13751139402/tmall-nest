/*
 * @Author: your name
 * @Date: 2020-01-10 13:40:50
 * @LastEditTime : 2020-01-10 14:57:40
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class goods_spu {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    spu_no: string;

    @Column()
    goods_name: string;

    @Column()
    price: number;

    @Column()
    cover: string;

    @Column()
    brand_id: string;

    @Column()
    category_id: number;

    @Column({ length: 50 })
    shop_id: string;

    @Column({ length: 50 })
    turnover: string;
}