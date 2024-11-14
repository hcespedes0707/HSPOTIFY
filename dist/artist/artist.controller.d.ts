import { ArtistService } from './artist.service';
import { Artist } from './artist.entity';
export declare class ArtistController {
    private readonly artistService;
    constructor(artistService: ArtistService);
    findAll(): Promise<Artist[]>;
    findOne(id: string): Promise<Artist>;
    findByGenre(genreId: string): Promise<Artist[]>;
    create(artist: Artist, image: Express.Multer.File): Promise<Artist>;
    update(id: string, artist: Artist, image: Express.Multer.File): Promise<Artist>;
    remove(id: string): Promise<void>;
}
