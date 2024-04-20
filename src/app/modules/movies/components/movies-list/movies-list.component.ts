import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../../models/movie.model';
import { Subject } from 'rxjs';
import { Product } from '../../../../models/product';

@Component({
    selector: 'movies-list',
    templateUrl: './movies-list.component.html',
    styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject<void>();

    layout = 'grid';
    imageUrl = 'https://image.tmdb.org/t/p/w400/';

    products!: Product[];
    @Input() movies!: Movie[];
    responsiveOptions: any[] | undefined;

    constructor() {}
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    ngOnInit() {
        this.responsiveOptions = [
            {
                breakpoint: '1199px',
                numVisible: 1,
                numScroll: 1
            },
            {
                breakpoint: '991px',
                numVisible: 2,
                numScroll: 1
            },
            {
                breakpoint: '767px',
                numVisible: 1,
                numScroll: 1
            }
        ];
    }

}