import { Component, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../../models/movie.model';
import { Store, select } from '@ngrx/store';
import { getPopularMoviesRequest } from '../../store/movies-list.actions';
import { popularMoviesSelector } from '../../store/movies-list.selectors';
import { Subject, pipe, takeUntil } from 'rxjs';
import { ProductService } from '../../../../services/productservice';
import { Product } from '../../../../models/product';
import { IAppState } from '../../../../app.state';

@Component({
    selector: 'movies-list',
    templateUrl: './movies-list.component.html'
})
export class MoviesListComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject<void>();

    layout: string = 'list';
    imageUrl = 'https://image.tmdb.org/t/p/w400/';

    products!: Product[];
    movies: Movie[];

    constructor(private productService: ProductService, private readonly store$: Store<IAppState>) {}
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 12)));
        this.store$.dispatch(getPopularMoviesRequest({ page: 1 }));
        this.store$.select(popularMoviesSelector).pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(popularMovies => this.movies = popularMovies);
    }

    getSeverity(product: Product) {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };
}