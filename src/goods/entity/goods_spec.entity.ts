/*
 * @Author: your name
 * @Date: 2020-01-10 13:40:50
 * @LastEditTime : 2020-01-17 14:51:33
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { goods_spec_value } from './goods_spec_value.entity'

@Entity()
export class goods_spec {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    spec_no: string

    @Column()
    spec_name: string

    @OneToMany(type => goods_spec_value, goods_spec_value => goods_spec_value.spec)
    values: goods_spec_value[];
}