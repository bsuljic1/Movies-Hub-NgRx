import { createReducer, Action, on } from '@ngrx/store';
import { initialSearchState, ISearchState } from './search.state';
import { searchMoviesFailure, searchMoviesRequest, searchMoviesSuccess } from './search.actions';

const reducer = createReducer(
    initialSearchState,
    on(searchMoviesRequest,
        (state, { query }) => ({
            ...state,
            searchQuery: query,
            isLoading: true
        })
    ),
    on(searchMoviesSuccess,
        (state, { searchResult }) => ({
            ...state,
            searchResult,
            isLoading: false
        })
    ),
    on(searchMoviesFailure,
        (state) => ({
            ...state,
            isLoading: false
        })
    ),
);

export function searchReducer(state: ISearchState, action: Action): ISearchState {
    return reducer(state, action);
}
