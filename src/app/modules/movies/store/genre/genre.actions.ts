import { createAction, props } from '@ngrx/store';
import { Genre } from '../../../../models/genre.model';
import { Movie } from '../../../../models/movie.model';

export const getGenresRequest = createAction(
    '[Genre] Get Genres Request'
);

export const getGenresForce = createAction(
    '[Genre] Get Genres Force Request'
);

export const getGenresSuccess = createAction(
    '[Genre] Get Genres Success',
    props<{ genres: Genre[] }>()
);

export const getGenresFailure = createAction(
    '[Genre] Get Genres Failure'
);

export const getMoviesByGenreRequest = createAction(
    '[Genre] Get Movies By Genre Request',
    props<{ genres: string }>()
);

export const getMoviesByGenreForce = createAction(
    '[Genre] Get Movies By Genre Force',
    props<{ genres: string }>()
);

export const getMoviesByGenreSuccess = createAction(
    '[Genre] Get Movies By Genre Success',
    props<{ genres: string, movies: Movie[] }>()
);


export const getMoviesByGenreFailure = createAction(
    '[Genre] Get Movies By Genre Failure'
);
