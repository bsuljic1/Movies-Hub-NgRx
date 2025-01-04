import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Category } from '../../../../models/category.enum';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../app.state';
import { navigateToMovieCategory, navigateToMyRatings, navigateToSearchResults, navigateToWatchlist } from '../../../core/store/navigation/navigation.actions';
import { debounceTime, Subject } from 'rxjs';

@Component({
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
    profileItems: MenuItem[] | undefined;
    menuItems: MenuItem[] | undefined;
    private readonly searchSubject$: Subject<string> = new Subject();


    constructor(private readonly store$: Store<IAppState>) { }

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

        this.searchSubject$.pipe(debounceTime(1000)).subscribe(query =>
            this.store$.dispatch(navigateToSearchResults({ query }))
        );
    }

    onSearch(query: string) {
        this.searchSubject$.next(query)
    }

    navigateToWatchlist() {
        this.store$.dispatch(navigateToWatchlist());
    }
}