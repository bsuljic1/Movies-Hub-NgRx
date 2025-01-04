import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Movie } from 'src/app/models/movie.model';
import { IAppState } from '../../../../app.state';
import { getMoviesByCategory } from '../../store/movies-list/movies-list.actions';
import { isLoadingSelector, selectMoviesByCategory } from '../../store/movies-list/movies-list.selectors';
import { Category } from '../../../../models/category.enum';
import { navigateMovieDetails } from '../../../core/store/navigation/navigation.actions';

@Component({
  selector: 'app-movies-category',
  templateUrl: './movies-category.component.html',
  styleUrls: ['./movies-category.component.scss']
})
export class MoviesCategoryComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();
  loading$ = this.store$.select(isLoadingSelector);
  movies = signal<Movie[]>([]);
  paginatedMovies = signal<Movie[]>([]);
  category: Category;
  currentPage = signal<number>(0);
  itemsPerPage = 8;

  constructor(
    private readonly store$: Store<IAppState>,
    private readonly activatedRoute: ActivatedRoute
  ) { }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngOnInit() {
    this.activatedRoute.data.pipe(
      takeUntil(this.unsubscribe$),
      switchMap(data => {
        this.category = data.category;
        this.store$.dispatch(getMoviesByCategory({ category: this.category }));
        return this.store$.select(selectMoviesByCategory(this.category)).pipe(
          takeUntil(this.unsubscribe$)
        );
      })
    ).subscribe(movies => {
      this.movies.set(movies);
      this.updatePaginatedMovies();
    });
  }

  updatePaginatedMovies() {
    const startIndex = this.currentPage() * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedMovies.set(this.movies().slice(startIndex, endIndex));
  }

  openDetails(movie: Movie) {
    this.store$.dispatch(navigateMovieDetails({ movieId: movie.id }));
  }

  onPageChange(event: any) {
    this.currentPage.set(event.page);
    this.updatePaginatedMovies();
  }
}