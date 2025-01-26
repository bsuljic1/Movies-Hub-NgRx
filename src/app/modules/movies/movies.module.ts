import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MoviesListComponent } from './components/movies-list/movies-list.component';
import { SharedModule } from '../../shared.module';
import { MoviesAccordionComponent } from './components/movies-accordion/movies-accordion.component';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { MoviesCategoryComponent } from './components/movies-category/movies-category.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { CardItemComponent } from './components/card-item/card-item.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    MoviesListComponent,
    MoviesAccordionComponent,
    MovieDetailsComponent,
    MoviesCategoryComponent,
    SearchResultsComponent,
    CardItemComponent
  ],
  exports: [
    MoviesListComponent,
    MoviesAccordionComponent,
    MovieDetailsComponent,
    MoviesCategoryComponent,
    SearchResultsComponent,
    CardItemComponent
  ]
})
export class MoviesModule { }