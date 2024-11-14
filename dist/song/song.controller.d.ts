import { SongService } from './song.service';
import { Song } from './song.entity';
export declare class SongController {
    private readonly songService;
    constructor(songService: SongService);
    findAll(): Promise<Song[]>;
    findOne(id: string): Promise<Song>;
    create(file: Express.Multer.File, song: Song): Promise<Song>;
    update(id: string, file: Express.Multer.File, song: Song): Promise<Song>;
    remove(id: string): Promise<void>;
}
