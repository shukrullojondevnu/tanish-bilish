import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Chat } from './chat.entity';

@Entity()
@Index(['from', 'to'])
export class Message {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  value: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column()
  from: number;

  @Column()
  to: number;

  @ManyToOne(() => Chat, chat => chat.messages)
  @JoinColumn({name: 'chat_id'})
  chat: Chat
}
