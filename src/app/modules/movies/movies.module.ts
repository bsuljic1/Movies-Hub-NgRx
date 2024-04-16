import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ProductService } from '../../services/productservice';
import { MovieListService } from '../../services/movie-list.service';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { moviesListReducer } from './store/movies-list.reducer';
import { MoviesListEffects } from './store/movies-list.effects';
import { SharedModule } from '../../shared.module';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('moviesList', moviesListReducer),
    EffectsModule.forFeature([MoviesListEffects]),
    SharedModule
  ],
  providers: [ProductService, MovieListService],
  declarations: [MoviesListComponent],
  exports: [MoviesListComponent],
})
export class MoviesModule {}