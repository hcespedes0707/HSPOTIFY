import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpException,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SongService } from './song.service';
import { Song } from './song.entity';

@Controller('songs')
export class SongController {
  constructor(private readonly songService: SongService) {}

  // Obtener todas las canciones
  @Get()
  async findAll(): Promise<Song[]> {
    return this.songService.findAll();
  }

  // Obtener una canción por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Song> {
    const song = await this.songService.findOne(+id);
    if (!song) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }
    return song;
  }

  // Crear una nueva canción con archivo de audio
  @Post()
  @UseInterceptors(
    FileInterceptor('audioFile', {
      storage: diskStorage({
        destination: './canciones',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `song-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() song: Song,
  ): Promise<Song> {
    if (file) {
      song.trackUrl = `/canciones/${file.filename}`;
    }
    return this.songService.create(song);
  }

  // Actualizar una canción existente
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('audioFile', {
      storage: diskStorage({
        destination: './canciones',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `song-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() song: Song,
  ): Promise<Song> {
    if (file) {
      song.trackUrl = `/canciones/${file.filename}`;
    }
    const updatedSong = await this.songService.update(+id, song);
    if (!updatedSong) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }
    return updatedSong;
  }

  // Eliminar una canción
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const deleted = await this.songService.remove(+id);
    if (!deleted) {
      throw new HttpException('Song not found', HttpStatus.NOT_FOUND);
    }
  }
}
