/*
 * @Author: your name
 * @Date: 2020-01-02 10:10:18
 * @LastEditTime : 2020-01-24 22:46:19
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // 用于生成swagger描述文档

async function bootstrap() {
  const appOptions = { cors: true }; // 设置跨域
  const app = await NestFactory.create(AppModule, appOptions);

  // DocumentBuilder 有助于构建符合 OpenAPI 规范的基础文档。它提供了几种允许设置诸如标题，描述，版本等属性的方法
  const options = new DocumentBuilder()
    .setTitle('Tmall Server')
    .setDescription('The Realworld API description')
    .setVersion('1.0')
    .addBearerAuth() // 如果要启用承载身份验证ApiBearerAuth,需要添加addBearerAuth安全定义
    .build();
  const document = SwaggerModule.createDocument(app, options); // 设置一个swagger模块
  SwaggerModule.setup('/api', app, document); // 接口地址

  await app.listen(3000);
}
bootstrap();
