import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { MovieListService } from '../../../services/movie-list.service';
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
                map(movies => MoviesListActions.getPopularMoviesSuccess({ movies })),
                catchError(() => of(MoviesListActions.getPopularMoviesFailure()))
            )
        )
    ));
}
