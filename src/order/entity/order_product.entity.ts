/*
 * @Author: your name
 * @Date: 2020-02-12 13:16:48
 * @LastEditTime : 2020-02-14 14:09:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\order\entity\order_product.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { goods_spu } from '../../goods/entity/goods_spu.entity'
import { goods_sku } from '../../goods/entity/goods_sku.entity'
import { shop_info } from '../../goods/entity/shop_info.entity'
import { order_info } from './order_info.entity'
@Entity()
export class order_product {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => order_info, order_info => order_info.orderProduct)
    order: order_info;    // 订单Id

    @OneToOne(type => goods_spu)
    @JoinColumn({ name: 'spuId', referencedColumnName: 'id' })
    spuId: goods_spu;    // spuId 

    @OneToOne(type => goods_sku)
    @JoinColumn({ name: 'skuId', referencedColumnName: 'id' })
    skuId: goods_sku;    // skuId 

    @ManyToOne(type => shop_info, shop_info => shop_info.orderList)
    shop: shop_info;  // shop_id 

    @Column()
    product_name: string;  // 商品名称

    @Column()
    product_amount: number; // 商品数量

    @Column()
    product_price: number;  // 商品价格

}