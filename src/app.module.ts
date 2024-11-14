import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormconfig from './config/ormconfig';
import { AlbumModule } from './album/album.module';
import { ArtistModule } from './artist/artist.module';
import { GenreModule } from './genre/genre.module';
import { SongModule } from './song/song.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig), // Conexión a la base de datos
    AlbumModule,
    ArtistModule,
    GenreModule,
    SongModule,
  ],
})
export class AppModule {}
