/*
 * @Author: your name
 * @Date: 2020-01-11 22:30:40
 * @LastEditTime : 2020-02-02 09:45:30
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\member\member.controller.ts
 */
import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes, Query, UseGuards, Req, Request, Response, Res } from '@nestjs/common';

import { MemberService } from './member.service';
import { UserRO } from './member.interface';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ValidationPipe } from '../shared/pipes/validation.pipe';
import { SearchGoodsDto, randGoodsDto, goodsDetailDto } from '../goods/dto'
import { member } from './member.decorator';
import { JwtService } from '@nestjs/jwt';
import {
    ApiTags,
    ApiBearerAuth
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiBearerAuth() // 启用身份验证
@ApiTags('member')  // 此模块使用的swagger标签
@Controller('member')
export class MemberController {
    constructor(
        private readonly MemberService: MemberService) { }

    @Get('user')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth() // 表示这个接口需要传递token
    async findMe(@member('id') id: number, @Req() req, @Res() res) {// @User修饰器获取req.user.id
        let data = await this.MemberService.findById(id);
        res.cookie("token", data.user, {
            maxAge: 900000, httpOnly: false
        });
        res.send(data) // 返回登录的用户数据，包含token
    }


    @UsePipes(new ValidationPipe()) // Pipe会在调用方法之前处理，用于转换和验证
    @Post('create')
    async create(@Body() userData: CreateUserDto) {
        return this.MemberService.create(userData);
    }

    @UsePipes(new ValidationPipe())
    @Post('login')
    @UseGuards(AuthGuard('local')) // 使用一个守卫,认证守卫local 验证账号密码是否正确
    // req==》中间件==》管道==》守卫==》router
    // local守卫会把返回数据保存到req.user
    async login(@Body() dto: LoginUserDto, @Req() { user }, @Res() res) {
        const data = await this.MemberService.buildUserRO(user); // 将取出的token转化为token
        res.cookie("token", data.user, { maxAge: 900000, httpOnly: false });
        res.send(data) // 返回登录的用户数据，包含token
    }
}
