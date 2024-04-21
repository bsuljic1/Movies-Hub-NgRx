import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../app.state';
import { Subject, combineLatest, filter, take, takeUntil } from 'rxjs';
import { Movie } from '../../../../models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { selectMovieById } from '../../store/movies-list/movies-list.selectors';
import { Category } from '../../../../models/category.enum';
import { Genre } from '../../../../models/genre.model';
import { getMovieGenresRequest } from '../../store/genre/genre.actions';
import { getGenresByIds } from '../../store/genre/genre.selectors';

@Component({
    selector: 'movie-details',
    templateUrl: './movie-details.component.html',
    styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject<void>();
    movie: Movie;
    movieId: number;
    category: Category;
    genres: Genre[];

    constructor(
        private readonly store$: Store<IAppState>,
        private readonly activatedRoute: ActivatedRoute
    ) { }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    ngOnInit(): void {

        combineLatest([this.activatedRoute.params, this.activatedRoute.queryParams])
            .pipe(
                takeUntil(this.unsubscribe$)
            ).subscribe(([params, queryParams]) => {
                this.movieId = +params.movieId;
                this.category = queryParams.category;
                this.store$.select(selectMovieById(this.movieId, this.category)).pipe(
                    filter(movie => !!movie),
                    takeUntil(this.unsubscribe$)
                ).subscribe(movie => {
                    this.movie = movie;
                    this.store$.select(getGenresByIds(this.movie?.genre_ids)).pipe(
                        takeUntil(this.unsubscribe$)
                    ).subscribe(genres => this.genres = genres);
                });
            });
    }

    getReleaseDate() {
        const date = new Date(this.movie?.release_date);
        return date?.getFullYear();
    }
}