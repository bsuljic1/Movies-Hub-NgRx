import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { Movie } from '../../../../models/movie.model';

export interface MoviesListState {
  popular: Movie[];
  nowPlaying: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
  isLoading: boolean;
}

export const initialMoviesListState: MoviesListState = {
  popular: [],
  nowPlaying: [],
  topRated: [],
  upcoming: [],
  isLoading: false,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'moviesList' })
export class MoviesListStore extends Store<MoviesListState> {
  constructor() {
    super(initialMoviesListState);
  }
}
