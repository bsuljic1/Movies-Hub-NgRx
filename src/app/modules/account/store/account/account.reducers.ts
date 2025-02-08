import { createReducer, Action, on } from '@ngrx/store';
import { IAccountState, initialAccountState } from './account.state';
import { getMoviesFromWatchlistSuccess, getRatedMoviesSuccess } from './account.actions';

const reducer = createReducer(
    initialAccountState,
    on(getMoviesFromWatchlistSuccess,
        (state, { movies }) => ({
            ...state,
            watchlist: movies
        })
    ),
    on(getRatedMoviesSuccess,
        (state, { movies }) => ({
            ...state,
            ratedMovies: movies
        })
    )
);

export function accountReducer(state: IAccountState, action: Action): IAccountState {
    return reducer(state, action);
}
