import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../app.state';
import { Subject } from 'rxjs';
import { Movie } from '../../../../models/movie.model';
import { navigateMovieDetails } from '../../../core/store/navigation/navigation.actions';

@Component({
    selector: 'card-item',
    templateUrl: './card-item.component.html'
})
export class CardItemComponent{
    @Input() movie: Movie;
    private readonly unsubscribe$ = new Subject<void>();

    constructor(private readonly store$: Store<IAppState>) {}
    
    openDetails(movie: Movie) {
        this.store$.dispatch(navigateMovieDetails({ movieId: movie.id }));
    }
}