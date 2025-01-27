import { createReducer, Action, on } from '@ngrx/store';
import { IMoviesListState, initialMoviesListState } from './movies-list.state';
import * as MoviesListActions from './movies-list.actions';

const reducer = createReducer(
    initialMoviesListState,
    on(MoviesListActions.getPopularMoviesRequest,
        (state) => ({
            ...state,
            isLoading: true
        })
    ),
    on(MoviesListActions.getPopularMoviesFailure,
        (state) => ({
            ...state,
            isLoading: true
        })
    ),
    on(MoviesListActions.getPopularMoviesSuccess,
        (state, { movies }) => ({
            ...state,
            popular: movies,
            isLoading: false
        })
    ),
    on(MoviesListActions.getNowPlayingMovies,
        (state) => ({
            ...state,
            isLoading: true
        })
    ),
    on(MoviesListActions.getNowPlayingMoviesFailure,
        (state) => ({
            ...state,
            isLoading: true
        })
    ),
    on(MoviesListActions.getNowPlayingMoviesSuccess,
        (state, { movies }) => ({
            ...state,
            nowPlaying: movies,
            isLoading: false
        })
    ),
    on(MoviesListActions.getTopRatedMovies,
        (state) => ({
            ...state,
            isLoading: true
        })
    ),
    on(MoviesListActions.getTopRatedMoviesFailure,
        (state) => ({
            ...state,
            isLoading: true
        })
    ), 
    on(MoviesListActions.getTopRatedMoviesSuccess,
        (state, { movies }) => ({
            ...state,
            topRated: movies,
            isLoading: false
        })
    ),
    on(MoviesListActions.getUpcomingMovies,
        (state) => ({
            ...state,
            isLoading: true
        })
    ),
    on(MoviesListActions.getUpcomingMoviesFailure,
        (state) => ({
            ...state,
            isLoading: true
        })
    ),
    on(MoviesListActions.getUpcomingMoviesSuccess,
        (state, { movies }) => ({
            ...state,
            upcoming: movies,
            isLoading: false
        })
    ),
    on(MoviesListActions.getMoviesByCategory,
        (state) => ({
            ...state,
            isLoading: true
        })
    ),
    on(MoviesListActions.getMoviesByCategoryFailure,
        (state) => ({
            ...state,
            isLoading: true
        })
    ),
    on(MoviesListActions.getMoviesByCategorySuccess,
        (state, { category, movies }) => ({
            ...state,
            [category]: movies,
            isLoading: false
        })
    )
);

export function moviesListReducer(state: IMoviesListState, action: Action): IMoviesListState {
    return reducer(state, action);
}
