// genre.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Artist } from '../artist/artist.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  imageUrl: string; // Esta propiedad almacena la URL de la imagen

  @OneToMany(() => Artist, (artist) => artist.genre)
  artists: Artist[];
}
