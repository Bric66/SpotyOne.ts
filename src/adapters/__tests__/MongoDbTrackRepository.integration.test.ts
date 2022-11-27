

import {v4} from "uuid";
import mongoose from "mongoose";
import {Track} from "../../core/Entities/Track";
import {MongoDbTrackRepository} from "../repositories/mongoDb/MongoDbTrackRepository";
import {TrackModel} from "../repositories/mongoDb/models/track";


describe('Integration - MongoDbTrackRepository', () => {

    let track: Track;
    let result: Track
    const mongoDbTrackRepository = new MongoDbTrackRepository();

    beforeAll(() => {
        const databaseId = v4()
        mongoose.connect(`mongodb://127.0.0.1:27017/${databaseId}`, (err) => {
            if (err) {
                throw err;
            }
            console.info("Connected to mongodb");
        });

        track = Track.create({
            userId: "1234",
            trackTitle: "wmca",
            artist: "village people",
            file: "hhtp://../track",
            duration: 3000,
            trackId: "5678",
        });
    });

    beforeEach(async () => {
        result = await mongoDbTrackRepository.create(track);
    })

    afterEach(async () => {
        await TrackModel.collection.drop();
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close();
    })
    it('should return true if track presentation exists', async () => {
        const test = await mongoDbTrackRepository.exist(
            "wmca",
            "village people",
        );
        console.log();
        await expect(test).toBeTruthy();
    })

    it('should return false if album presentation doesnt exist', async () => {
        const result = await mongoDbTrackRepository.exist(
            "no title",
            "no artist"
        );
        await expect(result).toBeFalsy();
    })

    it("Should save a track", async () => {
        await expect(result.props.trackTitle).toEqual("wmca");
        await expect(result.props.trackId).toBeTruthy();
    });

    it("Should get track by userId", async () => {
        const result = await mongoDbTrackRepository.getByUserId(track.props.userId);
        await expect(result).toEqual(track);
    })

    it("Should throw if track not found by userId", async () => {
        const result = () => mongoDbTrackRepository.getByUserId("wrong id");
        await expect(async () => result()).rejects.toThrow();
    })

    it("Should update a track", async () => {
        track.update({
           trackTitle : "jobi joba",
            duration : 3000,
            artist: "gipsy king",
            file : "none",
            updated : new Date(),
        })
        const result = await mongoDbTrackRepository.update(track)
        await expect(result.props.trackTitle).toEqual("jobi joba");
        await expect(result.props.artist).toEqual("gipsy king");
    })

    it("Should delete track ", async () => {
        const result = await mongoDbTrackRepository.delete(track.props.trackId);
        await expect(result).toBeFalsy();
    })

    it("Should get track by id", async () => {
        const result = await mongoDbTrackRepository.getById(track.props.trackId);
        await expect(result).toEqual(track);
    })

    it("Should throw if album not found by id", async () => {
        const result = () => mongoDbTrackRepository.getById("wrong id");
        await expect(async () => result()).rejects.toThrow();
    })

    it("Should get track by title", async () => {
        const result = await mongoDbTrackRepository.getByTitle(track.props.trackTitle);
        await expect(result).toEqual(track);
    })

    it("Should throw if track not found by title", async () => {
        const result = () => mongoDbTrackRepository.getByTitle("wrong title");
        await expect(async () => result()).rejects.toThrow();
    })

    it("Should get all tracks", async () => {
        await mongoDbTrackRepository.create(track);
        const result = await mongoDbTrackRepository.getTracks();
        console.log(result);
        await expect(result).toHaveLength(2);
    })
})
