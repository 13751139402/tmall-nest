import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { goods_spec } from './goods_spec.entity'

@Entity()
export class goods_spec_value {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => goods_spec, goods_spec => goods_spec.values)
    spec: number

    @Column()
    spec_value: string

    @Column()
    spec_value_cover: string
}