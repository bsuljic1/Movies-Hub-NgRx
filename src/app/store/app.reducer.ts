import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { IAppState } from './app.state';
import { moviesListReducer } from './movies-list/movies-list.reducer';


export const reducers: ActionReducerMap<IAppState> = {
  moviesList: moviesListReducer
};


export const metaReducers: MetaReducer<IAppState>[] = [];