import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Movie } from '../../../../models/movie.model';
import { Subject } from 'rxjs';
import { IAppState } from '../../../../app.state';
import { Store } from '@ngrx/store';
import { Category } from '../../../../models/category.enum';
import { isLoadingSelector } from '../../../core/store/core.selectors';

@Component({
    selector: 'movies-list',
    templateUrl: './movies-list.component.html',
    styleUrl: './movies-list.component.scss'
})
export class MoviesListComponent implements OnInit, OnDestroy {
    private readonly unsubscribe$ = new Subject<void>();
    loading$ = this.store$.select(isLoadingSelector);

    layout = 'grid';
    imageUrl = 'https://image.tmdb.org/t/p/w400/';
    @Input() movies!: Movie[];
    @Input() category: Category;
    responsiveOptions: any[] | undefined;

    constructor(
        private readonly store$: Store<IAppState>
    ) { }

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