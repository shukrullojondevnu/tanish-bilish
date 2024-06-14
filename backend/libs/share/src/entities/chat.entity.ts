import {
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Message } from './message.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];
}
