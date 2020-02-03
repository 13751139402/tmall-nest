/*
 * @Author: your name
 * @Date: 2020-01-11 22:30:40
 * @LastEditTime : 2020-02-02 12:09:05
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\order\order.controller.ts
 */
import { Controller, UsePipes, Get, Body, Post } from '@nestjs/common';
import { OrderService, } from './order.service'
import { addShopCartDto } from './dto'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { member } from '../member/member.decorator';
import { ValidationPipe } from '../shared/pipes/validation.pipe';



@ApiTags('order')  // 此模块使用的swagger标签
@ApiBearerAuth() // 启用身份验证
@Controller('order')
export class OrderController {
    constructor(private readonly OrderService: OrderService) { }

    @UsePipes(new ValidationPipe())
    @Post('addShopCart')
    addShopCart(@member('id') userId: number, @Body() data: addShopCartDto) {
        return this.OrderService.addShopCart(data);
    }

    @UsePipes(new ValidationPipe())
    @Get('shopCartTotal')
    shopCartTotal(@member('id') member_Id: number) {
        return this.OrderService.shopCartTotal(member_Id);
    }

    @UsePipes(new ValidationPipe())
    @Get('shopCartList')
    shopCartList(@member('id') member_Id: number) {
        return this.OrderService.shopCartList(member_Id);
    }

}
