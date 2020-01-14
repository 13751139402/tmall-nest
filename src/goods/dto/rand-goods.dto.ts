/*
 * @Author: your name
 * @Date: 2020-01-14 13:42:07
 * @LastEditTime : 2020-01-14 16:03:07
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\dto\searchGoods.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class randGoodsDto {
    @ApiProperty({
        default: '8',
        description: '随机输出商品数量',
    })
    @IsNotEmpty()
    @IsNumberString()
    num: number;
}