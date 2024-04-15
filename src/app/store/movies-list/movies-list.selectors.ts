import { createSelector } from '@ngrx/store';
import { appSelectors } from '../app.selectors';

const moviesListSelector = createSelector(
    appSelectors,
    state => state.moviesList
  );

export const popularMoviesSelector = createSelector(
    moviesListSelector,
  ({ popularMovies }) => popularMovies
);
