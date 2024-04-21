import { Movie } from '../../../../models/movie.model';

export interface IMovieState {
    selectedMovie: Movie;
}

export const initialMovieState: IMovieState = {
    selectedMovie: null
};
