import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, filter, map, takeUntil } from 'rxjs';
import { ExtendedMovie } from '../../../../models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { Category } from '../../../../models/category.enum';
import { Image } from '../../../../models/image.model';
import { Genre } from '../../../../models/genre.model';
import { Review } from '../../../../models/review.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MovieQuery } from '../../store/movie/movie.query';
import { MovieService } from '../../store/movie/movie.service';
import { AccountService } from '../../../account/store/account/account.service';
import { AccountQuery } from '../../../account/store/account/account.query';

@Component({
    selector: 'movie-details',
    templateUrl: './movie-details.component.html',
    styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject<void>();
    watchProviders$ = this.movieQuery.watchProviders$;
    trailer$ = this.movieQuery.trailer$;
    isLoading$ = this.movieQuery.isLoading$;
    movie: ExtendedMovie;
    movieId: number;
    category: Category;
    genres: Genre[];

    images: Image[] = [];
    reviews: Review[] = [];
    responsiveOptions: any[] | undefined;
    currentReviewsPage = signal<number>(0);
    reviewsPerPage = 3;
    paginatedReviews = signal<Review[]>([]);
    myRating: number;
    userRating: number;

    constructor(
        private readonly movieQuery: MovieQuery,
        private readonly movieService: MovieService,
        private readonly accountService: AccountService,
        private readonly accountQuery: AccountQuery,
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

        this.movieQuery.images$.pipe(takeUntil(this.unsubscribe$)).subscribe(images => this.images = images);
        this.movieQuery.reviews$.pipe(takeUntil(this.unsubscribe$)).subscribe(reviews => {
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
        this.accountQuery.ratedMovies$.pipe(
            filter(x => !!x),
            takeUntil(this.unsubscribe$)
        ).subscribe(ratings => {
            this.myRating = ratings.find(r => r.id === this.movieId)?.rating;
            this.userRating = this.myRating;
        });
    }

    private subscribeToMovieDetails() {
        this.movieQuery.selectedMovie$.pipe(
            filter(movie => !!movie),
            takeUntil(this.unsubscribe$)
        ).subscribe(movie => {
            this.movie = movie;
        });
    }

    private dispatchActionsToFetchMovieDetails() {
        this.movieService.setSelectedMovie(this.movieId).subscribe();
        this.movieService.setImages(this.movieId).subscribe();
        this.movieService.setReviews(this.movieId).subscribe();
        this.movieService.setTrailer(this.movieId).subscribe();
        this.movieService.setWatchProviders(this.movieId).subscribe();
        this.accountService.setRatedMovies().subscribe();
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
        this.accountService.addRatingForMovie(this.movie.id, rating);
    }
}