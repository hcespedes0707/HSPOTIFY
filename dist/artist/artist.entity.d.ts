import { Genre } from '../genre/genre.entity';
import { Album } from '../album/album.entity';
export declare class Artist {
    id: number;
    name: string;
    imageUrl: string;
    genre: Genre;
    albums: Album[];
}
