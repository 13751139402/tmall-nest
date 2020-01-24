/*
 * @Author: your name
 * @Date: 2020-01-24 17:22:40
 * @LastEditTime : 2020-01-24 21:01:59
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\member\dto\create-user.dto.ts
 */
import { IsNotEmpty, IsNumber, IsEmail, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {

    @ApiProperty({
        default: '落魄前端在线求职',
        description: '账号名称/可用于登录',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        default: '123456',
        description: '账号密码',
    })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        default: 13751139402,
        description: '账号手机号/可用于登录',
    })
    @IsNotEmpty()
    @IsNumber()
    mobile_number: number;

    @ApiProperty({
        default: '1437491371@qq.com',
        description: '账号邮箱/可用于登录',
    })
    // @IsEmail()
    mailbox: string;

    @ApiProperty({
        default: 'http://b-ssl.duitang.com/uploads/item/201709/02/20170902135603_2mYKC.thumb.700_0.jpeg',
        description: '账号头像',
    })
    // @IsUrl()
    portrait: string;
}