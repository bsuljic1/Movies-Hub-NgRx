import { createReducer, Action, on } from '@ngrx/store';
import { initialSearchState, ISearchState } from './search.state';
import { searchMoviesRequest, searchMoviesSuccess } from './search.actions';

const reducer = createReducer(
    initialSearchState,
    on(searchMoviesRequest,
        (state, { query }) => ({
            ...state,
            searchQuery: query
        })
    ),
    on(searchMoviesSuccess,
        (state, { searchResult }) => ({
            ...state,
            searchResult
        })
    )
);

export function searchReducer(state: ISearchState, action: Action): ISearchState {
    return reducer(state, action);
}
