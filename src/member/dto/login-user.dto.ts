/*
 * @Author: your name
 * @Date: 2020-01-24 17:46:26
 * @LastEditTime : 2020-01-29 14:14:10
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
  username: string;

  @ApiProperty({
    default: '123456',
    description: '账号密码',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}