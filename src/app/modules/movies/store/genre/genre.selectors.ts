import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IGenreState } from "./genre.state";
import { Genre } from "../../../../models/genre.model";

export const genreSelector = createFeatureSelector<IGenreState>('genre');

export const movieGenresSelector = createSelector(
    genreSelector,
  ({ movieGenres }) => movieGenres
);

export const getGenresByIds = (genreIds: number[]) => createSelector(
    genreSelector,
    (state) => {
        let genres: Genre[] = [];
        genreIds.forEach(genreId => genres.push(state.movieGenres?.find(genre => genre.id === genreId)));
        return genres;
    }
  );