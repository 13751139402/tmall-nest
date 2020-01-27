/*
 * @Author: your name
 * @Date: 2020-01-24 17:46:26
 * @LastEditTime : 2020-01-25 18:03:00
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\member\dto\login-user.dto.ts
 */
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {

  @ApiProperty({
    default: '落魄前端在线求职',
    description: '账号名称/可用于登录',
  })
  @IsNotEmpty()
  @IsString()
  account: string;

  @ApiProperty({
    default: '123456',
    description: '账号密码',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}