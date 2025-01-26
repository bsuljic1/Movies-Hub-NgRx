import { Component, OnInit } from '@angular/core';
import { AccountQuery } from '../../store/account/account.query';
import { AccountService } from '../../store/account/account.service';

@Component({
    selector: 'app-ratings',
    templateUrl: './ratings.component.html',
    styleUrl: './ratings.component.scss'
})
export class RatingsComponent implements OnInit {
    ratedMovies$ = this.accountQuery.ratedMovies$;
    loading$ = this.accountQuery.isLoading$;
    
    constructor(private readonly accountQuery: AccountQuery, private readonly accountService: AccountService) { }

    ngOnInit() {
        this.accountService.setRatedMovies().subscribe();
    }
}