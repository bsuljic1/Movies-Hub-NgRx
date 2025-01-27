import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { accountReducer } from './store/account/account.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AccountEffects } from './store/account/account.effects';
import { WatchlistService } from '../../services/watchlist.service';
import { RatingsService } from '../../services/ratings.service';
import { RatingsComponent } from './components/ratings/ratings.component';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('account', accountReducer),
        EffectsModule.forFeature([AccountEffects]),
        SharedModule
    ],
    providers: [WatchlistService, RatingsService],
    declarations: [WatchlistComponent, RatingsComponent],
    exports: [WatchlistComponent, RatingsComponent],
})
export class AccountModule { }