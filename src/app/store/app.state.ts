import { IMoviesListState, initialMoviesListState } from './movies-list/movies-list.state';


export interface IAppState {
    moviesList: IMoviesListState;
}

export const initialState: IAppState = {
    moviesList: initialMoviesListState
};
