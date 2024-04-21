import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IMovieState } from "./movie.state";

export const movieSelector = createFeatureSelector<IMovieState>('movie');

export const selectedMovieSelector = createSelector(
    movieSelector,
  ({ selectedMovie }) => selectedMovie
);

export const watchProvidersSelector = createSelector(
    movieSelector,
  ({ watchProviders }) => watchProviders
);

export const imagesSelector = createSelector(
    movieSelector,
  ({ images }) => images
);

export const reviewsSelector = createSelector(
    movieSelector,
  ({ reviews }) => reviews
);
