import {GetAlbums} from './../../Usecases/album/getAlbums';
import {Album} from "../../Entities/Album"
import {InMemoryAlbumRespository} from '../adapters/repositories/InMemoryAlbumRespository';

const db = new Map<string, Album>()


describe('unit - UpdateAlbum', () => {
    let getAlbums: GetAlbums
    let album1: Album
    let album2: Album

    beforeAll(() => {
        album1 = new Album({
            albumId: "12345",
            userId: "userId",
            albumTitle: "Album Title 1",
            artist: "Album Artist 1",
            file: "hhtp://../album",
            tracks:
                [{
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
        album2 = new Album({
            albumId: "123456",
            userId: "userId",
            albumTitle: "Album Title 2",
            artist: "Album Artist 2",
            file: "hhtp://../album",
            tracks:
                [{
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
        getAlbums = new GetAlbums(inMemoryAlbumRespository)
        db.set(album1.props.albumId, album1)
        db.set(album2.props.albumId, album2)

    })
    it('should get all albums', async () => {
        const result = await getAlbums.execute()
        expect(result).toHaveLength(2)
    })
})