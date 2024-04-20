import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../app.state';
import { Subject, takeUntil } from 'rxjs';
import { getNowPlayingMovies, getPopularMoviesRequest, getUpcomingMovies } from '../../store/movies-list/movies-list.actions';
import { nowPlayingMoviesSelector, popularMoviesSelector, upcomingMoviesSelector } from '../../store/movies-list/movies-list.selectors';

@Component({
    selector: 'movies-accordion',
    templateUrl: './movies-accordion.component.html'
})
export class MoviesAccordionComponent implements OnInit, OnDestroy{
    private readonly unsubscribe$ = new Subject<void>();
    popularMovies$ =  this.store$.select(popularMoviesSelector);
    nowPlayingMovies$ =  this.store$.select(nowPlayingMoviesSelector);
    upcomingMovies$ =  this.store$.select(upcomingMoviesSelector);

    constructor(private readonly store$: Store<IAppState>) {}

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    ngOnInit(): void {
        this.store$.dispatch(getPopularMoviesRequest({ page: 1 }));
        this.store$.dispatch(getNowPlayingMovies({ page: 1 }));
        this.store$.dispatch(getUpcomingMovies({ page: 1 }));
    }
}