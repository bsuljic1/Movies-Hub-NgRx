import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as GenreActions from './genre.actions';
import { catchError, filter, map, mergeMap, of, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { GenreService } from '../../../../services/genre.service';
import { DiscoverMovieService } from '../../../../services/discover.service';
import { IAppState } from '../../../../app.state';
import { Store } from '@ngrx/store';
import { genresSelector, selectMoviesByGenres } from './genre.selectors';
import { setIsLoading } from '../../../core/store/core.actions';

@Injectable()
export class GenreEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly genreService: GenreService,
        private readonly discoverService: DiscoverMovieService,
        private readonly store$: Store<IAppState>
    ) { }

    getGenres$ = createEffect(() => this.actions$.pipe(
        ofType(GenreActions.getGenresRequest),
        withLatestFrom(this.store$.select(genresSelector).pipe(take(1))),
        filter(([_, genres]) => !genres || genres.length === 0),
        map(() => GenreActions.getGenresForce())
    ));

    getGenresForce$ = createEffect(() => this.actions$.pipe(
        ofType(GenreActions.getGenresForce),
        tap(() => this.store$.dispatch(setIsLoading({ isLoading: true }))),
        switchMap(() => this.genreService.getMovieGenres()
            .pipe(
                map(response => GenreActions.getGenresSuccess({ genres: response.genres })),
                catchError(() => of(GenreActions.getGenresFailure()))
            )
        )
    ));

    completedAction$ = createEffect(() => this.actions$.pipe(
        ofType(
            GenreActions.getGenresSuccess,
            GenreActions.getGenresFailure,
            GenreActions.getMoviesByGenreFailure,
            GenreActions.getMoviesByGenreSuccess
        ),
        map(() => setIsLoading({ isLoading: false }))
    ));

    getMoviesByGenre$ = createEffect(() => this.actions$.pipe(
        ofType(GenreActions.getMoviesByGenreRequest),
        mergeMap(({ genres }) => this.store$.select(selectMoviesByGenres(genres)).pipe(
            take(1),
            filter(existingGenres => !existingGenres || existingGenres.length === 0),
            map(() => GenreActions.getMoviesByGenreForce({ genres }))
        ))
    ));

    getMoviesByGenreForce$ = createEffect(() => this.actions$.pipe(
        ofType(GenreActions.getMoviesByGenreForce),
        tap(() => this.store$.dispatch(setIsLoading({ isLoading: true }))),
        switchMap(({ genres }) => this.discoverService.getMovieByGenres(genres)
            .pipe(
                map(response => GenreActions.getMoviesByGenreSuccess({ genres, movies: response.results })),
                catchError(() => of(GenreActions.getMoviesByGenreFailure()))
            )
        )
    ));
}
