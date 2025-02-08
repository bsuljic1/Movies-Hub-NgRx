import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICoreState } from "./core.state";

export const coreSelector = createFeatureSelector<ICoreState>('core');

export const isLoggedInSelector = createSelector(
    coreSelector,
  ({ isLoggedIn }) => isLoggedIn
);

export const currentUserSelector = createSelector(
    coreSelector,
  ({ currentUser }) => currentUser
);

export const requestTokenSelector = createSelector(
    coreSelector,
  ({ token }) => token?.request_token
);

export const isLoadingSelector = createSelector(
  coreSelector,
({ isLoading }) => isLoading
);
