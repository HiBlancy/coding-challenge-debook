import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { PostEntity } from '../posts/post.entity';
import { UserEntity } from '../users/user.entity';

/** Un "me gusta" de un usuario sobre un post. */
@Entity('likes')
@Unique('uq_like_user_post', ['userId', 'postId'])
export class LikeEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Index()
  @Column({ name: 'user_id' })
  userId!: string;

  @Index()
  @Column({ name: 'post_id' })
  postId!: string;

  @ManyToOne(() => UserEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user!: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.likes, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'post_id' })
  post!: PostEntity;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
