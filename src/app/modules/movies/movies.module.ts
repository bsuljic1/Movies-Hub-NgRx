import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { MovieListService } from '../../services/movie-list.service';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { moviesListReducer } from './store/movies-list/movies-list.reducer';
import { MoviesListEffects } from './store/movies-list/movies-list.effects';
import { SharedModule } from '../../shared.module';
import { GenreService } from '../../services/genre.service';
import { genreReducer } from './store/genre/genre.reducer';
import { GenreEffects } from './store/genre/genre.effects';
import { MoviesAccordionComponent } from './components/movies-accordion/movies-accordion.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MovieEffects } from './store/movie/movie.effects';
import { MovieService } from '../../services/movie.service';
import { movieReducer } from './store/movie/movie.reducer';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('moviesList', moviesListReducer),
    StoreModule.forFeature('genre', genreReducer),
    StoreModule.forFeature('movie', movieReducer),
    EffectsModule.forFeature([MoviesListEffects, GenreEffects, MovieEffects]),
    SharedModule
  ],
  providers: [MovieListService, GenreService, MovieService],
  declarations: [MoviesListComponent, MoviesAccordionComponent, MovieDetailsComponent],
  exports: [MoviesListComponent, MoviesAccordionComponent, MovieDetailsComponent],
})
export class MoviesModule {}