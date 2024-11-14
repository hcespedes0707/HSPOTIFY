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
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './artist.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/artists')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  // Obtener todos los artistas
  @Get()
  async findAll(): Promise<Artist[]> {
    return this.artistService.findAll();
  }

  // Obtener un artista por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Artist> {
    const artist = await this.artistService.findOne(+id);
    if (!artist) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  // Obtener todos los artistas de un género específico
  @Get('genre/:genreId')
  async findByGenre(@Param('genreId') genreId: string): Promise<Artist[]> {
    return this.artistService.findByGenre(+genreId);
  }

  // Crear un nuevo artista con imagen
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './imagenes', // Ruta donde se guardará la imagen
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `artist-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() artist: Artist,
    @UploadedFile() image: Express.Multer.File, // Asignación de la imagen
  ): Promise<Artist> {
    if (image) {
      artist.imageUrl = `/imagenes/${image.filename}`; // Asigna la ruta de la imagen
    }
    return this.artistService.create(artist);
  }

  // Actualizar un artista existente
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './imagenes', // Ruta donde se guardará la imagen
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `artist-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() artist: Artist,
    @UploadedFile() image: Express.Multer.File, // Asignación de la imagen
  ): Promise<Artist> {
    const updatedArtist = await this.artistService.update(+id, artist);
    if (image) {
      updatedArtist.imageUrl = `/imagenes/${image.filename}`; // Asigna la nueva ruta de la imagen
    }
    return updatedArtist;
  }

  // Eliminar un artista
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const deleted = await this.artistService.remove(+id);
    if (!deleted) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}
