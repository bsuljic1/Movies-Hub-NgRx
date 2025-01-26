import { Injectable } from '@angular/core';
import { StoreConfig, Store } from '@datorama/akita';
import { ExtendedMovie } from '../../../../models/movie.model';
import { WatchProvider } from '../../../../models/watch-provider.model';
import { Image } from '../../../../models/image.model';
import { Review } from '../../../../models/review.model';
import { Video } from '../../../../models/video.model';

export interface MovieState {
  selectedMovie: ExtendedMovie | null;
  watchProviders: WatchProvider[];
  images: Image[];
  reviews: Review[];
  trailer: Video | null;
  isLoading: boolean;
}

export const initialMovieState: MovieState = {
  selectedMovie: null,
  watchProviders: [],
  images: [],
  reviews: [],
  trailer: null,
  isLoading: false,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'movie' })
export class MovieStore extends Store<MovieState> {
  constructor() {
    super(initialMovieState);
  }
}
