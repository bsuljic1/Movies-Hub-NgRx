import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie.model';
import { IAppState } from '../../../../app.state';
import { navigateMovieDetails } from '../../../core/store/navigation/navigation.actions';
import { searchResultSelector } from '../../store/search/search.selectors';
import { ActivatedRoute } from '@angular/router';
import { searchMoviesRequest } from '../../store/search/search.actions';
import { getMoviesByGenreRequest } from '../../store/genre/genre.actions';
import { genresSelector, selectMoviesByGenres } from '../../store/genre/genre.selectors';
import { isLoadingSelector } from '../../../core/store/core.selectors';

@Component({
    selector: 'search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject<void>();
    loading$ = this.store$.select(isLoadingSelector);
    movies = signal<Movie[]>([]);
    paginatedMovies = signal<Movie[]>([]);
    currentPage = signal<number>(0);
    itemsPerPage = 8;
    query: string = '';
    genre: string;
    genres$ = this.store$.select(genresSelector);
    selectedGenres: string[] = [];

    constructor(
        private readonly store$: Store<IAppState>,
        private readonly activatedRoute: ActivatedRoute
    ) { }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    ngOnInit() {
        this.loading$.subscribe(x => console.log(x))
        this.activatedRoute.queryParams.pipe(
            takeUntil(this.unsubscribe$),
            switchMap(params => {
                this.query = params['searchText'];
                this.genre = params['genre'];
                if (!!this.query && this.query !== '') {
                    this.store$.dispatch(searchMoviesRequest({ query: this.query }));
                }

                if (this.genre) {
                    this.store$.dispatch(getMoviesByGenreRequest({ genres: this.genre }));
                    return this.store$.select(selectMoviesByGenres(this.genre)).pipe(
                        takeUntil(this.unsubscribe$)
                    );
                }

                return this.store$.select(searchResultSelector).pipe(
                    takeUntil(this.unsubscribe$)
                );
            })
        ).subscribe(movies => {
            this.movies.set(movies);
            this.updatePaginatedMovies();
        });
    }

    updatePaginatedMovies() {
        const startIndex = this.currentPage() * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedMovies.set(this.movies().slice(startIndex, endIndex));
    }

    openDetails(movie: Movie) {
        this.store$.dispatch(navigateMovieDetails({ movieId: movie.id }));
    }

    onPageChange(event: any) {
        this.currentPage.set(event.page);
        this.updatePaginatedMovies();
    }

    genreClicked(genreId: string) {
        const index = this.selectedGenres.indexOf(genreId);
        if (index === -1) {
            this.selectedGenres.push(genreId);
            this.selectedGenres.sort((a,b) => a > b ? 1 : -1); // Ensure the genres are always in the same order
        } else {
            this.selectedGenres.splice(index, 1);
        }

        this.store$.dispatch(getMoviesByGenreRequest({
            genres: this.selectedGenres.join(',')
        }));
        this.store$.select(selectMoviesByGenres(this.selectedGenres.join(','))).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(movies => {
            this.movies.set(movies);
            this.updatePaginatedMovies();
        });
    }
}