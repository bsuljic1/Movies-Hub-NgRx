import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IMoviesListState } from './movies-list.state';
import { Category } from '../../../../models/category.enum';

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

export const selectMovieById = (movieId: number, category: string) => createSelector(
  moviesListSelector,
  (state) => {
    switch (category) {
      case Category.Popular:
        return state.popularMovies.find(movie => movie.id === movieId);
      case Category.NowPlaying:
        return state.nowPlayingMovies.find(movie => movie.id === movieId);
      case Category.Upcoming:
        return state.upcomingMovies.find(movie => movie.id === movieId);
      case Category.TopRated:
        return state.topRatedMovies.find(movie => movie.id === movieId);
      default:
        return state.popularMovies.find(movie => movie.id === movieId);
    }
  }
);