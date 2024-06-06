import { Roles } from '@app/share';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'roles' })
export class Role {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  value: Roles;

  @ManyToMany(() => User, (user) => user.roles, { cascade: true })
  @JoinColumn({ name: 'user_id' })
  users: User[];
}
