import { createReducer, Action, on } from '@ngrx/store';
import { IGenreState, initialGenreState } from './genre.state';
import { getGenresSuccess, getMoviesByGenreSuccess } from './genre.actions';
import { Movie } from '../../../../models/movie.model';

const reducer = createReducer(
    initialGenreState,
    on(getGenresSuccess,
        (state, { genres }) => ({
            ...state,
            genres
        })
    ),
    on(getMoviesByGenreSuccess,
        (state, { genres, movies }) => ({
            ...state,
            movieGenres: {
                ...state.movieGenres,
                [genres]: mergeMovies(state.movieGenres[genres] || [], movies),
            },
        })
    )
);

export function genreReducer(state: IGenreState, action: Action): IGenreState {
    return reducer(state, action);
}

function mergeMovies(existingMovies: Movie[], newMovies: Movie[]): Movie[] {
    const allMovies = [...existingMovies, ...newMovies];
    return Array.from(new Map(allMovies.map((m) => [m.id, m])).values()); // Remove duplicates
}

