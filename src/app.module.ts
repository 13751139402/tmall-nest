/*
 * @Author: your name
 * @Date: 2020-01-11 22:30:40
 * @LastEditTime : 2020-02-03 22:06:43
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\app.module.ts
 */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GoodsModule } from './goods/goods.module';
import { OrderModule } from './order/order.module';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt' // 全局注册JWT,nestjs已经封装成了模块
import { Connection } from 'typeorm';

@Module({
  imports: [GoodsModule, OrderModule, MemberModule,
    TypeOrmModule.forRoot(),
    JwtModule.registerAsync({ // 异步注册一个密码
      useFactory() {
        return {
          secret: process.env.SECERT
        }
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [JwtModule] // 导出jwt模块
})
export class AppModule {
  constructor(private readonly connection: Connection) { }
}
