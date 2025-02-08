import { Movie } from "../../../../models/movie.model";

export interface IAccountState {
    watchlist: Movie[];
    ratedMovies: Movie[];
}

export const initialAccountState: IAccountState = {
    watchlist: [],
    ratedMovies: []
};
