import {UseCase} from "../Usecase";
import {Track} from "../../Entities/Track";
import {TrackRepository} from "../../repositories/TrackRepository";


export class DeleteUser implements UseCase<string, string> {

    constructor(private readonly userRepository: TrackRepository) {
    }

    execute(userId: string): string {

        const track = this.userRepository.delete(userId);

        return (userId);
    }
}