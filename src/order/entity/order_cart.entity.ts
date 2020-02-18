/*
 * @Author: your name
 * @Date: 2020-01-24 15:46:55
 * @LastEditTime : 2020-02-04 21:45:09
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\member\entity\member_info.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { goods_spu } from '../../goods/entity/goods_spu.entity'
import { goods_sku } from '../../goods/entity/goods_sku.entity'
@Entity()
export class order_cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    spuId: number;

    @Column()
    skuId: string;

    @Column({ name: "memberId" })
    memberId: number

    @Column()
    product_amount: number

    @Column({ default: 1 })
    type: number

    @OneToOne(type => goods_spu)
    @JoinColumn()
    spu: goods_spu

    @OneToOne(type => goods_sku)
    @JoinColumn()
    sku: goods_sku
}
