import { Repository } from 'typeorm';
import { Artist } from './artist.entity';
export declare class ArtistService {
    private readonly artistRepository;
    constructor(artistRepository: Repository<Artist>);
    findAll(): Promise<Artist[]>;
    findOne(id: number): Promise<Artist | undefined>;
    findByGenre(genreId: number): Promise<Artist[]>;
    create(artist: Artist): Promise<Artist>;
    update(id: number, artist: Artist): Promise<Artist | undefined>;
    remove(id: number): Promise<boolean>;
}
