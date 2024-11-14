import { Repository } from 'typeorm';
import { Album } from './album.entity';
export declare class AlbumService {
    private readonly albumRepository;
    constructor(albumRepository: Repository<Album>);
    findAll(): Promise<Album[]>;
    findOne(id: number): Promise<Album | undefined>;
    findByArtist(artistId: number): Promise<Album[]>;
    create(album: Album): Promise<Album>;
    update(id: number, album: Album): Promise<Album | undefined>;
    remove(id: number): Promise<boolean>;
}
