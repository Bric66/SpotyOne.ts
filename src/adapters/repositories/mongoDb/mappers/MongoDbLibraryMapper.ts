import { libraryModel } from '../models/library';
import { Library } from './../../../../core/Entities/Library';



export class MongoDbLibraryMapper {
    toLibrary(libraryModel: libraryModel): Library {
        return new Library({
            albums: libraryModel.albums,
            libraryId: libraryModel.libraryId,
            title: libraryModel.title,
            tracks: libraryModel.tracks,
            userId: libraryModel.userId,
        })
    }

    toLibraryModel(library: Library): libraryModel {
        return {
            albums: library.props.albums,
            libraryId: library.props.libraryId,
            tracks: library.props.tracks,
            title: library.props.title,
            userId: library.props.userId,
        }
    }
}