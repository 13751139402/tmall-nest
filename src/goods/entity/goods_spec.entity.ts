/*
 * @Author: your name
 * @Date: 2020-01-10 13:40:50
 * @LastEditTime : 2020-02-02 23:33:42
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\goods.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { goods_spec_value } from './goods_spec_value.entity'

@Entity()
export class goods_spec {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    spec_no: string

    @Column()
    spec_name: string

    @OneToMany(type => goods_spec_value, goods_spec_value => goods_spec_value.spec)
    values: goods_spec_value[];
}