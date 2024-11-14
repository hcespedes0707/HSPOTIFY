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
exports.ArtistService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const artist_entity_1 = require("./artist.entity");
let ArtistService = class ArtistService {
    constructor(artistRepository) {
        this.artistRepository = artistRepository;
    }
    async findAll() {
        return await this.artistRepository.find({ relations: ['genre', 'albums'] });
    }
    async findOne(id) {
        return await this.artistRepository.findOne({
            where: { id },
            relations: ['genre', 'albums'],
        });
    }
    async findByGenre(genreId) {
        return await this.artistRepository.find({
            where: { genre: { id: genreId } },
            relations: ['genre', 'albums'],
        });
    }
    async create(artist) {
        return await this.artistRepository.save(artist);
    }
    async update(id, artist) {
        await this.artistRepository.update(id, artist);
        return this.findOne(id);
    }
    async remove(id) {
        const result = await this.artistRepository.delete(id);
        return result.affected > 0;
    }
};
exports.ArtistService = ArtistService;
exports.ArtistService = ArtistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(artist_entity_1.Artist)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ArtistService);
//# sourceMappingURL=artist.service.js.map