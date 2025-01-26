import { Component, Input } from '@angular/core';
import { Movie } from '../../../../models/movie.model';
import { AccountService } from '../../../account/store/account/account.service';
import { Router } from '@angular/router';

@Component({
    selector: 'card-item',
    templateUrl: './card-item.component.html'
})
export class CardItemComponent{
    @Input() movie: Movie;

    constructor(private readonly accountService: AccountService, private readonly router: Router) {}
    
    openDetails(movie: Movie) {
        this.router.navigate([`details/${movie.id}`]);
    }

    addToWatchlist(movieId: number) {
        this.accountService.addMovieToWatchlist(movieId).subscribe();
    }
}