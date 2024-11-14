import { AlbumService } from './album.service';
import { Album } from './album.entity';
export declare class AlbumController {
    private readonly albumService;
    constructor(albumService: AlbumService);
    findAll(): Promise<Album[]>;
    findOne(id: string): Promise<Album>;
    findByArtist(artistId: string): Promise<Album[]>;
    create(file: Express.Multer.File, album: Album): Promise<Album>;
    update(id: string, file: Express.Multer.File, album: Album): Promise<Album>;
    remove(id: string): Promise<void>;
}
