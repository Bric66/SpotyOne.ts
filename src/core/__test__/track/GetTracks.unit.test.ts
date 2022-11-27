import {Track} from "../../Entities/Track";
import {GetTracks} from "../../Usecases/track/GetTracks";
import {InMemoryTrackRepository} from "../adapters/repositories/InMemoryTrackRepository";


const db = new Map<string, Track>()


describe('unit - get all tracks', () => {
    let getTracks: GetTracks
    let track1: Track
    let track2: Track

    beforeAll(() => {
        track1 = new Track({
           userId : '1234',
            trackTitle : 'wmca',
            trackId : '5678',
            artist : 'Aladdin',
            file : 'hhtp://../track',
            duration : 50,
            created : new Date(),
            updated : null
        })
        track2 = new Track({
            userId : '4321',
            trackTitle : 'aladouche',
            trackId : '8765',
            artist : 'lagaffe',
            file : 'hhtp://../track2',
            duration : 100,
            created : new Date(),
            updated : null
        })
        const inMemoryTrackRepository = new InMemoryTrackRepository(db)
        getTracks = new GetTracks(inMemoryTrackRepository)
        db.set(track1.props.trackId, track1)
        db.set(track2.props.trackId, track2)

    })
    it('should get all tracks', async () => {
        const result = await getTracks.execute()
        expect(result).toHaveLength(2)
    })
})