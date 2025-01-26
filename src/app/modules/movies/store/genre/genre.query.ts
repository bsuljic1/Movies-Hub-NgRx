import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { GenreStore, GenreState } from './genre.store';
import { Genre } from '../../../../models/genre.model';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GenreQuery extends QueryEntity<GenreState> {
    movieGenres$ = this.selectAll();
    getGenresByIds(genreIds: number[]): Observable<Genre[]> {
        return this.selectAll().pipe(
            map(genres => genres.filter(genre => genreIds.includes(genre.id)))
        );
    }

    constructor(protected store: GenreStore) {
        super(store);
    }
}
