import { Genre } from '../../../../models/genre.model';

export interface IGenreState {
    movieGenres: Genre[]
}

export const initialGenreState: IGenreState = {
    movieGenres: []
};
