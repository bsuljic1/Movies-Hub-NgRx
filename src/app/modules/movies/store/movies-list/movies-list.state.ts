import { Movie } from '../../../../models/movie.model';

export interface IMoviesListState {
    popular: Movie[];
    nowPlaying: Movie[];
    topRated: Movie[];
    upcoming: Movie[];
    isLoading: boolean;
}

export const initialMoviesListState: IMoviesListState = {
    popular: [],
    nowPlaying: [],
    topRated: [],
    upcoming: [],
    isLoading: false
};
