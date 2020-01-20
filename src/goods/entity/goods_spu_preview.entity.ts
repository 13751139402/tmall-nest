/*
 * @Author: your name
 * @Date: 2020-01-10 13:40:50
 * @LastEditTime : 2020-01-20 17:43:55
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { goods_spu } from './goods_spu.entity';

@Entity()
export class goods_spu_preview {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => goods_spu, goods_spu => goods_spu.preview)
    spu: goods_spu

    @Column()
    img_url: string

    @Column()
    index: string

}