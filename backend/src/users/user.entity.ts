import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PostEntity } from '../posts/post.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /** Nombre corto que se muestra en el header (p. ej. "Alberto"). */
  @Column({ type: 'varchar', length: 60 })
  displayName!: string;

  /** Nombre completo con el que firma (p. ej. "Alberto Rodilla"). */
  @Column({ type: 'varchar', length: 120 })
  fullName!: string;

  /** Etiqueta bajo el avatar (p. ej. "Debooker"). */
  @Column({ type: 'varchar', length: 60, default: 'Debooker' })
  tagline!: string;

  @Column({ type: 'text' })
  bio!: string;

  @Column({ type: 'text' })
  avatarUrl!: string;

  @Column({ type: 'boolean', default: false })
  verified!: boolean;

  /** ¿Es autor/a? Muestra el pill "Autor" en las tarjetas. */
  @Column({ type: 'boolean', default: false })
  isAuthor!: boolean;

  // --- Contadores del header ---
  @Column({ type: 'int', default: 0 })
  booksCount!: number;

  @Column({ type: 'int', default: 0 })
  followersCount!: number;

  @Column({ type: 'int', default: 0 })
  lifeScore!: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts!: PostEntity[];
}
