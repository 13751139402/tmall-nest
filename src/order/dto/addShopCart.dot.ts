/*
 * @Author: your name
 * @Date: 2020-01-14 13:42:07
 * @LastEditTime : 2020-02-01 18:24:53
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Editx
 * @FilePath: \tmall-nest\src\goods\dto\searchGoods.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumberString, IsNumber } from 'class-validator';

export class addShopCartDto {
    @ApiProperty({
        default: {
            default: '589821884061',
            description: '商品spuId'
        },
    })
    @IsNumberString()
    spuId: string

    @ApiProperty({
        default: '10006493',
        description: '商品skuId'
    })
    @IsNumberString()
    skuId: string;

    @ApiProperty({
        default: '6',
        description: '用户Id'
    })
    @IsNumberString()
    member_Id: string;

    @ApiProperty({
        default: 1,
        description: '商品数量'
    })
    @IsNumber()
    product_amount: Number;
}