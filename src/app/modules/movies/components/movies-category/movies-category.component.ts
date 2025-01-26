import { Component, OnInit, OnDestroy, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Category } from '../../../../models/category.enum';
import { MoviesListQuery } from '../../store/movies-list/movie-list.query';
import { MoviesListAkitaService } from '../../store/movies-list/movie-list.service';
import { Movie } from '../../../../models/movie.model';

@Component({
  selector: 'app-movies-category',
  templateUrl: './movies-category.component.html',
  styleUrls: ['./movies-category.component.scss']
})
export class MoviesCategoryComponent implements OnInit, OnDestroy {
  private readonly unsubscribe$ = new Subject<void>();
  loading$ = this.movieListQuery.isLoading$;
  movies = signal<Movie[]>([]);
  paginatedMovies = signal<Movie[]>([]);
  category: Category;
  currentPage = signal<number>(0);
  itemsPerPage = 8;

  constructor(
    private readonly movieListQuery: MoviesListQuery,
    private readonly movieListService: MoviesListAkitaService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router
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
        this.movieListService.getMoviesByCategory(this.category);
        return this.movieListQuery.selectMoviesByCategory(this.category).pipe(
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

  onPageChange(event: any) {
    this.currentPage.set(event.page);
    this.updatePaginatedMovies();
  }
}