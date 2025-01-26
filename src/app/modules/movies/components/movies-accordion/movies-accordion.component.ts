import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Category } from '../../../../models/category.enum';
import { MoviesListQuery } from '../../store/movies-list/movie-list.query';
import { MoviesListAkitaService } from '../../store/movies-list/movie-list.service';

@Component({
    selector: 'movies-accordion',
    templateUrl: './movies-accordion.component.html'
})
export class MoviesAccordionComponent implements OnInit, OnDestroy{
    private readonly unsubscribe$ = new Subject<void>();
    popularMovies$ =  this.moviesListQuery.popularMovies$;
    nowPlayingMovies$ =  this.moviesListQuery.nowPlayingMovies$;
    upcomingMovies$ =  this.moviesListQuery.upcomingMovies$;
    Category = Category;

    constructor(
        private readonly moviesListQuery: MoviesListQuery,
        private readonly moviesListService: MoviesListAkitaService
    ) {}

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    ngOnInit(): void {
        this.moviesListService.fetchNowPlayingMovies();
        this.moviesListService.fetchPopularMovies();
        this.moviesListService.fetchUpcomingMovies();
    }
}