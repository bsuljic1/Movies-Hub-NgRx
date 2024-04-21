import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../app.state';
import { Subject, filter, takeUntil } from 'rxjs';
import { ExtendedMovie } from '../../../../models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../../models/category.enum';
import { Image } from '../../../../models/image.model';
import { Genre } from '../../../../models/genre.model';
import { imagesSelector, reviewsSelector, selectedMovieSelector, watchProvidersSelector } from '../../store/movie/movie.selectors';
import { getImagesForMovie, getMovieDetailsByIdRequest, getReviewsForMovie, getWatchProviderForMovie } from '../../store/movie/movie.actions';
import { Review } from '../../../../models/review.model';

@Component({
    selector: 'movie-details',
    templateUrl: './movie-details.component.html',
    styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject<void>();
    movie: ExtendedMovie;
    movieId: number;
    category: Category;
    genres: Genre[];
    watchProviders$ = this.store$.select(watchProvidersSelector);
    images: Image[] = [];
    reviews: Review[] = [];
    responsiveOptions: any[] | undefined;

    constructor(
        private readonly store$: Store<IAppState>,
        private readonly activatedRoute: ActivatedRoute
    ) { }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    ngOnInit(): void {
        this.activatedRoute.params.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(params => {
            this.movieId = +params.movieId;
            this.store$.dispatch(getMovieDetailsByIdRequest({ id: this.movieId }));
            this.store$.dispatch(getWatchProviderForMovie({ movieId: this.movieId }));
            this.store$.dispatch(getImagesForMovie({ movieId: this.movieId }));
            this.store$.dispatch(getReviewsForMovie({ movieId: this.movieId }));
            this.store$.select(selectedMovieSelector).pipe(
                filter(movie => !!movie),
                takeUntil(this.unsubscribe$)
            ).subscribe(movie => {
                this.movie = movie;
            })
        });

        this.store$.select(imagesSelector).pipe(takeUntil(this.unsubscribe$)).subscribe(images => this.images = images);
        this.store$.select(reviewsSelector).pipe(takeUntil(this.unsubscribe$)).subscribe(reviews => this.reviews = reviews);
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
            },
            {
                breakpoint: '768px',
                numVisible: 3
            },
            {
                breakpoint: '560px',
                numVisible: 1
            }
        ];
    }

    getReleaseDate() {
        const date = new Date(this.movie?.release_date);
        return date?.getFullYear();
    }

    getReviewAvatar(review: Review) {
        return review?.author_details?.avatar_path
            ? 'https://image.tmdb.org/t/p/w200/' + review?.author_details?.avatar_path
            : 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png';
    }
}