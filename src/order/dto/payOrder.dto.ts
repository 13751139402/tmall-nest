/*
 * @Author: your name
 * @Date: 2020-01-14 13:42:07
 * @LastEditTime: 2020-02-18 15:24:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editx
 * @FilePath: \tmall-nest\src\goods\dto\searchGoods.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEmpty, IsArray } from 'class-validator';
export class payOrderDto {
    @ApiProperty({
        default: [],
        description: '支付的orderList',
    })
    @IsArray()
    orderList: []
}