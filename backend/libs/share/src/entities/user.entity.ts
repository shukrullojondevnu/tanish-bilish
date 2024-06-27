import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import { IsBoolean, IsDate, IsEmail, IsInt, IsString } from 'class-validator';
import { Expose } from 'class-transformer';

@Entity({ name: 'users' })
export class User {
  @IsInt()
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsString()
  @Column()
  fullname: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsString()
  @Column()
  phone: string;

  @IsDate()
  @Column()
  birth: Date;

  @IsInt()
  @Column({ unique: true })
  profile: number;

  @IsBoolean()
  @Column({ default: false })
  verifed: boolean;

  @Expose()
  @Column({ name: 'password_hash', nullable: true })
  passwordHash: string;

  @IsString()
  @Column({ name: 'refresh_token', nullable: true })
  refreshToken: string;

  @IsDate()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @IsDate()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToMany(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  roles: Role[];
}
