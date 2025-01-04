import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AccountActions from './account.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { WatchlistService } from '../../../../services/watchlist.service';
import { RatingsService } from '../../../../services/ratings.service';

@Injectable()
export class AccountEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly watchlistService: WatchlistService,
        private readonly ratingsService: RatingsService
    ) { }

    addMovieToWatchList$ = createEffect(() => this.actions$.pipe(
        ofType(AccountActions.addMovieToWatchlistRequest),
        switchMap(({ movieId }) => this.watchlistService.addToWatchlist(movieId, true)
            .pipe(
                map(response => response.success ? AccountActions.addMovieToWatchlistSuccess() : AccountActions.addMovieToWatchlistFailure()),
                catchError(() => of(AccountActions.addMovieToWatchlistFailure()))
            )
        )
    ));

    getMoviesFromWatchList$ = createEffect(() => this.actions$.pipe(
        ofType(AccountActions.getMoviesFromWatchlistRequest),
        switchMap(() => this.watchlistService.getMoviesFromWatchlist()
            .pipe(
                map(response => AccountActions.getMoviesFromWatchlistSuccess({ movies: response.results })),
                catchError(() => of(AccountActions.getMoviesFromWatchlistFailure()))
            )
        )
    ));

    removeMovieFromWatchlist$ = createEffect(() => this.actions$.pipe(
        ofType(AccountActions.removeFromWatchlistRequest),
        switchMap(({ movieId }) => this.watchlistService.addToWatchlist(movieId, false)
            .pipe(
                map(response => AccountActions.removeMovieToWatchlistSuccess()),
                catchError(() => of(AccountActions.removeMovieToWatchlistFailure()))
            )
        )
    ));

    getRatedMovies$ = createEffect(() => this.actions$.pipe(
        ofType(AccountActions.getRatedMoviesRequest),
        switchMap(() => this.ratingsService.getRatedMovies()
            .pipe(
                map(response => AccountActions.getRatedMoviesSuccess({ movies: response.results })),
                catchError(() => of(AccountActions.getRatedMoviesFailure()))
            )
        )
    ));

    rateMovie$ = createEffect(() => this.actions$.pipe(
        ofType(AccountActions.rateMovieRequest),
        switchMap(({ movieId, rating }) => this.ratingsService.addRatingForMovie(movieId, rating)
            .pipe(
                map(response => AccountActions.rateMovieSuccess()),
                catchError(() => of(AccountActions.rateMovieFailure()))
            )
        )
    ));
}
