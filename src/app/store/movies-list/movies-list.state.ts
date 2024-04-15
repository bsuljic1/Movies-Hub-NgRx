import { Movie } from '../../models/movie.model';

export interface IMoviesListState {
    popularMovies: Movie[];
}

export const initialMoviesListState: IMoviesListState = {
    popularMovies: []
};
