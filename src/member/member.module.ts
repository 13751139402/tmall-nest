/*
 * @Author: your name
 * @Date: 2020-01-11 22:30:40
 * @LastEditTime : 2020-01-29 17:02:10
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\member\member.module.ts
 */
import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { member_info } from './entity/member_info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.stragegy'
import { JwtStrategy } from './jwt.stragegy';
@Module({
  controllers: [MemberController],
  providers: [MemberService, LocalStrategy, JwtStrategy], // 注册守卫
  imports: [TypeOrmModule.forFeature([member_info]), PassportModule] // 导入Passport模块
})
export class MemberModule { }
