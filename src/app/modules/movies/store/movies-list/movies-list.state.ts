import { Movie } from '../../../../models/movie.model';

export interface IMoviesListState {
    popularMovies: Movie[];
    nowPlayingMovies: Movie[];
    topRatedMovies: Movie[];
    upcomingMovies: Movie[];
}

export const initialMoviesListState: IMoviesListState = {
    popularMovies: [],
    nowPlayingMovies: [],
    topRatedMovies: [],
    upcomingMovies: []
};
