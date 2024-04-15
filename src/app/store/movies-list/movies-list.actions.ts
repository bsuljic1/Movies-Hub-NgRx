import { createAction, props } from '@ngrx/store';
import { Movie } from '../../models/movie.model';

export const getPopularMoviesRequest = createAction(
    '[MoviesList] Get Popular Movies Request',
    props<{ page: number }>()
);

export const getPopularMoviesSuccess = createAction(
    '[MoviesList] Get Popular Movies Success',
    props<{ movies: Movie[] }>()
);

export const getPopularMoviesFailure = createAction(
    '[MoviesList] Get Popular Movies Failure'
);
