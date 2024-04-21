import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoreActions from './core.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { AuthenticationService } from '../../../services/auth.service';

@Injectable()
export class CoreEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly authService: AuthenticationService
    ) { }

    createRequestToken$ = createEffect(() => this.actions$.pipe(
        ofType(CoreActions.createRequestToken),
        switchMap(() => this.authService.createRequestToken()
            .pipe(
                map(token => CoreActions.createRequestTokenSuccess({ token })),
                catchError(() => of(CoreActions.createRequestTokenFailure()))
            )
        )
    ));
}
