import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('notes')
export class Note {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ length: 100 })
  title: string;

  @Column({ length: 500 })
  content: string;

  @ManyToOne(() => User, user => user.id, { onDelete: 'CASCADE' })
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 