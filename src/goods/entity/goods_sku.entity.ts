/*
 * @Author: your name
 * @Date: 2020-01-31 13:42:12
 * @LastEditTime : 2020-02-03 22:04:10
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\goods\entity\goods_sku.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, OneToMany, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { goods_spu } from './goods_spu.entity'
import { goods_spec_value } from './goods_spec_value.entity'

@Entity()
export class goods_sku {

    @PrimaryGeneratedColumn({ type: "bigint" })
    id: number;

    @PrimaryColumn({ type: "bigint" })
    sku_no: number

    @Column({ type: 'decimal' })
    price: number

    @Column({ type: 'int', width: 11 })
    stock: number

    @ManyToOne(type => goods_spu, goods_spu => goods_spu.sku)
    spu: goods_spu

    @ManyToMany(type => goods_spec_value) // 这是一个多对多关系，此属性对应goods_spec这个实体
    @JoinTable({ name: 'goods_sku_spec_value', joinColumn: { name: 'sku_id' }, inverseJoinColumn: { name: 'spec_value_id' } }) // 设置中间表
    specValue: goods_spec_value[]; // 返回属性spec,内容为goods_spec实体组成的数组
}