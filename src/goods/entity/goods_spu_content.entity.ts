/*
 * @Author: your name
 * @Date: 2020-01-10 13:40:50
 * @LastEditTime : 2020-02-02 23:34:40
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { goods_spu } from './goods_spu.entity';

@Entity()
export class goods_spu_content {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(type => goods_spu, goods_spu => goods_spu.content)
    @Column({ type: 'bigint' })
    spu: goods_spu

    @Column({ type: 'text' })
    image: string

    @Column({ select: false })
    index: string

}