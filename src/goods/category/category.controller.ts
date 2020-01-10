/*
 * @Author: your name
 * @Date: 2020-01-02 10:10:18
 * @LastEditTime: 2020-01-10 13:56:25
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\category\category.controller.ts
 */
import { Controller, Get, Query } from '@nestjs/common';
import { CategoryService } from './category.service'

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
