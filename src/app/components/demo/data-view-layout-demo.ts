import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../../../domain/product';
import { ProductService } from '../../../service/productservice';
import { Movie } from '../../models/movie.model';
import { Store, select } from '@ngrx/store';
import { getPopularMoviesRequest } from '../../store/movies-list/movies-list.actions';
import { popularMoviesSelector } from '../../store/movies-list/movies-list.selectors';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'data-view-layout-demo',
    templateUrl: './data-view-layout-demo.html'
})
export class DataViewLayoutDemo implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject<void>();

    layout: string = 'list';
    imageUrl = 'https://image.tmdb.org/t/p/w400/';

    products!: Product[];
    movies: Movie[];

    constructor(private productService: ProductService, private readonly store$: Store) {}
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    ngOnInit() {
        this.productService.getProducts().then((data) => (this.products = data.slice(0, 12)));
        this.store$.dispatch(getPopularMoviesRequest({ page: 1 }));
        this.store$.pipe(
            select(popularMoviesSelector),
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