import { Component, OnInit } from '@angular/core';
import { AccountQuery } from '../../store/account/account.query';
import { AccountService } from '../../store/account/account.service';

@Component({
    selector: 'app-watchlist',
    templateUrl: './watchlist.component.html',
    styleUrl: './watchlist.component.scss'
})
export class WatchlistComponent implements OnInit {
    movies$ = this.accountQuery.watchlist$;
    loading$ = this.accountQuery.isLoading$;

    constructor(private readonly accountQuery: AccountQuery, private readonly accountService: AccountService) { }

    ngOnInit() {
        this.accountService.setWatchlist().subscribe();
    }

    removeFromWatchlist(movieId: number) {
        this.accountService.removeMovieFromWatchlist(movieId).subscribe();
    }
}