import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artist } from './artist.entity';

@Injectable()
export class ArtistService {
  constructor(
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
  ) {}

  // Obtener todos los artistas
  async findAll(): Promise<Artist[]> {
    return await this.artistRepository.find({ relations: ['genre', 'albums'] });
  }

  // Obtener un artista por ID
  async findOne(id: number): Promise<Artist | undefined> {
    return await this.artistRepository.findOne({
      where: { id },
      relations: ['genre', 'albums'],
    });
  }

  // Obtener todos los artistas de un género específico
  async findByGenre(genreId: number): Promise<Artist[]> {
    return await this.artistRepository.find({
      where: { genre: { id: genreId } },
      relations: ['genre', 'albums'],
    });
  }

  // Crear un nuevo artista
  async create(artist: Artist): Promise<Artist> {
    return await this.artistRepository.save(artist);
  }

  // Actualizar un artista existente
  async update(id: number, artist: Artist): Promise<Artist | undefined> {
    await this.artistRepository.update(id, artist);
    return this.findOne(id);
  }

  // Eliminar un artista
  async remove(id: number): Promise<boolean> {
    const result = await this.artistRepository.delete(id);
    return result.affected > 0;
  }
}
