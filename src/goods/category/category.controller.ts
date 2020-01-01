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
