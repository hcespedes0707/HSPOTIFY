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
import { GenreService } from './genre.service';
import { Genre } from './genre.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  // Obtener todos los géneros
  @Get()
  async findAll(): Promise<Genre[]> {
    return this.genreService.findAll();
  }

  // Obtener un género por ID
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Genre> {
    const genre = await this.genreService.findOne(+id);
    if (!genre) {
      throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);
    }
    return genre;
  }

  // Crear un nuevo género con imagen
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './imagenes', // Ruta donde se guardará la imagen
        filename: (req, file, cb) => {
          // eslint-disable-next-line prettier/prettier
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `image-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async create(
    @Body() genre: Genre,
    @UploadedFile() image: Express.Multer.File, // Asignación correcta de parámetros
  ): Promise<Genre> {
    if (image) {
      genre.imageUrl = `/imagenes/${image.filename}`; // Asigna la ruta de la imagen a 'imageUrl'
    }
    return this.genreService.create(genre);
  }

  // Actualizar un género existente
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './imagenes',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `image-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() genre: Genre,
    @UploadedFile() image: Express.Multer.File, // Asignación correcta de parámetros
  ): Promise<Genre> {
    const updatedGenre = await this.genreService.update(+id, genre);
    if (image) {
      updatedGenre.imageUrl = `/imagenes/${image.filename}`; // Asigna la nueva ruta de la imagen
    }
    return updatedGenre;
  }

  // Eliminar un género
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const deleted = await this.genreService.remove(+id);
    if (!deleted) {
      throw new HttpException('Genre not found', HttpStatus.NOT_FOUND);
    }
  }
}
