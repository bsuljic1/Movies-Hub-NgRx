import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MovieState, MovieStore } from './movie.store';

@Injectable({ providedIn: 'root' })
export class MovieQuery extends Query<MovieState> {
  selectedMovie$ = this.select(state => state.selectedMovie);
  watchProviders$ = this.select(state => state.watchProviders);
  images$ = this.select(state => state.images);
  reviews$ = this.select(state => state.reviews);
  trailer$ = this.select(state => state.trailer);
  isLoading$ = this.select(state => state.isLoading);

  constructor(protected store: MovieStore) {
    super(store);
  }
}
