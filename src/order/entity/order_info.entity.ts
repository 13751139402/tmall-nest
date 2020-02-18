/*
 * @Author: your name
 * @Date: 2020-02-12 12:37:14
 * @LastEditTime : 2020-02-14 15:04:11
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\order\entity\order_info.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { order_product } from './order_product.entity'
@Entity()
export class order_info {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    order_no: string;  // 订单编号 

    @Column()
    itemCount: number; // 商品项总数

    @Column()
    member_id: number  // 用户Id

    @Column()
    pay_ment: number   // 支付方式

    @Column({ type: 'datetime' })
    pay_time: string   // 支付时间

    @Column()
    shipping_method: number // 配送方式 1.顺丰

    @Column({ type: 'datetime' })
    expect_harvest_time: string // 预期到达时间

    @Column()
    freight: Number       // 运费

    @Column()
    total_amount: Number // 订单总额

    @Column()
    pay_total: Number    // 实际付款

    @Column({ type: 'datetime' })
    status: Number        // 状态：1.待付款 2.待发货 3.待收货 4.待评价

    @Column()
    order_time:string
    
    @OneToMany(type => order_product, order_product => order_product.order)
    orderProduct: order_product[];
}
