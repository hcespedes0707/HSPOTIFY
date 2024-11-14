import { Artist } from '../artist/artist.entity';
export declare class Genre {
    id: number;
    name: string;
    imageUrl: string;
    artists: Artist[];
}
