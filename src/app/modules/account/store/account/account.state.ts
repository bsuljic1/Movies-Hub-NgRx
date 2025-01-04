import { Movie } from "../../../../models/movie.model";

export interface IAccountState {
    watchlist: Movie[];
    ratedMovies: Movie[];
    isLoading: boolean;
}

export const initialAccountState: IAccountState = {
    watchlist: [],
    ratedMovies: [],
    isLoading: false
};
