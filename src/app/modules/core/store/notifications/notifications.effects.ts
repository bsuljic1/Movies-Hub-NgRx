import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as NotificationActions from './notifications.actions';
import { tap } from 'rxjs';
import { MessageService } from 'primeng/api';

@Injectable()
export class NotificationEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly messageService: MessageService
    ) { }

    showNotification$ = createEffect(() => this.actions$.pipe(
        ofType(NotificationActions.showNotification),
        tap(({ notificationType, detail }) =>
            this.messageService.add({ severity: notificationType, summary: notificationType, detail }))),
        { dispatch: false }
    );
}
