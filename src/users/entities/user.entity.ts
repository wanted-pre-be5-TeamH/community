import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ length: 10 })
  name: string;

  @Column({ length: 10 })
  grade: string;

  @Column({ length: 2 })
  sex: string;

  @Column('int')
  age: number;

  @Column({ length: 15 })
  phone: string;

  @Column()
  created: Date;

  @Column()
  accessed: Date;

  @Column()
  isDeleted: boolean;
}