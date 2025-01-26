import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { MoviesListState, MoviesListStore } from './movie-list.store';
import { Movie } from '../../../../models/movie.model';
import { Category } from '../../../../models/category.enum';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MoviesListQuery extends Query<MoviesListState> {
  popularMovies$ = this.select(state => state.popular);
  nowPlayingMovies$ = this.select(state => state.nowPlaying);
  upcomingMovies$ = this.select(state => state.upcoming);
  topRatedMovies$ = this.select(state => state.topRated);
  isLoading$ = this.select(state => state.isLoading);

  constructor(protected override store: MoviesListStore) {
    super(store);
  }

  selectMoviesByCategory(category: Category): Observable<Movie[]> {
    switch (category) {
      case Category.Popular:
        return this.popularMovies$;
      case Category.NowPlaying:
        return this.nowPlayingMovies$;
      case Category.Upcoming:
        return this.upcomingMovies$;
      case Category.TopRated:
        return this.topRatedMovies$;
      default:
        return this.popularMovies$;
    }
  }
}
