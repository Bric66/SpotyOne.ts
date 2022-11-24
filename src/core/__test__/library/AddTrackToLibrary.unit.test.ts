import { Track } from './../../Entities/Track';
import { InMemoryTrackRepository } from '../adapters/repositories/InMemoryTrackRepository';
import { AddTrackToLibrary } from '../../Usecases/library/AddTrackIdtoLibrary';
import {Library} from "../../Entities/Library";
import {InMemoryLibraryRepository} from "../adapters/repositories/InMemoryLibraryRepository";
const dbLibrary = new Map < string, Library>();
const dbTrack = new Map < string, Track>();

describe('Unit - UpdateLibrary', () => {
        const inMemoryTrackRepository = new InMemoryTrackRepository(dbTrack)
        const inMemoryLibraryRepository = new InMemoryLibraryRepository(dbLibrary);
        const addTrackToLibrary = new AddTrackToLibrary(inMemoryLibraryRepository, inMemoryTrackRepository)
        let track: Track;

        beforeAll(() => {
                const library = new Library({
            albums: [],
            tracks: [
                        {
                        title: "kit kat",
                        trackId: "8888",  

                        }
                    ],
            libraryId: "9999",
            title: "my library title",
            userId: "12345"
        })      
         track = new Track({
            artist: "artist name",
            created: new Date(),
            duration: 200,
            userId: "8888",
            file: "http://tracklink",
            trackId: "9999",
            trackTitle: "my track title",
            updated: new Date(),
        })
        dbTrack.set(track.props.trackId, track)
        dbLibrary.set(library.props.libraryId, library)
       })
       
    it('should add a track in library', async () => {
        const result = await addTrackToLibrary.execute({
            trackTitle: track.props.trackTitle,
            userId: "12345"         
        })
        expect(result.props.tracks).toHaveLength(2)
        expect(result.props.tracks[1].title).toEqual("my track title")
        expect(result.props.tracks[1].trackId).toEqual("9999")
    })

    it("should throw if the track is already added", async () => {
        const result= () => addTrackToLibrary.execute({
            trackTitle: "kit kat",
            userId: "12345"         
        })
        expect(() => result()).rejects.toThrow()
    })
})