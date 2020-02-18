/*
 * @Author: your name
 * @Date: 2020-01-11 22:30:40
 * @LastEditTime: 2020-02-18 10:26:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\order\order.service.ts
 */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { order_info, order_cart, order_product } from './entity/'
import { goods_sku } from '../goods/entity'
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { async } from 'rxjs/internal/scheduler/async';
const Snowflake = require('@zekro/snowflake-js');
@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(order_cart)
        private readonly orderCart: Repository<order_cart>,
        @InjectRepository(order_info)
        private readonly orderInfo: Repository<order_info>,
        @InjectRepository(order_product)
        private readonly orderProduct: Repository<order_product>,
        @InjectRepository(goods_sku)
        private readonly goodsSku: Repository<goods_sku>,
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
            Object.assign(data, cart)
            await this.orderCart.save(data);
            return "添加新商品成功"
        }
    }

    async shopCartTotal(memberId) {
        const data = await this.orderCart.createQueryBuilder("shopCart")
            .where("shopCart.memberId = :memberId", { memberId })
            .getCount();
        return data;
    }

    async shopCartList(memberId) {
        // const data = await this.orderCart.find({ relations: ["spu", 'spu.shop', "sku", 'sku.specValue','sku.specValue.spec'], where: { memberId } });
        const data = await this.orderCart.createQueryBuilder("shopCart")
            .innerJoinAndSelect("shopCart.spu", "spu")
            .innerJoinAndSelect("spu.shop", "shop")
            .innerJoinAndSelect("shopCart.sku", "sku")
            .innerJoinAndSelect("sku.specValue", "specValue")
            .innerJoinAndSelect("specValue.spec", "spec")
            .where("shopCart.memberId = :memberId", { memberId })
            .getMany()

        let list = [];
        let findListItem = (shopId) => {
            return list.find((item) => {
                return item.id === shopId
            })
        }
        data.forEach((item) => {
            let { id, shop_name } = item.spu.shop;
            let listItem = findListItem(id);
            if (listItem) {
                listItem.goods.push(item)
            } else {
                let temp = {
                    id,
                    shop_name,
                    goods: []
                }
                temp.goods.push(item);
                list.push(temp);
            }
        })
        list.forEach(({ goods }) => {
            goods.forEach(goods => {
                let { sku: { specValue } } = goods;
                specValue.forEach(({ spec_value_cover }) => {
                    if (spec_value_cover) {
                        goods.spu.cover = spec_value_cover;
                    }
                });
            });
        });
        return list;
    }

    async changeGoodsCount(id, count) {
        let goods = await this.orderCart.findOne(id)
        if (!goods) {
            throw new HttpException({ message: `${id}未找到` }, HttpStatus.BAD_REQUEST);
        }
        goods.product_amount = count;
        await this.orderCart.save(goods);
        return `修改id:${id},数量为:${count}`
    }

    async deleteGoods(ids: number[]) {
        let data = await this.orderCart.findByIds(ids);
        let delData = await this.orderCart.remove(data);
        return `删除完成`
    }

    findSkuData(params) {
        return new Promise(async (resolve) => {
            let skuIdList = params.map((item) => {
                return item.skuId
            })
            let initData = await this.goodsSku.findByIds(skuIdList, { relations: ['specValue', 'specValue.spec', 'spu', 'spu.shop'] });
            let data = initData.map((item) => {
                let { id } = item;
                let index = params.findIndex((item) => {
                    return item.skuId == id;
                })
                Reflect.set(item, 'product_amount', params[index].product_amount);
                return item;
            })

            let list = [];
            let findListItem = (shopId) => {
                return list.find((item) => {
                    return item.id === shopId
                })
            }
            data.forEach((item) => {
                if (!item.spu.shop) {
                    return;
                }
                let { id, shop_name } = item.spu.shop;
                let listItem = findListItem(id);
                if (listItem) {
                    listItem.goods.push(item)
                } else {
                    let temp = {
                        id,
                        shop_name,
                        goods: []
                    }
                    temp.goods.push(item);
                    list.push(temp);
                }
            })
            list.forEach(({ goods: shopList }) => {
                shopList.forEach((shopGoods) => {
                    let { specValue } = shopGoods;
                    specValue.forEach(({ spec_value_cover }) => {
                        if (spec_value_cover) {
                            shopGoods.spu.cover = spec_value_cover;
                        }
                    });
                });
            });
            resolve(list);
        })
    }

    createOrder(skuList, member_id) {
        return new Promise(async (resolve) => {
            let orderIdList = [];
            let snowflake = new Snowflake.Node(1);
            for (const shopCart of skuList) {
                const orderInfo = new order_info();
                orderInfo.order_no = snowflake.next();
                orderInfo.itemCount = shopCart.goods.length;
                orderInfo.member_id = member_id;
                let orderInfoInstance = await this.orderInfo.save(orderInfo);
                orderIdList.push(orderInfoInstance.id);
                let goodsList = shopCart.goods;
                for (const goods of goodsList) {
                    const orderProduct = new order_product();
                    orderProduct.spuId = goods.spu.id
                    orderProduct.skuId = goods.id;
                    orderProduct.shop = goods.spu.shop && goods.spu.shop.id;
                    orderProduct.product_name = goods.spu.goods_name;
                    orderProduct.product_amount = goods.product_amount;
                    orderProduct.product_price = goods.price;
                    orderProduct.order = orderInfoInstance;
                    await this.orderProduct.save(orderProduct);
                    await this.goodsSku.update({ id: goods.id }, { stock: goods.stock - goods.product_amount })
                    await this.orderCart.delete({ skuId: goods.id });
                }
            }
            let data = await this.orderInfo.findByIds(orderIdList, { relations: ["orderProduct", "orderProduct.shop"] });
            resolve(data);
        })
    }

    async findOrder(member_id, status = 0, pageSkip = 1, pageTake = 15) {
        const qb = await this.orderInfo.createQueryBuilder("order")
            .innerJoinAndSelect("order.orderProduct", "orderProduct")
            .innerJoinAndSelect("orderProduct.spuId", "spuId")
            .innerJoinAndSelect("orderProduct.shop", "shop")
            .innerJoinAndSelect("orderProduct.skuId", "skuId")
            .innerJoinAndSelect("skuId.specValue", "specValue")
            .innerJoinAndSelect("specValue.spec", "spec")
            .where("order.member_id = :member_id", { member_id })
            .orderBy("order.order_time", 'DESC')
            .skip((pageSkip - 1) * pageTake)
            .take(pageTake)
        if (status) {
            qb.andWhere("order.status = :status", { status })
        }
        let list = await qb.getMany();
        list.forEach(({ orderProduct }) => {
            orderProduct.forEach(({ skuId, spuId }) => {
                let { specValue } = skuId;
                specValue.forEach(({ spec_value_cover }) => {
                    if (spec_value_cover) {
                        spuId.cover = spec_value_cover;
                    }
                });
            });
        });
        let count = [];
        for (let index = 0; index < 4; index++) {
            if (index) {
                count.push(this.orderInfo.count({ status: index }))
            } else {
                count.push(this.orderInfo.count())
            }
        }
        let countList = await Promise.all(count)
        return [list, countList];
    }
}
