import { TrackProperties } from './../../Entities/Album';
import { AlbumRepository } from './../../repositories/AlbumRepository';
import { UseCase } from './../Usecase';
import { Album } from "../../Entities/Album";

export type UpdateAlbumInput = {
    file: string;
    tracks: Array<TrackProperties>;
    albumTitle: string;
    ownerId: string;
}

export class UpdateAlbum implements UseCase<UpdateAlbumInput, Promise<Album>> {
    constructor(
        private readonly albumRepository: AlbumRepository,
        ) {}

    async execute(input: UpdateAlbumInput): Promise<Album>  {
        const album = await this.albumRepository.getAlbumByOwnerId(input.ownerId);
         album.update({
            albumTitle: input.albumTitle,
            file: input.file,
            tracks: input.tracks
        })
        return Promise.resolve(album);
    }
}