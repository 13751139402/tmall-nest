/*
 * @Author: your name
 * @Date: 2020-01-11 22:30:40
 * @LastEditTime : 2020-02-02 23:20:57
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\order\order.service.ts
 */
import { Injectable } from '@nestjs/common';
import { order_cart } from './entity/order_cart.entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(order_cart)
        private readonly orderCart: Repository<order_cart>,
    ) { }
    async addShopCart(data) {
        const { member_ld, skuId, product_amount } = data;
        const oldData = await this.orderCart.findOne({ where: { member_ld, skuId } });
        if (oldData) {
            oldData.product_amount += product_amount;
            await this.orderCart.save(oldData);
            return "添加数量成功"
        } else {
            const cart = new order_cart();
            Object.assign(cart, data)
            await this.orderCart.save(cart);
            return "添加新商品成功"
        }
    }

    async shopCartTotal(member_Id) {
        const data = await this.orderCart.createQueryBuilder("shopCart")
            .where("shopCart.member_Id = :member_Id", { member_Id })
            .getCount();
        return data;
    }

    async shopCartList(member_Id) {
        const data = await this.orderCart.createQueryBuilder("shopCart")
            .innerJoin("shopCart.spuId", "spuId")
            .where("shopCart.member_Id = :member_Id", { member_Id })
            .getCount();
        return data;
    }
}
