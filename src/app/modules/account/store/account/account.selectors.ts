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

export const isLoadingSelector = createSelector(
    accountSelector,
  ({ isLoading }) => isLoading
);
