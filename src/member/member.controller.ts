/*
 * @Author: your name
 * @Date: 2020-01-11 22:30:40
 * @LastEditTime : 2020-01-25 18:11:21
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\member\member.controller.ts
 */
import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes, Query } from '@nestjs/common';
import { Request } from 'express';
import { MemberService } from './member.service';
import { UserRO } from './member.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { SearchGoodsDto, randGoodsDto, goodsDetailDto } from '../goods/dto'
import { member } from './member.decorator';
import {
    ApiTags,
    ApiBearerAuth
} from '@nestjs/swagger';

@ApiBearerAuth() // 启用身份验证
@ApiTags('member')  // 此模块使用的swagger标签
@Controller('member')
export class MemberController {
    constructor(private readonly MemberService: MemberService) { }

    @Get('user')
    async findMe(@member('id') id: number): Promise<UserRO> {// @User修饰器获取req.user.id

        return await this.MemberService.findById(id);
    }

    @UsePipes(new ValidationPipe()) // Pipe会在调用方法之前处理，用于转换和验证
    @Post('create')
    async create(@Body() userData: CreateUserDto) {
        return this.MemberService.create(userData);
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    async login(@Body() loginUserDto: LoginUserDto): Promise<UserRO> {
        const _user = await this.MemberService.findOne(loginUserDto);

        const User = { User: '用户登录失败' };
        if (!_user) {
            throw new HttpException({ User }, 401)
        }

        const token = await this.MemberService.generateJWT(_user); // 将取出的token转化为token
        const { name, mailbox, mobile_number, portrait } = _user;
        const user = { name, mailbox, mobile_number, portrait, token };
        return { user } // 返回登录的用户数据，包含token
    }
}
