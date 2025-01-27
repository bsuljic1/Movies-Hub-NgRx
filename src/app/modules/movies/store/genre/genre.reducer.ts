import { createReducer, Action, on } from '@ngrx/store';
import { IGenreState, initialGenreState } from './genre.state';
import { getMovieGenresSuccess } from './genre.actions';

const reducer = createReducer(
    initialGenreState,
    on(getMovieGenresSuccess,
        (state, { movieGenres }) => ({
            ...state,
            movieGenres
        })
    )
);

export function genreReducer(state: IGenreState, action: Action): IGenreState {
    return reducer(state, action);
}
