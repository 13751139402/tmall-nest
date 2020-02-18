/*
 * @Author: your name
 * @Date: 2020-01-10 13:40:50
 * @LastEditTime : 2020-02-14 14:10:41
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { goods_spu } from './goods_spu.entity'
import { order_product} from '../../order/entity/order_product.entity'
@Entity()
export class shop_info {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    shop_name: string

    @OneToMany(type => goods_spu, goods_spu => goods_spu.shop)
    goods: goods_spu[];

    @OneToMany(type => order_product, order_product => order_product.shop)
    orderList: order_product[];
}