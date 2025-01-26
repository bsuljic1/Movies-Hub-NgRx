import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { RatingsComponent } from './components/ratings/ratings.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule
    ],
    declarations: [WatchlistComponent, RatingsComponent],
    exports: [WatchlistComponent, RatingsComponent],
})
export class AccountModule { }