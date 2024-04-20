import { IMoviesListState, initialMoviesListState } from "./modules/movies/store/movies-list/movies-list.state";


export interface IAppState {
    moviesList: IMoviesListState;
}

export const initialState: IAppState = {
    moviesList: initialMoviesListState
};
