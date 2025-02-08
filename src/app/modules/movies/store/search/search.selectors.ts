import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ISearchState } from "./search.state";

export const searchSelector = createFeatureSelector<ISearchState>('search');

export const searchResultSelector = createSelector(
    searchSelector,
  ({ searchResult }) => searchResult
);
