import { Album } from '../album/album.entity';
export declare class Song {
    id: number;
    title: string;
    trackUrl: string;
    album: Album;
}
