import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './album.entity';

@Injectable()
export class AlbumService {
  constructor(
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
  ) {}

  // Obtener todos los álbumes
  async findAll(): Promise<Album[]> {
    return await this.albumRepository.find({ relations: ['artist', 'songs'] });
  }

  // Obtener un álbum por ID
  async findOne(id: number): Promise<Album | undefined> {
    return await this.albumRepository.findOne({
      where: { id },
      relations: ['artist', 'songs'],
    });
  }

  // Obtener todos los álbumes de un artista específico
  async findByArtist(artistId: number): Promise<Album[]> {
    return await this.albumRepository.find({
      where: { artist: { id: artistId } },
      relations: ['artist', 'songs'],
    });
  }

  // Crear un nuevo álbum
  async create(album: Album): Promise<Album> {
    return await this.albumRepository.save(album);
  }

  // Actualizar un álbum existente
  async update(id: number, album: Album): Promise<Album | undefined> {
    await this.albumRepository.update(id, album);
    return this.findOne(id);
  }

  // Eliminar un álbum
  async remove(id: number): Promise<boolean> {
    const result = await this.albumRepository.delete(id);
    return result.affected > 0;
  }
}
