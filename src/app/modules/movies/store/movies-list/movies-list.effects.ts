import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MovieListService } from '../../../../services/movie-list.service';
import * as MoviesListActions from './movies-list.actions';
import { catchError, map, of, switchMap } from 'rxjs';

@Injectable()
export class MoviesListEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly moviesListService: MovieListService
    ) { }

    getPopularMoviesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(MoviesListActions.getPopularMoviesRequest),
        switchMap(({ page }) => this.moviesListService.getPopularMovies(page)
            .pipe(
                map(movies => MoviesListActions.getPopularMoviesSuccess({ movies: movies.results })),
                catchError(() => of(MoviesListActions.getPopularMoviesFailure()))
            )
        )
    ));

    getNowPlayingMoviesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(MoviesListActions.getNowPlayingMovies),
        switchMap(({ page }) => this.moviesListService.getNowPlayingMovies(page)
            .pipe(
                map(movies => MoviesListActions.getNowPlayingMoviesSuccess({ movies : movies.results })),
                catchError(() => of(MoviesListActions.getNowPlayingMoviesFailure()))
            )
        )
    ));

    getTopRatedMoviesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(MoviesListActions.getTopRatedMovies),
        switchMap(({ page }) => this.moviesListService.getTopRatedMovies(page)
            .pipe(
                map(movies => MoviesListActions.getTopRatedMoviesSuccess({ movies: movies.results })),
                catchError(() => of(MoviesListActions.getTopRatedMoviesFailure()))
            )
        )
    ));

    getUpcomingMoviesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(MoviesListActions.getUpcomingMovies),
        switchMap(({ page }) => this.moviesListService.getUpcomingMovies(page)
            .pipe(
                map(movies => MoviesListActions.getUpcomingMoviesSuccess({ movies: movies.results })),
                catchError(() => of(MoviesListActions.getUpcomingMoviesFailure()))
            )
        )
    ));
}
