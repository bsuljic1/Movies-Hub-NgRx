import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IMovieState } from "./movie.state";

export const movieSelector = createFeatureSelector<IMovieState>('movie');

export const selectedMovieSelector = createSelector(
    movieSelector,
  ({ selectedMovie }) => selectedMovie
);
