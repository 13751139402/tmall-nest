import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { goods_spu } from './goods_spu.entity'

@Entity()
export class goods_brand {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(type => goods_spu, goods_spu => goods_spu.brand)
    goods: goods_spu[]

    @Column()
    brand_name: string
}