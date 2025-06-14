import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Profile {
  @PrimaryColumn()
  username: string;

  @OneToOne(() => Account)
  @JoinColumn({ name: 'username' })
  account: Account;

  @Column({ length: 30, unique: true })
  nickname: string;

  @Column({ length: 256, unique: true })
  email: string;
}
