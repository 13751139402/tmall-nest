/*
 * @Author: your name
 * @Date: 2020-01-14 13:42:07
 * @LastEditTime : 2020-02-07 22:14:12
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Editx
 * @FilePath: \tmall-nest\src\goods\dto\searchGoods.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsArray, IsString } from 'class-validator';

export class deleteGoodsDto {
    @ApiProperty({
        default: {
            description: '删除的id数组'
        },
    })
    @IsNotEmpty()
    ids: number[]
}