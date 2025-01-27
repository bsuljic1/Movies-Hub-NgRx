import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AccountActions from './account.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { WatchlistService } from '../../../../services/watchlist.service';
import { RatingsService } from '../../../../services/ratings.service';
import { showNotification } from '../../../core/store/notifications/notifications.actions';
import { NotificationType } from '../../../../models/notification-type.enum';

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

    addMovieToWatchlistSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AccountActions.addMovieToWatchlistSuccess),
        map(() => showNotification({
            notificationType: NotificationType.Success,
            detail: "You've successfully added a movie to watchlist."
        }))
    ));

    actionFailure$ = createEffect(() => this.actions$.pipe(
        ofType(
            AccountActions.addMovieToWatchlistFailure,
            AccountActions.removeMovieFromWatchlistFailure,
            AccountActions.getRatedMoviesFailure,
            AccountActions.getMoviesFromWatchlistFailure,
            AccountActions.rateMovieFailure,
        ),
        map(() => showNotification({
            notificationType: NotificationType.Error,
            detail: "Something went wrong. Please try again."
        }))
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
                map(response => AccountActions.removeMovieFromWatchlistSuccess()),
                catchError(() => of(AccountActions.removeMovieFromWatchlistFailure()))
            )
        )
    ));

    removeMovieFromWatchlistSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AccountActions.removeMovieFromWatchlistSuccess),
        map(() => showNotification({
            notificationType: NotificationType.Success,
            detail: "You've successfully removed a movie from watchlist."
        }))
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
                map(() => AccountActions.rateMovieSuccess()),
                catchError(() => of(AccountActions.rateMovieFailure()))
            )
        )
    ));

    rateMovieSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(AccountActions.rateMovieSuccess),
        map(() => showNotification({
            notificationType: NotificationType.Success,
            detail: "You've successfully rated a movie."
        }))
    ));
}
