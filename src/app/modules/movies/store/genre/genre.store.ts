import { Injectable } from '@angular/core';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';
import { Genre } from '../../../../models/genre.model';

  export interface GenreState extends EntityState<Genre> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'genre' })
export class GenreStore extends EntityStore<GenreState, Genre> {
    constructor() {
      super();
    }
  }