import { createAction, props } from "@ngrx/store";
import { Movie } from "../../../../models/movie.model";

export const addMovieToWatchlistRequest = createAction(
    '[Account] Add Movie To Watchlist Request',
    props<{ movieId: number }>()
);

export const addMovieToWatchlistSuccess = createAction(
    '[Account] Add Movie To Watchlist Success'
);

export const addMovieToWatchlistFailure = createAction(
    '[Account] Add Movie To Watchlist Failure'
);

export const getMoviesFromWatchlistRequest = createAction(
    '[Account] Get Movies From Watchlist Request'
);

export const getMoviesFromWatchlistSuccess = createAction(
    '[Account] Get Movies From Watchlist Success',
    props<{ movies: Movie[] }>()
);

export const getMoviesFromWatchlistFailure = createAction(
    '[Account] Get Movies From Watchlist Failure'
);

export const removeFromWatchlistRequest = createAction(
    '[Account] Remove Movie To Watchlist Request',
    props<{ movieId: number }>()
);

export const removeMovieToWatchlistSuccess = createAction(
    '[Account] Remove Movie To Watchlist Success'
);

export const removeMovieToWatchlistFailure = createAction(
    '[Account] Remove Movie To Watchlist Failure'
);

export const getRatedMoviesRequest = createAction(
    '[Account] Get Rated Movies Request'
);

export const getRatedMoviesSuccess = createAction(
    '[Account] Get Rated Movies Success',
    props<{ movies: Movie[] }>()
);

export const getRatedMoviesFailure = createAction(
    '[Account] Get Rated Movies Failure'
);

export const rateMovieRequest = createAction(
    '[Account] Rate Movie Request',
    props<{ movieId: number, rating: number }>()
);

export const rateMovieSuccess = createAction(
    '[Account] Rate Movie Success'
);

export const rateMovieFailure = createAction(
    '[Account] Rate Movie Failure'
);