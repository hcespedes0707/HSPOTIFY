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
import { AlbumService } from './album.service';
import { Album } from './album.entity';

@Controller('albums')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  // Obtener todos los álbumes
  @Get()
  async findAll(): Promise<Album[]> {
    return this.albumService.findAll();
  }

  // Obtener un álbum por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Album> {
    const album = await this.albumService.findOne(+id);
    if (!album) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  // Obtener todos los álbumes de un artista específico
  @Get('artist/:artistId')
  async findByArtist(@Param('artistId') artistId: string): Promise<Album[]> {
    return this.albumService.findByArtist(+artistId);
  }

  // Crear un nuevo álbum con imagen de portada
  @Post()
  @UseInterceptors(
    FileInterceptor('coverImage', {
      storage: diskStorage({
        destination: './imagenes',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `cover-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() album: Album,
  ): Promise<Album> {
    if (file) {
      album.coverImageUrl = `/imagenes/${file.filename}`;
    }
    return this.albumService.create(album);
  }

  // Actualizar un álbum existente
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('coverImage', {
      storage: diskStorage({
        destination: './imagenes',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `cover-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body() album: Album,
  ): Promise<Album> {
    if (file) {
      album.coverImageUrl = `/imagenes/${file.filename}`;
    }
    const updatedAlbum = await this.albumService.update(+id, album);
    if (!updatedAlbum) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
    return updatedAlbum;
  }

  // Eliminar un álbum
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const deleted = await this.albumService.remove(+id);
    if (!deleted) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
