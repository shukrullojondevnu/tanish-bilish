import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Avatar {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  path: string;

  @Column({ unique: true, name: 'user_id' })
  userId: number;
}
