import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { Artist } from './artist.entity';
import { GenreModule } from '../genre/genre.module'; // Importa el módulo de géneros si es necesario
import { AlbumModule } from '../album/album.module'; // Importa el módulo de álbumes si es necesario

@Module({
  imports: [TypeOrmModule.forFeature([Artist]), GenreModule, AlbumModule], // Registra la entidad Artist y los módulos necesarios
  controllers: [ArtistController],
  providers: [ArtistService],
})
export class ArtistModule {}
