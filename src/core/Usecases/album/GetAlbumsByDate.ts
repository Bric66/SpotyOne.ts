import {AlbumRepository} from "../../repositories/AlbumRepository";
import {UseCase} from "../Usecase";

export class GetAlbumsByDate implements UseCase<void, Promise<Object[]>> {
    constructor(private readonly albumRepository: AlbumRepository) {
    }

    async execute(): Promise<Object[]> {
        const albumArray = await this.albumRepository.getAlbumsByDate();
        return albumArray;
    }
}
