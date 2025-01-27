import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../app.state';
import { isLoadingSelector, ratedMoviesSelector } from '../../store/account/account.selectors';
import { getRatedMoviesRequest } from '../../store/account/account.actions';

@Component({
    selector: 'app-ratings',
    templateUrl: './ratings.component.html',
    styleUrl: './ratings.component.scss'
})
export class RatingsComponent implements OnInit {
    ratedMovies$ = this.store$.select(ratedMoviesSelector);
    loading$ = this.store$.select(isLoadingSelector);
    
    constructor(private readonly store$: Store<IAppState>) { }

    ngOnInit() {
        this.store$.dispatch(getRatedMoviesRequest());
    }
}