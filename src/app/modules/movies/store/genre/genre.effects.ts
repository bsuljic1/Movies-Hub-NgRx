import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as GenreActions from './genre.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { GenreService } from '../../../../services/genre.service';

@Injectable()
export class GenreEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly genreService: GenreService
    ) { }

    getMovieGenres$ = createEffect(() => this.actions$.pipe(
        ofType(GenreActions.getMovieGenresRequest),
        switchMap(() => this.genreService.getMovieGenres()
            .pipe(
                map(response => GenreActions.getMovieGenresSuccess({ movieGenres: response.genres })),
                catchError(() => of(GenreActions.getMovieGenresFailure()))
            )
        )
    ));
}
