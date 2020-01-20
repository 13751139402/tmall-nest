/*
 * @Author: your name
 * @Date: 2020-01-14 13:42:07
 * @LastEditTime : 2020-01-20 16:30:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Editx
 * @FilePath: \tmall-nest\src\goods\dto\searchGoods.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class goodsDetailDto {
    @ApiProperty({
        default: '14330035263',
        description: '通过spu_id获取商品详情',
    })
    @IsNotEmpty()
    @IsNumberString()
    spu_id: number;
}