/*
 * @Author: your name
 * @Date: 2020-01-18 20:15:53
 * @LastEditTime : 2020-02-05 19:27:55
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\entity\goods_spec_value.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { goods_spec } from './goods_spec.entity'

@Entity()
export class goods_spec_value {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @ManyToOne(type => goods_spec, goods_spec => goods_spec.values)
    spec: goods_spec

    @Column({ length: 50 })
    spec_value: string

    @Column({ length: 255, nullable: true })
    spec_value_cover: string
}