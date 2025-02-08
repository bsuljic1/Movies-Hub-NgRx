import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../app.state';
import { watchlistSelector } from '../../store/account/account.selectors';
import { getMoviesFromWatchlistRequest, removeFromWatchlistRequest } from '../../store/account/account.actions';
import { isLoadingSelector } from '../../../core/store/core.selectors';

@Component({
    selector: 'app-watchlist',
    templateUrl: './watchlist.component.html',
    styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent implements OnInit {
    movies$ = this.store$.select(watchlistSelector);
    loading$ = this.store$.select(isLoadingSelector);
    constructor(private readonly store$: Store<IAppState>) { }

    ngOnInit() {
        this.store$.dispatch(getMoviesFromWatchlistRequest());
    }

    removeFromWatchlist(movieId: number) {
        this.store$.dispatch(removeFromWatchlistRequest( { movieId }));
    }
}