import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchQuery } from '../../store/search/search.query';
import { SearchService } from '../../store/search/search.service';

@Component({
    selector: 'search-results',
    templateUrl: './search-results.component.html',
    styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject<void>();
    loading$ = this.searchQuery.loading$;
    movies$ = this.searchQuery.searchResults$;
    movies = signal<Movie[]>([]);
    paginatedMovies = signal<Movie[]>([]);
    currentPage = signal<number>(0);
    itemsPerPage = 8;
    query = '';

    constructor(
        private readonly searchQuery: SearchQuery,
        private readonly searchService: SearchService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router
    ) { }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    ngOnInit() {
        this.activatedRoute.paramMap.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(params => {
            this.query = params.get('query');
            this.searchService.searchMovies(this.query).subscribe();
        });

        this.movies$.pipe(
            filter(x => !!x),
            takeUntil(this.unsubscribe$)
        ).subscribe(movies => {
            this.movies.set(movies);
            this.updatePaginatedMovies();
        });
    }

    updatePaginatedMovies() {
        const startIndex = this.currentPage() * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        this.paginatedMovies.set(this.movies()?.slice(startIndex, endIndex));
    }

    openDetails(movie: Movie) {
        void this.router.navigate([`details/${movie.id}`]);
    }

    onPageChange(event: any) {
        this.currentPage.set(event.page);
        this.updatePaginatedMovies();
    }
}