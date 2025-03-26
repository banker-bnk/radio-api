import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Zone } from '../../zones/entities/zone.entity';
import { Topic } from '../../topics/entities/topic.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  text: string;

  @Column()
  userId: number;

  @ManyToOne(() => User, (user) => user.messages)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  zoneId: number;

  @ManyToOne(() => Zone, (zone) => zone.messages)
  @JoinColumn({ name: 'zoneId' })
  zone: Zone;

  @Column()
  topicId: number;

  @ManyToOne(() => Topic, (topic) => topic.messages)
  @JoinColumn({ name: 'topicId' })
  topic: Topic;

  @CreateDateColumn()
  createdAt: Date;
} 