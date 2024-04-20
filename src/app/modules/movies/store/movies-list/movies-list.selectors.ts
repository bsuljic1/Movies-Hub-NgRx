import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMoviesListState } from './movies-list.state';

export const moviesListSelector = createFeatureSelector<IMoviesListState>('moviesList');

export const popularMoviesSelector = createSelector(
  moviesListSelector,
  ({ popularMovies }) => popularMovies
);

export const nowPlayingMoviesSelector = createSelector(
  moviesListSelector,
  ({ nowPlayingMovies }) => nowPlayingMovies
);

export const topRatedMoviesSelector = createSelector(
  moviesListSelector,
  ({ topRatedMovies }) => topRatedMovies
);

export const upcomingMoviesSelector = createSelector(
  moviesListSelector,
  ({ upcomingMovies }) => upcomingMovies
);