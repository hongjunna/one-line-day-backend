import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Profile {
  @PrimaryColumn()
  username: string;

  @Column({ length: 30, unique: true })
  nickname: string;

  @Column({ length: 256, unique: true })
  email: string;
}
