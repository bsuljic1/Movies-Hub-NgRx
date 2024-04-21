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
}
