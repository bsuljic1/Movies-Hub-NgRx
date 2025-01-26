import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { SearchStore, SearchState } from './search.store';

@Injectable({ providedIn: 'root' })
export class SearchQuery extends QueryEntity<SearchState> {
  loading$ = this.select(state => state.loading);
  searchResults$ = this.select(state => state.searchResults);

  constructor(protected store: SearchStore) {
    super(store);
  }
}