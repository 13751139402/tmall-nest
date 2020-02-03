/*
 * @Author: your name
 * @Date: 2020-01-24 15:46:55
 * @LastEditTime : 2020-02-03 22:09:06
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\member\entity\member_info.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';

@Entity()
export class order_cart {
    @PrimaryGeneratedColumn()
    id: number;

    // @Column({ type: 'bigint', width: 20 })
    // // @OneToOne(type => goods_spu)
    // // @JoinColumn()
    // spuId: number

    @Column()
    skuId: number

    @Column()
    member_Id: number

    @Column()
    product_amount: number

    @Column()
    type: number
}
