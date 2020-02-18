/*
 * @Author: your name
 * @Date: 2020-01-14 13:42:07
 * @LastEditTime : 2020-02-11 15:47:40
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Editx
 * @FilePath: \tmall-nest\src\goods\dto\searchGoods.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
interface params {
    skuId: Number,
    product_amount: Number
}

export class confirmOrderDto {
    @ApiProperty({
        default: {
            description: '查询的SKU数组。[{skuId,product_amount}]'
        },
    })
    @IsArray()
    params: params[]
}