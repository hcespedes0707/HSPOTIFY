"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const song_service_1 = require("./song.service");
const song_entity_1 = require("./song.entity");
let SongController = class SongController {
    constructor(songService) {
        this.songService = songService;
    }
    async findAll() {
        return this.songService.findAll();
    }
    async findOne(id) {
        const song = await this.songService.findOne(+id);
        if (!song) {
            throw new common_1.HttpException('Song not found', common_1.HttpStatus.NOT_FOUND);
        }
        return song;
    }
    async create(file, song) {
        if (file) {
            song.trackUrl = `/canciones/${file.filename}`;
        }
        return this.songService.create(song);
    }
    async update(id, file, song) {
        if (file) {
            song.trackUrl = `/canciones/${file.filename}`;
        }
        const updatedSong = await this.songService.update(+id, song);
        if (!updatedSong) {
            throw new common_1.HttpException('Song not found', common_1.HttpStatus.NOT_FOUND);
        }
        return updatedSong;
    }
    async remove(id) {
        const deleted = await this.songService.remove(+id);
        if (!deleted) {
            throw new common_1.HttpException('Song not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.SongController = SongController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SongController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('audioFile', {
        storage: (0, multer_1.diskStorage)({
            destination: './canciones',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `song-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, song_entity_1.Song]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('audioFile', {
        storage: (0, multer_1.diskStorage)({
            destination: './canciones',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `song-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, song_entity_1.Song]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "remove", null);
exports.SongController = SongController = __decorate([
    (0, common_1.Controller)('songs'),
    __metadata("design:paramtypes", [song_service_1.SongService])
], SongController);
//# sourceMappingURL=song.controller.js.map