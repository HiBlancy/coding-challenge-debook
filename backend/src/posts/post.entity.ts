import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LikeEntity } from '../likes/like.entity';
import { UserEntity } from '../users/user.entity';

@Entity('posts')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /** Autor/a de la publicación (el bloque superior de la tarjeta). */
  @ManyToOne(() => UserEntity, (user) => user.posts, { eager: false })
  @JoinColumn({ name: 'author_id' })
  author!: UserEntity;

  @Column({ name: 'author_id' })
  authorId!: string;

  /**
   * Perfil en cuyo tab "Convos" aparece esta publicación.
   * En Debook el feed de un perfil puede contener posts de otras personas,
   * por eso separamos "autor" de "dueño del feed".
   * `GET /v1/users/:id/posts` filtra por este campo.
   */
  @Index()
  @Column({ name: 'profile_owner_id' })
  profileOwnerId!: string;

  @Column({ type: 'text' })
  content!: string;

  @Column({ type: 'varchar', length: 120, nullable: true })
  location!: string | null;

  /** Texto del "chip" con enlace (p. ej. "No te lo pierdas esto!!!!!"). */
  @Column({ type: 'varchar', length: 140, nullable: true })
  linkLabel!: string | null;

  // --- Libro citado en la tarjeta ---
  @Column({ type: 'varchar', length: 160, nullable: true })
  bookTitle!: string | null;

  @Column({ type: 'varchar', length: 160, nullable: true })
  bookAuthor!: string | null;

  @Column({ type: 'text', nullable: true })
  bookCoverUrl!: string | null;

  // --- Contadores ---
  @Column({ type: 'int', default: 0 })
  likesCount!: number;

  @Column({ type: 'int', default: 0 })
  commentsCount!: number;

  @Column({ type: 'int', default: 0 })
  repostsCount!: number;

  @Column({ type: 'int', default: 0 })
  savesCount!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @OneToMany(() => LikeEntity, (like) => like.post)
  likes!: LikeEntity[];
}
