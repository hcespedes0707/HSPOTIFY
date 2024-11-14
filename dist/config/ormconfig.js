"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const album_entity_1 = require("../album/album.entity");
const artist_entity_1 = require("../artist/artist.entity");
const genre_entity_1 = require("../genre/genre.entity");
const song_entity_1 = require("../song/song.entity");
const dotenv = require("dotenv");
dotenv.config();
const config = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'hiltonmusic',
    entities: [album_entity_1.Album, artist_entity_1.Artist, genre_entity_1.Genre, song_entity_1.Song],
    synchronize: true,
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map