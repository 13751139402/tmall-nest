/*
 * @Author: your name
 * @Date: 2020-01-29 14:23:06
 * @LastEditTime : 2020-01-29 15:36:50
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\member\local.stragegy.ts
 */
import { Strategy, IStrategyOptions } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { member_info } from './entity/member_info.entity';
import { HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto'; // 加密
// 首先从body中取数据
// 然后进入validate执行验证逻辑
// 返回数据

// 参数1: PassportStrategy让nestjs读取一个策略
// 参数2: 策略名字，供守卫使用
export class LocalStrategy extends PassportStrategy(Strategy, 'local') { // passport-local 默认策略名字local

    constructor(@InjectRepository(member_info)
    private readonly memberRepository: Repository<member_info>) {
        super({ //usernameField和passwordField自动从req包里获取过来的,然后自动调用validate
            usernameField: 'username', // 用户名和密码可以不写，默认username和password
            passwordField: 'password'
        } as IStrategyOptions) // as明确表示{}是什么类型
    }

    async validate(username: string, password: string) { // 如何执行策略,验证逻辑
        let user = await this.memberRepository.findOne({ where: [{ name: username }, { mobile_number: username }, { mailbox: username }] });
        if (!user) {
            throw new HttpException({ User: '用户名错误' }, 401)
        }
        password = crypto.createHmac('sha256', password).digest('hex');
        user = await this.memberRepository.findOne({ where: [{ name: username, password }, { mobile_number: username, password }, { mailbox: username, password }] })
        if (!user) {
            throw new HttpException({ User: '密码错误' }, 401)
        }
        return user  // 返回查找出来的数据
    }
}