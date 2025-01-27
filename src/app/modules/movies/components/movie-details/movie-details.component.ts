import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../app.state';
import { Subject, filter, takeUntil } from 'rxjs';
import { ExtendedMovie } from '../../../../models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../../models/category.enum';
import { Image } from '../../../../models/image.model';
import { Genre } from '../../../../models/genre.model';
import { imagesSelector, isLoadingSelector, reviewsSelector, selectedMovieSelector, trailerSelector, watchProvidersSelector } from '../../store/movie/movie.selectors';
import { getImagesForMovie, getMovieDetailsByIdRequest, getReviewsForMovie, getVideosForMovieRequest, getWatchProviderForMovie } from '../../store/movie/movie.actions';
import { Review } from '../../../../models/review.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { getRatedMoviesRequest, rateMovieRequest } from '../../../account/store/account/account.actions';
import { myRatingForselectedMovieSelector } from '../../../account/store/account/account.selectors';

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
    trailer$ = this.store$.select(trailerSelector);
    images: Image[] = [];
    reviews: Review[] = [];
    responsiveOptions: any[] | undefined;
    currentReviewsPage = signal<number>(0);
    reviewsPerPage = 3;
    paginatedReviews = signal<Review[]>([]);
    myRating: number;
    userRating: number;
    isLoading$ = this.store$.select(isLoadingSelector);

    constructor(
        private readonly store$: Store<IAppState>,
        private readonly activatedRoute: ActivatedRoute,
        private readonly sanitizer: DomSanitizer
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
            this.dispatchActionsToFetchMovieDetails();
            this.subscribeToMovieDetails();
            this.subscribeToMyRating();
        });

        this.store$.select(imagesSelector).pipe(takeUntil(this.unsubscribe$)).subscribe(images => this.images = images);
        this.store$.select(reviewsSelector).pipe(takeUntil(this.unsubscribe$)).subscribe(reviews => {
            this.reviews = reviews;
            this.updatePaginatedReviews();
        });
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

    private subscribeToMyRating() {
        this.store$.select(myRatingForselectedMovieSelector(this.movieId)).pipe(
            filter(x => !!x),
            takeUntil(this.unsubscribe$)
        ).subscribe(rating => {
            this.myRating = rating;
            this.userRating = rating;
        });
    }

    private subscribeToMovieDetails() {
        this.store$.select(selectedMovieSelector).pipe(
            filter(movie => !!movie),
            takeUntil(this.unsubscribe$)
        ).subscribe(movie => {
            this.movie = movie;
        });
    }

    private dispatchActionsToFetchMovieDetails() {
        this.store$.dispatch(getMovieDetailsByIdRequest({ id: this.movieId }));
        this.store$.dispatch(getVideosForMovieRequest({ movieId: this.movieId }));
        this.store$.dispatch(getWatchProviderForMovie({ movieId: this.movieId }));
        this.store$.dispatch(getImagesForMovie({ movieId: this.movieId }));
        this.store$.dispatch(getReviewsForMovie({ movieId: this.movieId }));
        this.store$.dispatch(getRatedMoviesRequest());
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

    updatePaginatedReviews() {
        const startIndex = this.currentReviewsPage() * this.reviewsPerPage;
        const endIndex = startIndex + this.reviewsPerPage;
        this.paginatedReviews.set(this.reviews.slice(startIndex, endIndex));
    }

    paginateReviews(event: any) {
        this.currentReviewsPage.set(event.page);
        this.updatePaginatedReviews();
    }

    getTrailerUrl(videoKey: string): SafeResourceUrl {
        const url = `https://www.youtube.com/embed/${videoKey}`;
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    submitRating(rating: number) {
        this.store$.dispatch(rateMovieRequest({ movieId: this.movie.id, rating }))
    }
}