import {Album} from "../../../../core/Entities/Album";
import {albumModel} from "../models/album";

export class MongoDbAlbumMapper {
    toAlbum(userModel: albumModel): Album {
        return new Album({
            albumId : userModel.albumId,
            userId : userModel.userId,
            artist: userModel.artist,
            albumTitle : userModel.albumTitle,
            file : userModel.file,
            tracks: userModel.tracks,
            created : new Date(userModel.created),
            updated : new Date(userModel.updated)
        });
    }
    toAlbumModel(album: Album): albumModel {
        return {
            albumId : album.props.albumId,
            userId : album.props.userId,
            artist : album.props.artist,
            albumTitle : album.props.albumTitle,
            file : album.props.file,
            tracks : album.props.tracks,
            created : +album.props.created,
            updated : +album.props.updated,
        };
    }
}