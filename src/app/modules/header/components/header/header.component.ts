import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Category } from '../../../../models/category.enum';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../app.state';
import { navigateToMovieCategory, navigateToMyRatings, navigateToSearchResults, navigateToWatchlist } from '../../../core/store/navigation/navigation.actions';
import { debounceTime, filter, Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {
    profileItems: MenuItem[] | undefined;
    menuItems: MenuItem[] | undefined;
    private readonly searchSubject$: Subject<string> = new Subject();
    private readonly unsubscribe$ = new Subject<void>();


    constructor(private readonly store$: Store<IAppState>) { }
    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    ngOnInit() {
        this.profileItems = [
            {
                label: 'Profile'
            },
            {
                label: 'My ratings',
                command: () => this.store$.dispatch(navigateToMyRatings())
            },
            {
                label: 'My lists'
            },
            {
                label: 'Sign out'
            }
        ];

        this.menuItems = [
            {
                label: 'Now playing',
                command: () => this.store$.dispatch(navigateToMovieCategory({ category: Category.NowPlaying }))
            },
            {
                label: 'Popular',
                command: () => this.store$.dispatch(navigateToMovieCategory({ category: Category.Popular }))
            },
            {
                label: 'Top rated',
                command: () => this.store$.dispatch(navigateToMovieCategory({ category: Category.TopRated }))
            },
            {
                label: 'Upcoming',
                command: () => this.store$.dispatch(navigateToMovieCategory({ category: Category.Upcoming }))
            },
            {
                label: 'Genres'
            }
        ];

        this.searchSubject$.pipe(
            filter(query => !!query && query !== ''),
             debounceTime(1000),
             takeUntil(this.unsubscribe$)
            ).subscribe(query => this.store$.dispatch(navigateToSearchResults({ query }))
        );
    }

    onSearch(query: string) {
        this.searchSubject$.next(query)
    }

    navigateToWatchlistt() {
        this.store$.dispatch(navigateToWatchlist());
    }
}