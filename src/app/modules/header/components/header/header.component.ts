import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Category } from '../../../../models/category.enum';
import { debounceTime, filter, Subject, takeUntil } from 'rxjs';
import { Router } from '@angular/router';

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


    constructor(private readonly router: Router) { }
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
                command: () => void this.router.navigate(['ratings'])
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
                command: () => void this.router.navigate([`category/${Category.NowPlaying.toLowerCase()}`])
            },
            {
                label: 'Popular',
                command: () => void this.router.navigate([`category/${Category.Popular.toLowerCase()}`])
            },
            {
                label: 'Top rated',
                command: () => void this.router.navigate([`category/${Category.TopRated.toLowerCase()}`])
            },
            {
                label: 'Upcoming',
                command: () => void this.router.navigate([`category/${Category.Upcoming.toLowerCase()}`])
            }
        ];

        this.searchSubject$.pipe(
            filter(query => !!query && query !== ''),
            debounceTime(1000),
            takeUntil(this.unsubscribe$)
        ).subscribe(query => void this.router.navigate([`search/${query}`])
        );
    }

    onSearch(query: string) {
        this.searchSubject$.next(query)
    }

    navigateToWatchlistt() {
        void this.router.navigate(['watchlist'])
    }
}