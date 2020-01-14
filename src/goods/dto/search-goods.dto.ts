/*
 * @Author: your name
 * @Date: 2020-01-14 13:42:07
 * @LastEditTime : 2020-01-14 15:57:51
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\dto\searchGoods.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';

export class SearchGoodsDto {


    @ApiProperty({
        default: '手机',
        description: '查询关键字',
    })
    @IsNotEmpty()
    searchKey: string;

    @ApiProperty({
        default: 1,
        description: '分页页码',
    })
    @IsNotEmpty()
    @IsNumberString()
    pageNum: number;

    @ApiProperty({
        default: 60,
        description: '分页数量',
    })
    @IsNotEmpty()
    @IsNumberString()
    pageSize: number;
}