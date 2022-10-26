import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
    @PrimaryGeneratedColumn()
    id: string;

    @Column({ length: 20 })
    type: string;

    @Column({ length: 50 })
    title: string;

    @Column('text')
    content: string;

    @Column({ length: 20 })
    authorId: string;

    @Column()
    like: number;

    @Column()
    created: Date;

    @Column()
    updated: Date;

    @Column()
    isDeleted: boolean;

    //   @Column({ length: 20 })
    //   reply: string;
}