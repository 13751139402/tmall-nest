/*
 * @Author: your name
 * @Date: 2020-01-24 15:46:55
 * @LastEditTime : 2020-01-24 17:35:37
 * @LastEditors  : Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tmall-nest\src\member\entity\member_info.entity.ts
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';

@Entity()
export class member_info {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mobile_number: number

    @Column()
    password: string

    @Column()
    mailbox: string

    @Column()
    name: string

    @Column()
    portrait: string

    @Column()
    address_id: string
}
