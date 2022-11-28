import { GetAlbumById } from './../../Usecases/album/GetAlbumById';
import { InMemoryAlbumRespository } from '../adapters/repositories/InMemoryAlbumRespository';
import { Album } from "../../Entities/Album"


const db = new Map<string, Album>()
describe('Unit - GetAlbumById', () => {

    let getAlbumById: GetAlbumById
    let album: Album
    
    beforeAll(() => {
        album = new Album({
            albumId: "12345",
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
        getAlbumById = new GetAlbumById(inMemoryAlbumRespository)
        db.set(album.props.albumId, album)
    })


    it('should get un album by id', async () => {
        const result = await getAlbumById.execute("12345")
        expect(result.props.albumTitle).toEqual("Album Title")
    })
})