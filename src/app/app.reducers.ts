import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { IAppState } from './app.state';
import { moviesListReducer } from './modules/movies/store/movies-list/movies-list.reducer';
import { movieReducer } from './modules/movies/store/movie/movie.reducer';
import { searchReducer } from './modules/movies/store/search/search.reducers';
import { genreReducer } from './modules/movies/store/genre/genre.reducer';
import { coreReducer } from './modules/core/store/core.reducer';
import { accountReducer } from './modules/account/store/account/account.reducers';

export const reducers: ActionReducerMap<IAppState> = {
    moviesList: moviesListReducer,
    movie: movieReducer,
    search: searchReducer,
    genre: genreReducer,
    core: coreReducer,
    account: accountReducer
};

export const metaReducers: MetaReducer<IAppState>[] = [];
