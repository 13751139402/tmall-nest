/*
 * @Author: your name
 * @Date: 2020-01-11 22:30:40
 * @LastEditTime: 2020-02-18 15:24:46
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\order\order.controller.ts
 */
import {
    Controller,
    UsePipes,
    Get,
    Body,
    Post,
    Delete,
    Param,
    Query,
    Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import {
    addShopCartDto,
    payOrderDto,
    changeGoodsCountDto,
    deleteGoodsDto,
    confirmOrderDto,
    findOrderDto,
} from './dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { member } from '../member/member.decorator';
import { ValidationPipe } from '../shared/pipes/validation.pipe';

@ApiTags('order') // 此模块使用的swagger标签
@ApiBearerAuth() // 启用身份验证
@Controller('order')
export class OrderController {
    constructor(private readonly OrderService: OrderService) { }

    @UsePipes(new ValidationPipe())
    @Post('addShopCart')
    addShopCart(@member('id') userId: number, @Body() data: addShopCartDto) {
        return this.OrderService.addShopCart(Object.assign(data, { userId }));
    }

    @UsePipes(new ValidationPipe())
    @Get('shopCartTotal')
    shopCartTotal(@member('id') memberId: number) {
        return this.OrderService.shopCartTotal(memberId);
    }

    @UsePipes(new ValidationPipe())
    @Get('shopCartList')
    shopCartList(@member('id') memberId: number) {
        return this.OrderService.shopCartList(memberId);
    }

    @UsePipes(new ValidationPipe())
    @Post('changeGoodsCount')
    changeGoodsCount(
        @member('id') userId: number,
        @Body() { id, count }: changeGoodsCountDto,
    ) {
        return this.OrderService.changeGoodsCount(id, count);
    }

    @UsePipes(new ValidationPipe())
    @Delete('deleteGoods')
    deleteGoods(@member('id') userId: number, @Body() { ids }: deleteGoodsDto) {
        return this.OrderService.deleteGoods(ids);
    }

    @UsePipes(new ValidationPipe())
    @Post('findSku')
    async findSku(
        @member('id') userId: number,
        @Body() { params }: confirmOrderDto,
    ) {
        let skuList = await this.OrderService.findSkuData(params);
        return skuList;
    }

    @UsePipes(new ValidationPipe())
    @Post('confirmOrder')
    async confirmOrder(
        @member('id') userId: number,
        @Body() { params }: confirmOrderDto,
    ) {
        let skuList = await this.OrderService.findSkuData(params);
        let len = (skuList as Array<any>).length;
        if (len) {
            return await this.OrderService.createOrder(skuList, userId);
        }
        return '未找到下单商品';
    }

    @UsePipes(new ValidationPipe())
    @Get('findOrder')
    async findOrder(@member('id') userId: number, @Query() { status, pageSkip, pageTake }: findOrderDto) {
        return await this.OrderService.findOrder(userId, status, pageSkip, pageTake);
    }

    @UsePipes(new ValidationPipe())
    @Put('payOrder')
    async payOrder(@member('id') userId: number, @Body() { orderList }: payOrderDto) {
        return await this.OrderService.payOrder(orderList);
    }
}
