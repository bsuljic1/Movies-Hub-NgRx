import { Genre } from '../../../../models/genre.model';
import { Movie } from '../../../../models/movie.model';

export interface IGenreState {
    genres: Genre[];
    movieGenres: { [key: string]: Movie[] };
}

export const initialGenreState: IGenreState = {
    genres: [],
    movieGenres: {}
};
