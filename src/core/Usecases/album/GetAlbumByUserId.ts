import { Album } from "../../Entities/Album";
import { AlbumRepository } from "../../repositories/AlbumRepository";
import { UseCase } from "../Usecase";

export class GetAlbumByUserId implements UseCase<string, Promise<Album>> {
    constructor(private readonly albumRepository: AlbumRepository) {}
   
    async execute(userId: string): Promise<Album>  {
        const album = await this.albumRepository.getAlbumByUserId(userId)
        return Promise.resolve(album)
    }
}

