import { createAction, props } from '@ngrx/store';
import { Movie } from '../../../../models/movie.model';

export const searchMoviesRequest = createAction(
    '[Search] Search Movies Request',
    props<{ query: string }>()
);

export const searchMoviesSuccess = createAction(
    '[Search] Search Movies Success',
    props<{ searchResult: Movie[] }>()
);

export const searchMoviesFailure = createAction(
    '[Search] Search Movies Failure'
);