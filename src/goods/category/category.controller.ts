/*
 * @Author: your name
 * @Date: 2020-01-02 10:10:18
 * @LastEditTime : 2020-01-14 11:55:15
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\category\category.controller.ts
 */
import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service'
import {
    ApiTags,
} from '@nestjs/swagger';

@ApiTags('goods/category')  // 此模块使用的swagger标签
@Controller('goods/category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get('root')
    findRoot() {
        return this.categoryService.findRoot();
    }

    @Get('child')
    findDescendantsTree(@Query() { id }) {
        return this.categoryService.findDescendantsTree(id);
    }
}
