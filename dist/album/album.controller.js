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
exports.AlbumController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
const album_service_1 = require("./album.service");
const album_entity_1 = require("./album.entity");
let AlbumController = class AlbumController {
    constructor(albumService) {
        this.albumService = albumService;
    }
    async findAll() {
        return this.albumService.findAll();
    }
    async findOne(id) {
        const album = await this.albumService.findOne(+id);
        if (!album) {
            throw new common_1.HttpException('Album not found', common_1.HttpStatus.NOT_FOUND);
        }
        return album;
    }
    async findByArtist(artistId) {
        return this.albumService.findByArtist(+artistId);
    }
    async create(file, album) {
        if (file) {
            album.coverImageUrl = `/imagenes/${file.filename}`;
        }
        return this.albumService.create(album);
    }
    async update(id, file, album) {
        if (file) {
            album.coverImageUrl = `/imagenes/${file.filename}`;
        }
        const updatedAlbum = await this.albumService.update(+id, album);
        if (!updatedAlbum) {
            throw new common_1.HttpException('Album not found', common_1.HttpStatus.NOT_FOUND);
        }
        return updatedAlbum;
    }
    async remove(id) {
        const deleted = await this.albumService.remove(+id);
        if (!deleted) {
            throw new common_1.HttpException('Album not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.AlbumController = AlbumController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('artist/:artistId'),
    __param(0, (0, common_1.Param)('artistId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "findByArtist", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('coverImage', {
        storage: (0, multer_1.diskStorage)({
            destination: './imagenes',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `cover-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, album_entity_1.Album]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('coverImage', {
        storage: (0, multer_1.diskStorage)({
            destination: './imagenes',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `cover-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.UploadedFile)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, album_entity_1.Album]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AlbumController.prototype, "remove", null);
exports.AlbumController = AlbumController = __decorate([
    (0, common_1.Controller)('albums'),
    __metadata("design:paramtypes", [album_service_1.AlbumService])
], AlbumController);
//# sourceMappingURL=album.controller.js.map