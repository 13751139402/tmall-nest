/*
 * @Author: your name
 * @Date: 2020-01-29 15:50:19
 * @LastEditTime : 2020-01-29 16:34:09
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\member\jwt.stragegy.ts
 */
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { member_info } from './entity/member_info.entity';
import { Repository } from 'typeorm';
// 1 把token取出来
// 2 验证token
// 3 取出数据

export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(member_info)
        private readonly memberRepository: Repository<member_info>
    ) {
        super({
            // 获得req.headers.authorization , Bearer 取出空格后面的token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.SECRET // 通过secret解密
        } as StrategyOptions);
    }

    async validate(data) {
        return data
    }
}
