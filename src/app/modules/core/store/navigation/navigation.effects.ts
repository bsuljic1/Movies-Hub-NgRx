import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as NavigationActions from './navigation.actions';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Injectable()
export class NavigationEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly router: Router

    ) { }

    navigateHome = createEffect(() => this.actions$.pipe(
        ofType(NavigationActions.navigateMovieDetails),
        tap(({ movieId }) => void this.router.navigate([`details/${movieId}`]))),
        { dispatch: false }
    );

    navigateToMovieCategory = createEffect(() => this.actions$.pipe(
        ofType(NavigationActions.navigateToMovieCategory),
        tap(({ category }) => void this.router.navigate([`category/${category.toLowerCase()}`]))),
        { dispatch: false }
    );

    navigateToSearchResults = createEffect(() => this.actions$.pipe(
        ofType(NavigationActions.navigateToSearchResults),
        tap(({ queryParams }) => void this.router.navigate([`search`], { queryParams }))),
        { dispatch: false }
    );

    navigateToWatchlist = createEffect(() => this.actions$.pipe(
        ofType(NavigationActions.navigateToWatchlist),
        tap(() => void this.router.navigate(['watchlist']))),
        { dispatch: false }
    );

    navigateToMyRatings = createEffect(() => this.actions$.pipe(
        ofType(NavigationActions.navigateToMyRatings),
        tap(() => void this.router.navigate(['ratings']))),
        { dispatch: false }
    );
}
