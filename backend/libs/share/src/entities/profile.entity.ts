import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Follow } from './follow.entity';
import { Subscribe } from './subscribe.entity';
import { IsDate, IsString } from 'class-validator';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @IsString()
  @Column()
  phone: string;

  @IsString()
  @Column()
  fullname: string;

  @Column()
  bio: string;

  @IsDate()
  @Column()
  birth: Date;

  @Column({ unique: true, name: 'user_id' })
  userId: number;

  @OneToMany(() => Follow, (follow) => follow.profile)
  follow: Follow[];

  @OneToMany(() => Subscribe, (subscribe) => subscribe.profile)
  subscribe: Follow[];
}
