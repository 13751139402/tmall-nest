/*
 * @Author: your name
 * @Date: 2020-01-14 13:42:07
 * @LastEditTime : 2020-02-04 21:55:52
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Editx
 * @FilePath: \tmall-nest\src\goods\dto\searchGoods.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsNumber } from 'class-validator';

export class addShopCartDto {
    @ApiProperty({
        default: {
            default: '589821884061',
            description: '商品spuId'
        },
    })
    @IsNotEmpty()
    spuId: string

    @ApiProperty({
        default: '10006493',
        description: '商品skuId'
    })
    @IsNotEmpty()
    skuId: string;

    @ApiProperty({
        default: '6',
        description: '用户Id'
    })
    @IsNotEmpty()
    memberId: string;

    @ApiProperty({
        default: 1,
        description: '商品数量'
    })
    @IsNumber()
    product_amount: Number;
}