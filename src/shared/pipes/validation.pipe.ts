/*
 * @Author: your name
 * @Date: 2019-12-24 09:31:40
 * @LastEditTime : 2020-01-14 14:20:24
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \nestjs-realworld-example-app\src\shared\pipes\validation.pipe.ts
 */
import { PipeTransform, ArgumentMetadata, BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { HttpException } from "@nestjs/common/exceptions/http.exception";
// Pipe 转化
@Injectable()
export class ValidationPipe implements PipeTransform<any> {
    // 当前路由处理的值 ,元数据
    async transform(value, metadata: ArgumentMetadata) {
        if (!value) {
            throw new BadRequestException('No data submitted');
        }

        const { metatype } = metadata; // 获取元数据类型
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);
        if (errors.length > 0) {
            throw new HttpException({ message: '数据验证失败', errors: this.buildError(errors) }, HttpStatus.BAD_REQUEST);
        }
        return value;
    }

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

    private toValidate(metatype): boolean {
        const types = [String, Boolean, Number, Array, Object];
        return !types.find((type) => metatype === type);
    }
}
