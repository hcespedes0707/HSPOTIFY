import { Repository } from 'typeorm';
import { Genre } from './genre.entity';
export declare class GenreService {
    private readonly genreRepository;
    constructor(genreRepository: Repository<Genre>);
    findAll(): Promise<Genre[]>;
    findOne(id: number): Promise<Genre | undefined>;
    create(genre: Genre): Promise<Genre>;
    update(id: number, genre: Genre): Promise<Genre | undefined>;
    remove(id: number): Promise<boolean>;
}
