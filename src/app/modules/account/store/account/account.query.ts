import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { AccountState, AccountStore } from './account.store';

@Injectable({ providedIn: 'root' })
export class AccountQuery extends Query<AccountState> {
  watchlist$ = this.select(state => state.watchlist);
  ratedMovies$ = this.select(state => state.ratedMovies);
  isLoading$ = this.select(state => state.isLoading);

  constructor(protected store: AccountStore) {
    super(store);
  }
}
