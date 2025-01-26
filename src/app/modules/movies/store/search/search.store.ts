import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Movie } from '../../../../models/movie.model';

export interface Search {
    searchQuery: string;
    searchResults: Movie[];
}

export function createInitialState(): SearchState {
    return {
      searchQuery: null,
      searchResults: []
    };
  }

export interface SearchState extends EntityState<Search> { }

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'search' })
export class SearchStore extends EntityStore<SearchState> {
    constructor() {
        super(createInitialState());
    }
}