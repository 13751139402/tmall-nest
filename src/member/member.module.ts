/*
 * @Author: your name
 * @Date: 2020-01-11 22:30:40
 * @LastEditTime: 2020-01-24 19:42:42
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\member\member.module.ts
 */
import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { member_info } from './entity/member_info.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  controllers: [MemberController],
  providers: [MemberService],
  imports: [TypeOrmModule.forFeature([member_info])]
})
export class MemberModule { }
