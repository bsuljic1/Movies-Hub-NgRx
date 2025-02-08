import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MovieListService } from '../../../../services/movie-list.service';
import * as MoviesListActions from './movies-list.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Category } from '../../../../models/category.enum';
import { IAppState } from '../../../../app.state';
import { Store } from '@ngrx/store';
import { setIsLoading } from '../../../core/store/core.actions';

@Injectable()
export class MoviesListEffects {
    constructor(
        private readonly actions$: Actions,
        private readonly moviesListService: MovieListService,
        private readonly store$: Store<IAppState>
    ) { }

    getPopularMoviesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(MoviesListActions.getPopularMoviesRequest),
        tap(() => this.store$.dispatch(setIsLoading({ isLoading: true }))),
        switchMap(({ page }) => this.moviesListService.getPopularMovies(page)
            .pipe(
                map(movies => MoviesListActions.getPopularMoviesSuccess({ movies: movies.results })),
                catchError(() => of(MoviesListActions.getPopularMoviesFailure()))
            )
        )
    ));

    getNowPlayingMoviesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(MoviesListActions.getNowPlayingMovies),
        tap(() => this.store$.dispatch(setIsLoading({ isLoading: true }))),
        switchMap(({ page }) => this.moviesListService.getNowPlayingMovies(page)
            .pipe(
                map(movies => MoviesListActions.getNowPlayingMoviesSuccess({ movies: movies.results })),
                catchError(() => of(MoviesListActions.getNowPlayingMoviesFailure()))
            )
        )
    ));

    getTopRatedMoviesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(MoviesListActions.getTopRatedMovies),
        tap(() => this.store$.dispatch(setIsLoading({ isLoading: true }))),
        switchMap(({ page }) => this.moviesListService.getTopRatedMovies(page)
            .pipe(
                map(movies => MoviesListActions.getTopRatedMoviesSuccess({ movies: movies.results })),
                catchError(() => of(MoviesListActions.getTopRatedMoviesFailure()))
            )
        )
    ));

    getUpcomingMoviesRequest$ = createEffect(() => this.actions$.pipe(
        ofType(MoviesListActions.getUpcomingMovies),
        tap(() => this.store$.dispatch(setIsLoading({ isLoading: true }))),
        switchMap(({ page }) => this.moviesListService.getUpcomingMovies(page)
            .pipe(
                map(movies => MoviesListActions.getUpcomingMoviesSuccess({ movies: movies.results })),
                catchError(() => of(MoviesListActions.getUpcomingMoviesFailure()))
            )
        )
    ));

    getMoviesByCategory$ = createEffect(() => this.actions$.pipe(
        ofType(MoviesListActions.getMoviesByCategory),
        tap(() => this.store$.dispatch(setIsLoading({ isLoading: true }))),
        switchMap(({ category }) => {
            return this.getMoviesByCategory(category)
                .pipe(
                    map(movies => MoviesListActions.getMoviesByCategorySuccess({ movies: movies.results, category })),
                    catchError(() => of(MoviesListActions.getMoviesByCategoryFailure()))
                )
        }
        )
    ));

    completedAction$ = createEffect(() => this.actions$.pipe(
        ofType(
            MoviesListActions.getMoviesByCategorySuccess,
            MoviesListActions.getUpcomingMoviesSuccess,
            MoviesListActions.getTopRatedMoviesSuccess,
            MoviesListActions.getPopularMoviesSuccess,
            MoviesListActions.getNowPlayingMoviesSuccess
        ),
        map(() => setIsLoading({ isLoading: false }))
    ));

    getMoviesByCategory(category: Category) {
        switch (category) {
            case Category.Popular:
                return this.moviesListService.getPopularMovies();
            case Category.NowPlaying:
                return this.moviesListService.getNowPlayingMovies();
            case Category.Upcoming:
                return this.moviesListService.getUpcomingMovies();
            case Category.TopRated:
                return this.moviesListService.getTopRatedMovies();
            default:
                return this.moviesListService.getPopularMovies();
        }
    }
}
