import { Repository } from 'typeorm';
import { Song } from './song.entity';
export declare class SongService {
    private readonly songRepository;
    constructor(songRepository: Repository<Song>);
    findAll(): Promise<Song[]>;
    findOne(id: number): Promise<Song | undefined>;
    create(song: Song): Promise<Song>;
    update(id: number, song: Song): Promise<Song | undefined>;
    remove(id: number): Promise<boolean>;
}
