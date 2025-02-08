import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAccountState } from "./account.state";

export const accountSelector = createFeatureSelector<IAccountState>('account');

export const watchlistSelector = createSelector(
  accountSelector,
  ({ watchlist }) => watchlist
);

export const ratedMoviesSelector = createSelector(
  accountSelector,
  ({ ratedMovies }) => ratedMovies
);

export const myRatingForselectedMovieSelector = (movieId: number) => createSelector(
  accountSelector,
  ({ ratedMovies }) => ratedMovies?.find(movie => movie.id === movieId)?.rating
);