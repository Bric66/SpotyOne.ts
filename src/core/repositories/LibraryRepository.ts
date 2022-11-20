import { Library } from './../Entities/Library';

export interface LibraryRepository {
    create(input: Library): Promise<Library>;

    getByOwnerId(ownerId: string): Promise<Library>
    
    update(input: Library): Promise<Library>;

    delete(ownerId: string): Promise<string>;

    
}