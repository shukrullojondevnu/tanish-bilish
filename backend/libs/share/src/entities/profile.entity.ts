import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Follow } from './follow.entity';
import { Subscribe } from './subscribe.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  bio: string;

  @Column({ unique: true, name: 'user_id' })
  userId: number;

  @OneToMany(() => Follow, (follow) => follow.profile)
  follow: Follow[];

  @OneToMany(() => Subscribe, (subscribe) => subscribe.profile)
  subscribe: Follow[];
}
