/*
 * @Author: your name
 * @Date: 2019-12-24 09:31:40
 * @LastEditTime : 2020-01-29 16:29:11
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs-realworld-example-app\src\user\auth.middleware.ts
 */
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'; // 跨域认证
import { MemberService } from './member.service';

// ------------跨域认证
// 1.用户登陆时，服务器下发加密token至浏览器的cookie   (一般token中只有用户id,重要数据，如密码,token被人解锁就会很危险)
// 2.用户使用接口时,浏览器从cookie中取出token放在req.headers.authorization
// 3。服务器核实authorization,从数据库中取用户数据用于认证

@Injectable()
export class AuthMiddleware implements NestMiddleware { // 自定义中间键 需要实现 NestMiddleware
    constructor(private readonly MemberService: MemberService) { } // 属性 MemberService

    /**
     * @description: 找到req.headers.authorization(token)
     * @param {type} 
     * @return: 
     */
    async use(req: Request, res: Response, next: NextFunction) { // 传入的参数需要遵循接口
        const authHeaders = req.headers.authorization; // 获取头部授权数据
        if (authHeaders && (authHeaders as string).split(' ')[1]) { // 获取第一位
            const token = (authHeaders as string).split(' ')[1]; // 第一位为token
            // 公钥和私钥是成对的，它们互相解密。
            // 公钥加密，私钥解密。
            // 私钥数字签名，公钥验证

            // 如果token解析失败或者token已经过期，则都会返回err，只有正确解析出用户数据才会返回data
            let decoded: any = {};
            try {
                decoded = jwt.verify(token, process.env.SECERT); // token服务器下发浏览器时通过密钥加密，此处密钥核实，防止浏览器数据篡改
            } catch (error) {
                throw new HttpException('TOKEN认证失败', HttpStatus.UNAUTHORIZED); // 没有则报错
            }

            const user = await this.MemberService.findById(decoded.id); // 从数据库中找到user

            if (!user) {
                throw new HttpException('用户没有找到.', HttpStatus.UNAUTHORIZED); // 没有则报错
            }

            req['user'] = user.user; // 将user 添加至 req
            next(); // 跳至下一个中间jian

        } else {
            throw new HttpException('未经授权.', HttpStatus.UNAUTHORIZED); // UNAUTHORIZE 未授权
        }
    }
    
}
