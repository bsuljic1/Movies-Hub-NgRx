import { createReducer, Action, on } from '@ngrx/store';
import { IAccountState, initialAccountState } from './account.state';
import { addMovieToWatchlistFailure, addMovieToWatchlistRequest, addMovieToWatchlistSuccess, getMoviesFromWatchlistFailure, getMoviesFromWatchlistRequest, getMoviesFromWatchlistSuccess, getRatedMoviesFailure, getRatedMoviesRequest, getRatedMoviesSuccess } from './account.actions';

const reducer = createReducer(
    initialAccountState,
    on(addMovieToWatchlistRequest,
        (state) => ({
            ...state,
            isLoading: true
        })
    ),
    on(addMovieToWatchlistFailure,
        (state) => ({
            ...state,
            isLoading: false
        })
    ),
    on(addMovieToWatchlistSuccess,
        (state) => ({
            ...state,
            isLoading: false
        })
    ),
    on(getMoviesFromWatchlistRequest,
        (state) => ({
            ...state,
            isLoading: true
        })
    ),
    on(getMoviesFromWatchlistFailure,
        (state) => ({
            ...state,
            isLoading: false
        })
    ),
    on(getMoviesFromWatchlistSuccess,
        (state, { movies }) => ({
            ...state,
            watchlist: movies,
            isLoading: false
        })
    ),
    on(getRatedMoviesRequest,
        (state) => ({
            ...state,
            isLoading: true
        })
    ),
    on(getRatedMoviesFailure,
        (state) => ({
            ...state,
            isLoading: false
        })
    ),
    on(getRatedMoviesSuccess,
        (state, { movies }) => ({
            ...state,
            ratedMovies: movies,
            isLoading: false
        })
    )
);

export function accountReducer(state: IAccountState, action: Action): IAccountState {
    return reducer(state, action);
}
