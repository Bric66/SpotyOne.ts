
import { InMemoryAlbumRespository } from './../adapters/repositories/InMemoryAlbumRespository';
import { Album } from "../../Entities/Album"
import { GetAlbumByUserId } from '../../Usecases/album/GetAlbumByUserId';


const db = new Map<string, Album>()
describe('Unit - GetAlbumById', () => {

    let getAlbumByUserId: GetAlbumByUserId
    
    let album: Album
    
    beforeAll(() => {
        album = new Album({
            albumId: "12345",
            userId: "userId",
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
                updated: null
        })
        const inMemoryAlbumRespository = new InMemoryAlbumRespository(db)
        getAlbumByUserId = new GetAlbumByUserId(inMemoryAlbumRespository)
        db.set(album.props.albumId, album)
    })


    it('should get un album by user id', async () => {
        const result = await getAlbumByUserId.execute("userId")
        expect(result.props.albumTitle).toEqual("Album Title")
    })
})