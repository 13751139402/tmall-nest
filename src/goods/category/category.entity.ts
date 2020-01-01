import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity()
@Tree("closure-table")
export class goods_category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_name: string;

    @Column()
    level: number;
    
    @Column()
    picture: string;

    @TreeChildren()
    children: goods_category[];

    @TreeParent()
    parent: goods_category;
}