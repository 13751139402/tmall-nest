/*
 * @Author: your name
 * @Date: 2020-01-14 13:42:07
 * @LastEditTime : 2020-02-14 15:30:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Editx
 * @FilePath: \tmall-nest\src\goods\dto\searchGoods.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsEmpty } from 'class-validator';
export class findOrderDto {
    @ApiProperty({
        default: 1,
        description: '状态：1.待付款 2.待发货 3.待收货 4.待评价',
        required: false
    })
    status: number

    @ApiProperty({
        default: 1,
        description: '分页的偏移量',
        required: false
    })
    pageSkip: number

    @ApiProperty({
        default: 1,
        description: '每一页的数量',
        required: false
    })
    pageTake: number
}