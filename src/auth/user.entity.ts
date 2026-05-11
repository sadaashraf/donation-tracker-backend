import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  fatherName: string;

  @Column({ unique: true })
  phone: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;
}
