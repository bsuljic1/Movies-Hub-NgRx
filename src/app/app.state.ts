import { IAccountState, initialAccountState } from "./modules/account/store/account/account.state";
import { ICoreState, initialCoreState } from "./modules/core/store/core.state";
import { IGenreState, initialGenreState } from "./modules/movies/store/genre/genre.state";
import { IMovieState, initialMovieState } from "./modules/movies/store/movie/movie.state";
import { IMoviesListState, initialMoviesListState } from "./modules/movies/store/movies-list/movies-list.state";
import { initialSearchState, ISearchState } from "./modules/movies/store/search/search.state";


export interface IAppState {
    moviesList: IMoviesListState;
    genre: IGenreState,
    search: ISearchState,
    core: ICoreState,
    account: IAccountState,
    movie: IMovieState
}

export const initialState: IAppState = {
    moviesList: initialMoviesListState,
    genre: initialGenreState,
    search: initialSearchState,
    core: initialCoreState,
    account: initialAccountState,
    movie: initialMovieState
};
