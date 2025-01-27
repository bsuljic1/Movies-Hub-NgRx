import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as SearchActions from './search.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { SearchService } from '../../../../services/search.service';

@Injectable()
export class SearchEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly searchService: SearchService
    ) { }

    searchMovies$ = createEffect(() => this.actions$.pipe(
        ofType(SearchActions.searchMoviesRequest),
        switchMap(({ query }) => this.searchService.searchMovies(query)
            .pipe(
                map(response => SearchActions.searchMoviesSuccess({ searchResult: response.results })),
                catchError(() => of(SearchActions.searchMoviesFailure()))
            )
        )
    ));
}
