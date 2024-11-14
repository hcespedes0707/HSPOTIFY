import { Artist } from '../artist/artist.entity';
import { Song } from '../song/song.entity';
export declare class Album {
    id: number;
    title: string;
    coverImageUrl: string;
    artist: Artist;
    songs: Song[];
}
