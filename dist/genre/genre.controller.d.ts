import { GenreService } from './genre.service';
import { Genre } from './genre.entity';
export declare class GenreController {
    private readonly genreService;
    constructor(genreService: GenreService);
    findAll(): Promise<Genre[]>;
    findOne(id: string): Promise<Genre>;
    create(genre: Genre, image: Express.Multer.File): Promise<Genre>;
    update(id: string, genre: Genre, image: Express.Multer.File): Promise<Genre>;
    remove(id: string): Promise<void>;
}
