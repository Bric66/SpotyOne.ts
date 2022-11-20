import { AlbumRepository } from './../../repositories/AlbumRepository';
import { Album } from "../../Entities/Album";
import { UseCase } from "../Usecase";

export class GetAlbums implements UseCase<void, Promise<Album[]>> {
    constructor(private readonly albumRepository: AlbumRepository) {}

    execute(): Promise<Album[]>  {
        const albumArray = this.albumRepository.getAlbums()
        return Promise.resolve(albumArray)
    }  
}