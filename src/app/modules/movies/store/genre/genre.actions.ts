import { createAction, props } from '@ngrx/store';
import { Genre } from '../../../../models/genre.model';

export const getMovieGenresRequest = createAction(
    '[Genre] Get Movie Genres Request'
);

export const getMovieGenresSuccess = createAction(
    '[Genre] Get Movie Genres Success',
    props<{ movieGenres: Genre[] }>()
);

export const getMovieGenresFailure = createAction(
    '[Genre] Get Movie Genres Failure'
);