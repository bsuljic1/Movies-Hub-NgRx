import { createAction, props } from '@ngrx/store';
import { Movie } from '../../../../models/movie.model';
import { Category } from '../../../../models/category.enum';

// POPULAR
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

/// NOW PLAYING
export const getNowPlayingMovies = createAction(
    '[MoviesList] Get Now Playing Movies Request',
    props<{ page: number }>()
);

export const getNowPlayingMoviesSuccess = createAction(
    '[MoviesList] Get Now Playing Movies Success',
    props<{ movies: Movie[] }>()
);

export const getNowPlayingMoviesFailure = createAction(
    '[MoviesList] Get Now Playing Movies Failure'
);

// TOP RATED
export const getTopRatedMovies = createAction(
    '[MoviesList] Get Top Rated Movies Request',
    props<{ page: number }>()
);

export const getTopRatedMoviesSuccess = createAction(
    '[MoviesList] Get Top Rated Movies Success',
    props<{ movies: Movie[] }>()
);

export const getTopRatedMoviesFailure = createAction(
    '[MoviesList] Get Top Rated Movies Failure'
);

// UPCOMING

export const getUpcomingMovies = createAction(
    '[MoviesList] Get Upcoming Movies Request',
    props<{ page: number }>()
);

export const getUpcomingMoviesSuccess = createAction(
    '[MoviesList] Get Upcoming Movies Success',
    props<{ movies: Movie[] }>()
);

export const getUpcomingMoviesFailure = createAction(
    '[MoviesList] Get Upcoming Movies Failure'
);

export const getMoviesByCategory = createAction(
    '[MoviesList] Get Movies By Category Request',
    props<{ category: Category }>()
);

export const getMoviesByCategorySuccess = createAction(
    '[MoviesList] Get Movies By Category Success',
    props<{ category: Category, movies: Movie[] }>()
);

export const getMoviesByCategoryFailure = createAction(
    '[MoviesList] Get Movies By Category Failure',
);
