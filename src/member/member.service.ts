/*
 * @Author: your name
 * @Date: 2020-01-11 22:30:40
 * @LastEditTime : 2020-01-24 23:08:20
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\member\member.service.ts
 */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { member_info } from './entity/member_info.entity';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
const jwt = require('jsonwebtoken');
import { SECRET } from '../config';
import { UserRO } from './member.interface';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import * as crypto from 'crypto'; // 加密

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(member_info)
        private readonly memberRepository: Repository<member_info>
    ) { }

    /**
     * @description: 通过id进行查找用户,返回时带上token
     * @param {type} 
     * @return: 
     */
    async findById(id: number): Promise<UserRO> {
        const user = await this.memberRepository.findOne({ where: { id } });
        if (!user) {
            const errors = { User: '用户数据没有找到' };
            throw new HttpException({ errors }, 401);
        };

        return this.buildUserRO(user);
    }

    /**
     * @description: 创建用户数据
     * @param {type} 
     * @return: 
     */
    async create(dto: CreateUserDto): Promise<UserRO> {

        // 检查 手机号/名字 的唯一性
        const { name, mobile_number, password } = dto;
        console.log(name, mobile_number, password)
        const qb = await this.memberRepository
            .createQueryBuilder('user')
            .where('user.name = :name', { name })
            .orWhere('user.mobile_number = :mobile_number', { mobile_number });

        const user = await qb.getOne();

        if (user) { // 如果用户已经存在,则报错s
            const errors = { name: '用户名和手机号必须是唯一的。' };
            throw new HttpException({ message: '输入数据验证失败', errors }, HttpStatus.BAD_REQUEST);
        }

        // 创建新用户 ,返回时带上token
        let newMember = new member_info();
        newMember.name = name;
        newMember.mobile_number = mobile_number;
        newMember.password = crypto.createHmac('sha256', password).digest('hex');
        Object.assign(dto, newMember);
        const object = plainToClass(CreateUserDto, dto); // metatype为dto,实例化dto
        const errors = await validate(object); // 验证数据是否正确
        if (errors.length > 0) {
            throw new HttpException({ message: '输入数据验证失败', errors: this.buildError(errors) }, HttpStatus.BAD_REQUEST);
        } else {
            const savedUser = await this.memberRepository.save(dto);
            return this.buildUserRO(savedUser);
        }

    }

    /**
     * @description: 找到唯一用户数据
     * @param {type} 
     * @return: 
     */
    async findOne({ account, password }: LoginUserDto): Promise<member_info> {
        // crypto.createHmac(‘sha256’,'密钥') 方法用于创建 Hmac 实例
        // hmac.digest :返回值
        // 数据库的密码通过hmac加密,密钥为真正的密，数据库只能看到加密的数据，只有用户能解密，用户知道密钥===密码
        password = crypto.createHmac('sha256', password).digest('hex');
        return await this.memberRepository.findOne({ where: [{ name: account, password }, { mobile_number: account, password }, { mailbox: account, password }] });
    }
    /**
    * @description: 生产JWT数据(token),数据通过SECRET加密,包含私有数据id,username,mobile_number
    * @param {type} 
    * @return: 
    */
    public generateJWT(user) {
        let today = new Date();
        let exp = new Date(today);
        exp.setDate(today.getDate() + 60);

        return jwt.sign({
            id: user.id,
            name: user.name,
            mobile_number: user.mobile_number,
            mailbox: user.mailbox,
            exp: exp.getTime() / 1000, // 设置有效期
        }, SECRET); // SECRET加密
    };

    /**
     * @description: 将member_info 实现 userRO接口
     * @param {type} 
     * @return: 
     */
    private buildUserRO(user: member_info) {
        const userRO = {
            name: user.name,
            mailbox: user.mailbox,
            mobile_number: user.mobile_number,
            token: this.generateJWT(user), // 生产token,将在浏览器中的cookie保存
            portrait: user.portrait
        };

        return { user: userRO };
    }

    /**
     * @description: 编辑 error response数据
     * @param {type} 
     * @return: 
     */
    private buildError(errors) {
        const result = {};
        errors.forEach(el => {
            let prop = el.property;
            Object.entries(el.constraints).forEach(constraint => {
                result[prop + constraint[0]] = `${constraint[1]}`;
            });
        });
        return result;
    }
}
