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
    )
);

export function moviesListReducer(state: IMoviesListState, action: Action): IMoviesListState {
    return reducer(state, action);
}
