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
exports.GenreController = void 0;
const common_1 = require("@nestjs/common");
const genre_service_1 = require("./genre.service");
const genre_entity_1 = require("./genre.entity");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const path_1 = require("path");
let GenreController = class GenreController {
    constructor(genreService) {
        this.genreService = genreService;
    }
    async findAll() {
        return this.genreService.findAll();
    }
    async findOne(id) {
        const genre = await this.genreService.findOne(+id);
        if (!genre) {
            throw new common_1.HttpException('Genre not found', common_1.HttpStatus.NOT_FOUND);
        }
        return genre;
    }
    async create(genre, image) {
        if (image) {
            genre.imageUrl = `/imagenes/${image.filename}`;
        }
        return this.genreService.create(genre);
    }
    async update(id, genre, image) {
        const updatedGenre = await this.genreService.update(+id, genre);
        if (image) {
            updatedGenre.imageUrl = `/imagenes/${image.filename}`;
        }
        return updatedGenre;
    }
    async remove(id) {
        const deleted = await this.genreService.remove(+id);
        if (!deleted) {
            throw new common_1.HttpException('Genre not found', common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.GenreController = GenreController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './imagenes',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `image-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [genre_entity_1.Genre, Object]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        storage: (0, multer_1.diskStorage)({
            destination: './imagenes',
            filename: (req, file, cb) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                const ext = (0, path_1.extname)(file.originalname);
                cb(null, `image-${uniqueSuffix}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, genre_entity_1.Genre, Object]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GenreController.prototype, "remove", null);
exports.GenreController = GenreController = __decorate([
    (0, common_1.Controller)('api/genres'),
    __metadata("design:paramtypes", [genre_service_1.GenreService])
], GenreController);
//# sourceMappingURL=genre.controller.js.map