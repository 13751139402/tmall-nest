/*
 * @Author: your name
 * @Date: 2019-12-24 09:31:40
 * @LastEditTime : 2020-02-02 12:07:23
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs-realworld-example-app\src\user\user.decorator.ts
 */
import { createParamDecorator } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

export const member = createParamDecorator((data, req) => { // 定义一个装饰器
    // 此时的数据已经经过auth中间键处理

    // 如果有认证数据req.user
    if (!!req.user) { // 将user 转为boolean
        return !!data ? req.user[data] : req.user; // 有属性名返回属性，无则返回全部
    };

    // 如果没有用户数据，则在authorization取出token

    // 此处认证与auth.middleware认证的区别
    // middleware验证是在路由切换时认证用户token--数据库查询userID
    // 此处认证必定已经是用户路由切换后的,即middleware验证过了
    // 此处验证直接取出 解密后token的数据,不验证数据库验证
    const token = req.headers.authorization ? (req.headers.authorization as string).split(' ') : null; // 从认证数据中获得可选的auth用户
    if (token && token[1]) {
        const decoded: any = jwt.verify(token[1], process.env.SECRET); // 进行token验证
        return !!data ? decoded[data] : decoded.user; // 有data参数返回对应属性，没有返回token自定义属性user
    }

});
