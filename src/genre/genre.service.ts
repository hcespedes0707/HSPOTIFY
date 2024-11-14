import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
  ) {}

  // Obtener todos los géneros
  async findAll(): Promise<Genre[]> {
    return await this.genreRepository.find({ relations: ['artists'] });
  }

  // Obtener un género por ID
  async findOne(id: number): Promise<Genre | undefined> {
    return await this.genreRepository.findOne({
      where: { id },
      relations: ['artists'],
    });
  }

  // Crear un nuevo género
  async create(genre: Genre): Promise<Genre> {
    return await this.genreRepository.save(genre);
  }

  // Actualizar un género existente
  async update(id: number, genre: Genre): Promise<Genre | undefined> {
    await this.genreRepository.update(id, genre);
    return this.findOne(id);
  }

  // Eliminar un género
  async remove(id: number): Promise<boolean> {
    const result = await this.genreRepository.delete(id);
    return result.affected > 0;
  }
}
