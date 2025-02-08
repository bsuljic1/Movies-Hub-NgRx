import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IGenreState } from "./genre.state";

export const genreSelector = createFeatureSelector<IGenreState>('genre');

export const genresSelector = createSelector(
  genreSelector,
  ({ genres }) => genres
);

export const movieGenresSelector = createSelector(
  genreSelector,
  ({ movieGenres }) => movieGenres
);

export const selectMoviesByGenres = (genresIds: string) => createSelector(
  genreSelector,
  (state) => {
    return state.movieGenres[genresIds] || [];
  }
);