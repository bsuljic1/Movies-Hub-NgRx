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

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('moviesList', moviesListReducer),
    StoreModule.forFeature('genre', genreReducer),
    EffectsModule.forFeature([MoviesListEffects, GenreEffects]),
    SharedModule
  ],
  providers: [MovieListService, GenreService],
  declarations: [MoviesListComponent, MoviesAccordionComponent, MovieDetailsComponent],
  exports: [MoviesListComponent, MoviesAccordionComponent, MovieDetailsComponent],
})
export class MoviesModule {}