import { DeleteAlbum } from './../../Usecases/album/DeleteAlbum';
import { InMemoryAlbumRespository } from './../adapters/repositories/InMemoryAlbumRespository';
import { Album } from "../../Entities/Album"

const db = new Map<string, Album>()

describe('Unit - DeleteAlbum', () => {
    const album = new Album({
            albumId: "album id",
            userId: "1463165",
            albumTitle: "Album Title",
            artist: "Album Artist",
            file: "hhtp://../album",
            tracks: 
                [  { 
                         trackId: "132354",
                         trackTitle: "title"
                    },
                    { 
                        trackId: "789798",
                        trackTitle: "title"
                    },
                    { 
                        trackId: "4654654687",
                        trackTitle: "title"
                    }
                ],
                created: new Date(),
                updated: null,
        })
        const inMemoryAlbumRespository = new InMemoryAlbumRespository(db)
        const deleteAlbum = new DeleteAlbum(inMemoryAlbumRespository)
        db.set(album.props.albumId, album)
    
    it('should delete the album', () => {
        deleteAlbum.execute("album id")
        expect(db.get("album id")).toBeUndefined()
    })
})