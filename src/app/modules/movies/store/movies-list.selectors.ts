import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMoviesListState } from './movies-list.state';

export const moviesListSelector = createFeatureSelector<IMoviesListState>('moviesList');


export const popularMoviesSelector = createSelector(
    moviesListSelector,
  ({ popularMovies }) => popularMovies
);
