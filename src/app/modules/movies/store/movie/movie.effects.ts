import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as MovieActions from './movie.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { MovieService } from '../../../../services/movie.service';

@Injectable()
export class MovieEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly movieService: MovieService
    ) { }

    getMovieDetailsById$ = createEffect(() => this.actions$.pipe(
        ofType(MovieActions.getMovieDetailsByIdRequest),
        switchMap(({ id }) => this.movieService.getMovieDetailsById(id)
            .pipe(
                map(movie => MovieActions.getMovieDetailsByIdSuccess({ movie })),
                catchError(() => of(MovieActions.getMovieDetailsByIdFailure()))
            )
        )
    ));

    getWatchProviderForMovie$ = createEffect(() => this.actions$.pipe(
        ofType(MovieActions.getWatchProviderForMovie),
        switchMap(({ movieId }) => this.movieService.getWatchProviderForMovie(movieId)
            .pipe(
            map(providers => MovieActions.getWatchProviderForMovieSuccess({ watchProviders: providers.results['US']?.rent ?? providers.results['US']?.flatrate })),
                catchError(() => of(MovieActions.getWatchProviderForMovieFailure()))
            )
        )
    ));

    getImagesForMovie$ = createEffect(() => this.actions$.pipe(
        ofType(MovieActions.getImagesForMovie),
        switchMap(({ movieId }) => this.movieService.getMovieImages(movieId)
            .pipe(
            map(response => MovieActions.getImagesForMovieSuccess({ images: response.backdrops })),
                catchError(() => of(MovieActions.getImagesForMovieFailure()))
            )
        )
    ));

    getReviewsForMovie$ = createEffect(() => this.actions$.pipe(
        ofType(MovieActions.getReviewsForMovie),
        switchMap(({ movieId }) => this.movieService.getReviewsForMovie(movieId)
            .pipe(
            map(response => MovieActions.getReviewsForMovieSuccess({ reviews: response.results })),
                catchError(() => of(MovieActions.getReviewsForMovieFailure()))
            )
        )
    ));

    getVideosForMovie$ = createEffect(() => this.actions$.pipe(
        ofType(MovieActions.getVideosForMovieRequest),
        switchMap(({ movieId }) => this.movieService.getVideosForMovie(movieId)
            .pipe(
            map(response => MovieActions.getVideosForMovieSuccess({ trailer: response.results.find(x => x.site === "YouTube") })),
                catchError(() => of(MovieActions.getVideosForMovieFailure()))
            )
        )
    ));
}
