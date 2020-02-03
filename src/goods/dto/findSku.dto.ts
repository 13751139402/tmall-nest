/*
 * @Author: your name
 * @Date: 2020-01-14 13:42:07
 * @LastEditTime : 2020-02-01 13:43:44
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Editx
 * @FilePath: \tmall-nest\src\goods\dto\searchGoods.dto.ts
 */
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumberString } from 'class-validator';

export class findSkuDto {
    @ApiProperty({
        default: '606083340560',
    })
    @IsNumberString()
    spuId: string;

    @ApiProperty({
        default: {},
    })
    @IsArray()
    specData: Array<string>;
}