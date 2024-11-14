import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Album } from '../album/album.entity';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  trackUrl: string; // URL del archivo de audio

  @ManyToOne(() => Album, (album) => album.songs, { onDelete: 'CASCADE' })
  album: Album;
}
