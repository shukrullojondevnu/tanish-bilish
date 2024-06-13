import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'interests' })
export class Interest {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  value: string;

  @OneToMany(() => UserInterest, (users) => users.interest)
  users: UserInterest[];
}

@Entity({ name: 'users_interests' })
export class UserInterest {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ unique: true, name: 'user_id' })
  user: number;

  @ManyToOne(() => Interest, (interest) => interest.users)
  @JoinColumn({ name: 'interest_id' })
  interest: Interest;
}
