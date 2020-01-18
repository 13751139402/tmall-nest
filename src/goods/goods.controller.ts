/*
 * @Author: your name
 * @Date: 2020-01-02 10:10:18
 * @LastEditTime : 2020-01-14 16:02:52
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.controller.ts
 */
import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { GoodsService, } from './goods.service'

import {
    ApiTags
} from '@nestjs/swagger';
import { SearchGoodsDto, randGoodsDto } from './dto'
import { ValidationPipe } from '../shared/pipes/validation.pipe';


@ApiTags('goods')  // 此模块使用的swagger标签

@Controller('goods')
export class GoodsController {
    constructor(private readonly GoodsService: GoodsService) { }

    @UsePipes(new ValidationPipe())
    @Get('randGoods')
    randGoods(@Query() { num }: randGoodsDto) {
        return this.GoodsService.randGoods(num);
    }

    @UsePipes(new ValidationPipe())
    @Get('searchGoods')
    searchGoods(@Query() { searchKey, pageNum, pageSize }: SearchGoodsDto) {
        return this.GoodsService.searchGoods(searchKey, pageNum, pageSize);
    }

    @Get('goodsDetails')
    goodsDetails(@Query() { spu_id }) {
        return this.GoodsService.goodsDetails(spu_id);
    }

}
