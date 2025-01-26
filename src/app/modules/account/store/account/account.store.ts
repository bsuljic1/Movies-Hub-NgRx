import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import { Movie } from '../../../../models/movie.model';

export interface AccountState {
  watchlist: Movie[];
  ratedMovies: Movie[];
  isLoading: boolean;
}

export const initialAccountState: AccountState = {
  watchlist: [],
  ratedMovies: [],
  isLoading: false,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'account' })
export class AccountStore extends Store<AccountState> {
  constructor() {
    super(initialAccountState);
  }
}
