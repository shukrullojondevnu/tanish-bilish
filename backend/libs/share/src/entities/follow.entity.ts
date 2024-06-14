import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './profile.entity';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  user_id: number;

  @ManyToOne(() => Profile, (profile) => profile.follow)
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
