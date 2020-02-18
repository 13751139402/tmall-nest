/*
 * @Author: your name
 * @Date: 2020-01-14 13:42:07
 * @LastEditTime : 2020-02-07 17:00:45
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Editx
 * @FilePath: \tmall-nest\src\goods\dto\searchGoods.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsNumber } from 'class-validator';

export class changeGoodsCountDto {
    @ApiProperty({
        default: {
            description: '需要修改的购物车商品id'
        },
    })
    @IsNumber()
    id: number

    @ApiProperty({
        description: '修改的购物车商品数量'
    })
    @IsNumber()
    count: number;
}