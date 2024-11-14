import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Song } from './song.entity';

@Injectable()
export class SongService {
  constructor(
    @InjectRepository(Song)
    private readonly songRepository: Repository<Song>,
  ) {}

  // Obtener todas las canciones
  async findAll(): Promise<Song[]> {
    return await this.songRepository.find({ relations: ['album'] });
  }

  // Obtener una canción por ID
  async findOne(id: number): Promise<Song | undefined> {
    return await this.songRepository.findOne({
      where: { id },
      relations: ['album'],
    });
  }

  // Crear una nueva canción
  async create(song: Song): Promise<Song> {
    return await this.songRepository.save(song);
  }

  // Actualizar una canción existente
  async update(id: number, song: Song): Promise<Song | undefined> {
    await this.songRepository.update(id, song);
    return this.findOne(id);
  }

  // Eliminar una canción
  async remove(id: number): Promise<boolean> {
    const result = await this.songRepository.delete(id);
    return result.affected > 0;
  }
}
