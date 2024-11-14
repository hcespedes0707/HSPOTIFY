import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Genre } from '../genre/genre.entity';
import { Album } from '../album/album.entity';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string; // URL de la imagen del artista

  @ManyToOne(() => Genre, (genre) => genre.artists, { onDelete: 'SET NULL' })
  genre: Genre;

  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
}
