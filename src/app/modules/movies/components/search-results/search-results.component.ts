import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie.model';
import { IAppState } from '../../../../app.state';
import { navigateMovieDetails } from '../../../core/store/navigation/navigation.actions';
import { isLoadingSelector, searchResultSelector } from '../../store/search/search.selectors';
import { ActivatedRoute } from '@angular/router';
import { searchMoviesRequest } from '../../store/search/search.actions';

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

    constructor(
        private readonly store$: Store<IAppState>,
        private readonly activatedRoute: ActivatedRoute
    ) { }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    ngOnInit() {
        this.activatedRoute.paramMap.pipe(
            takeUntil(this.unsubscribe$),
            switchMap(params => {
                this.query = params.get('query');
                this.store$.dispatch(searchMoviesRequest({ query: this.query }));
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
}