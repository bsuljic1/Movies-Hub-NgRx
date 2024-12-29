import { createReducer, Action, on } from '@ngrx/store';
import { IMoviesListState, initialMoviesListState } from './movies-list.state';
import * as MoviesListActions from './movies-list.actions';

const reducer = createReducer(
    initialMoviesListState,
    on(MoviesListActions.getPopularMoviesSuccess,
        (state, { movies }) => ({
            ...state,
            popularMovies: movies
        })
    ),
    on(MoviesListActions.getNowPlayingMoviesSuccess,
        (state, { movies }) => ({
            ...state,
            nowPlayingMovies: movies
        })
    ),
    on(MoviesListActions.getTopRatedMoviesSuccess,
        (state, { movies }) => ({
            ...state,
            topRatedMovies: movies
        })
    ),
    on(MoviesListActions.getUpcomingMoviesSuccess,
        (state, { movies }) => ({
            ...state,
            upcomingMovies: movies
        })
    ),
    on(MoviesListActions.getMoviesByCategorySuccess,
        (state, { category, movies }) => ({
            ...state,
            [category]: movies
        })
    )
);

export function moviesListReducer(state: IMoviesListState, action: Action): IMoviesListState {
    return reducer(state, action);
}
