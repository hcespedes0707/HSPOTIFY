import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Album } from '../album/album.entity';
import { Artist } from '../artist/artist.entity';
import { Genre } from '../genre/genre.entity';
import { Song } from '../song/song.entity';
import * as dotenv from 'dotenv';

dotenv.config();

const config: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'hiltonmusic',
  entities: [Album, Artist, Genre, Song],
  synchronize: true, // Solo en desarrollo, desactivar en producción
};

export default config;
