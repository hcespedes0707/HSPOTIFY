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
exports.ArtistController = void 0;
const common_1 = require("@nestjs/common");
const artist_service_1 = require("./artist.service");
const artist_entity_1 = require("./artist.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let ArtistController = class ArtistController {
    constructor(artistService) {
        this.artistService = artistService;
    }
    async findAll() {
        return this.artistService.findAll();
    }
    async findOne(id) {
        const artist = await this.artistService.findOne(+id);
        if (!artist) {
            throw new common_1.HttpException('Artist not found', common_1.HttpStatus.NOT_FOUND);
        }
        return artist;
    }
    async findByGenre(genreId) {
        return this.artistService.findByGenre(+genreId);
    }
    async create(artist, image) {
        if (image) {
            artist.imageUrl = `/imagenes/${image.filename}`;
        }
        return this.artistService.create(artist);
    }
    async update(id, artist, image) {
        const updatedArtist = await this.artistService.update(+id, artist);
        if (image) {
            updatedArtist.imageUrl = `/imagenes/${image.filename}`;
        }
        return updatedArtist;
    }
    async remove(id) {
        const deleted = await this.artistService.remove(+id);
        if (!deleted) {
            throw new common_1.HttpException('Artist not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.ArtistController = ArtistController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ArtistController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArtistController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('genre/:genreId'),
    __param(0, (0, common_1.Param)('genreId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArtistController.prototype, "findByGenre", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './imagenes',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `artist-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [artist_entity_1.Artist, Object]),
    __metadata("design:returntype", Promise)
], ArtistController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './imagenes',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `artist-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, artist_entity_1.Artist, Object]),
    __metadata("design:returntype", Promise)
], ArtistController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ArtistController.prototype, "remove", null);
exports.ArtistController = ArtistController = __decorate([
    (0, common_1.Controller)('api/artists'),
    __metadata("design:paramtypes", [artist_service_1.ArtistService])
], ArtistController);
//# sourceMappingURL=artist.controller.js.map