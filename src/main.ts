/*
 * @Author: your name
 * @Date: 2020-01-02 10:10:18
 * @LastEditTime : 2020-01-10 16:15:02
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\main.ts
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(function (req, res, next) {
    console.log(res);
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  })
  await app.listen(3000);
  console.log(`listen3000:scuess`)
}
bootstrap();
