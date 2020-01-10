/*
 * @Author: your name
 * @Date: 2020-01-02 10:10:18
 * @LastEditTime : 2020-01-10 15:06:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.controller.ts
 */
import { Controller, Get, Query } from '@nestjs/common';
import { GoodsService } from './goods.service'

@Controller('goods')
export class GoodsController {
    constructor(private readonly GoodsService: GoodsService) { }


    @Get()
    findRoot() {
        return 'goods';
    }

    @Get('randGoods')
    randGoods(@Query() { num }) {
        return this.GoodsService.randGoods(num);
    }

}
