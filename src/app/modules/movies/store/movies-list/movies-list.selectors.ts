import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMoviesListState } from './movies-list.state';
import { Category } from '../../../../models/category.enum';

export const moviesListSelector = createFeatureSelector<IMoviesListState>('moviesList');

export const popularMoviesSelector = createSelector(
  moviesListSelector,
  ({ popular }) => popular
);

export const nowPlayingMoviesSelector = createSelector(
  moviesListSelector,
  ({ nowPlaying }) => nowPlaying
);

export const topRatedMoviesSelector = createSelector(
  moviesListSelector,
  ({ topRated }) => topRated
);

export const upcomingMoviesSelector = createSelector(
  moviesListSelector,
  ({ upcoming }) => upcoming
);

export const isLoadingSelector = createSelector(
  moviesListSelector,
  ({ isLoading }) => isLoading
);

export const selectMoviesByCategory = (category: Category) => createSelector(
  moviesListSelector,
  (state) => {
    switch (category) {
      case Category.Popular:
        return state.popular;
      case Category.NowPlaying:
        return state.nowPlaying;
      case Category.Upcoming:
        return state.upcoming;
      case Category.TopRated:
        return state.topRated;
      default:
        return state.popular;
    }
  });

export const selectMovieById = (movieId: number, category: string) => createSelector(
  moviesListSelector,
  (state) => {
    switch (category) {
      case Category.Popular:
        return state.popular.find(movie => movie.id === movieId);
      case Category.NowPlaying:
        return state.nowPlaying.find(movie => movie.id === movieId);
      case Category.Upcoming:
        return state.upcoming.find(movie => movie.id === movieId);
      case Category.TopRated:
        return state.topRated.find(movie => movie.id === movieId);
      default:
        return state.popular.find(movie => movie.id === movieId);
    }
  }
);