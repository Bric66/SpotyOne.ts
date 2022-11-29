import {Album} from "../../../../core/Entities/Album";
import {albumModel} from "../models/album";
import {Mapper} from "../../../../core/models/Mapper";

export class MongoDbAlbumMapper implements Mapper<albumModel, Album> {

    fromDomain(data: Album): albumModel {
        const {
            albumId,
            albumTitle,
            created,
            tracks,
            userId,
            artist,
            updated,
            file
        } = data.props;
        return {
            albumId,
            userId,
            artist,
            albumTitle,
            file,
            tracks,
            created: +created,
            updated: +updated,
        };
    }

    toDomain(raw: albumModel): Album {
        const {
            albumId,
            albumTitle,
            created,
            tracks,
            userId,
            artist,
            updated,
            file
        } = raw;
        return new Album({
            albumId,
            userId,
            artist,
            albumTitle,
            file,
            tracks,
            created: new Date(created),
            updated: new Date(updated)
        });
    }
}