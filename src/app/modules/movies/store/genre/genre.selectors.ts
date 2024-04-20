import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IGenreState } from "./genre.state";

export const genreSelector = createFeatureSelector<IGenreState>('genre');

export const movieGenesSelector = createSelector(
    genreSelector,
  ({ movieGenres }) => movieGenres
);
