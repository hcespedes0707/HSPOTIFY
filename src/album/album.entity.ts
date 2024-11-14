import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Artist } from '../artist/artist.entity';
import { Song } from '../song/song.entity';

@Entity()
export class Album {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  coverImageUrl: string; // Ruta de la imagen de portada del álbum

  @ManyToOne(() => Artist, (artist) => artist.albums, { onDelete: 'CASCADE' })
  artist: Artist;

  @OneToMany(() => Song, (song) => song.album)
  songs: Song[];
}
