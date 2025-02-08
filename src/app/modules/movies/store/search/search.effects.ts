import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SearchActions from './search.actions';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { SearchService } from '../../../../services/search.service';
import { IAppState } from '../../../../app.state';
import { Store } from '@ngrx/store';
import { setIsLoading } from '../../../core/store/core.actions';

@Injectable()
export class SearchEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly searchService: SearchService,
        private readonly store$: Store<IAppState>
    ) { }

    searchMovies$ = createEffect(() => this.actions$.pipe(
        ofType(SearchActions.searchMoviesRequest),
        tap(() => this.store$.dispatch(setIsLoading({ isLoading: true }))),
        switchMap(({ query }) => this.searchService.searchMovies(query)
            .pipe(
                map(response => SearchActions.searchMoviesSuccess({ searchResult: response.results })),
                catchError(() => of(SearchActions.searchMoviesFailure()))
            )
        )
    ));

        completedAction$ = createEffect(() => this.actions$.pipe(
            ofType(
                SearchActions.searchMoviesSuccess,
                SearchActions.searchMoviesFailure
            ),
            map(() => setIsLoading({ isLoading: false }))
        ));
}
