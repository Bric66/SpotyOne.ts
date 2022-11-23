import { Album } from '../../../Entities/Album';
import { UpdateAlbumInput } from '../../../Usecases/album/UpdateAlbum';
import { AlbumRepository } from './../../../repositories/AlbumRepository';


export class InMemoryAlbumRespository implements AlbumRepository {
    constructor(private readonly db: Map<string, Album>) {}


    async create(input: Album): Promise<Album> {
        this.db.set(input.props.albumId, input)
        return input
    }

    async getAlbums(): Promise<string[]> {
        const albums = Array.from(this.db.values());  
        const result = albums.map((album ) => `title: ${album.props.albumTitle}, artist: ${album.props.artist}`)
        console.log(result)
        return result
    }

    async getAlbumByTitle(albumTitle: string): Promise<Album> {
        const values = Array.from(this.db.values());
        const album = values.find(elm => elm.props.albumTitle === albumTitle)
        return album
    }
    async getAlbumById(albumId: string): Promise<Album> {
        const album = this.db.get(albumId)
        return album 
    }

    async updateAlbum(input: Album): Promise<Album> {
         this.db.set(input.props.albumId, input)
        return input
    }

    deleteAlbum(albumId: string): string {
        this.db.delete(albumId)
        return albumId
    }

    async getAlbumByUserId(userId: string): Promise<Album> {
        const values = Array.from(this.db.values());
        const album = values.find(elm => elm.props.userId === userId)
        return album
    }   

    async exist(albumTitle: string, artist: string): Promise<boolean> {
        const values = Array.from(this.db.values());
        const isAlreadyCreated = values.find(elm => elm.props.albumTitle === albumTitle && elm.props.artist === artist)
        if (isAlreadyCreated) {
            return true
        }
        return false
    }
}